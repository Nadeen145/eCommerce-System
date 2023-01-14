import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { PageLayout } from '../PageLayout';
import { pages, Pages } from '../../../Constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

let url_product = `http://localhost:3001/products/`;

// TODO: Category name
// TODO: Scroll infinetely

export interface CatalogProps {
  changePage(newPage: Pages): void,
}

export const Catalog: React.FC<CatalogProps> = ({
  changePage,  
}) => {  

  let imageNotAvailable = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);

  const goToProduct = (product:any) => {
    localStorage.setItem('product', product['id']);

    changePage(Pages.Product)
  }

    const fetchData = async() => {
      setLoading(true);
      try{
        const response = await axios.get(
          url_product,
          { withCredentials: true }
        );
  
        if(response.status === 200){
          await setProducts(response.data);

          setCategories([]);
          await products?.map((product) => {
            categories.push({
              id: product["id"],
              name: product["category"],
            });
          });

          let temp: any[] = [];
          categories.forEach((element:any) => {
              if (!temp.includes(element)) {
                temp.push(element);
              }
          });

          setCategories(temp);
          
          setLoading(false);
        }
      } catch{
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div className="root">
        <Header 
          changePage={changePage} 
          title={pages[Pages.Catalog]}
        />

        
      {
        loading?
        <div className='margin-top-container'>
          <Loading /> 
        </div>
            :
        <div>
        <div className="categories">
          {categories &&
            categories?.map((category:any) => (
              <div key={category['id']} className="category-item">
              <h3>{category['name']}</h3>
            </div>
          ))}
        </div>

        <div className='products-container'>
          <div className="products">
            {products &&
              products?.map((product) => (
                <div key={product["id"]} className="product">
                  <h3 className='center'>{product['name']}</h3>
                  <img className="photo"src={product['image']? product['image']: imageNotAvailable} alt={product['name']} />
                    <div className="details price">Price: {product['price']}₪</div>
                    <div className="details category">Category: {product['category']}</div>
                  <button className='product-btn' onClick={() => goToProduct(product)}>
                    See Details
                  </button>
                </div>
              ))}
          </div>
        </div>
        </div>
      }

      </div>
    );
}
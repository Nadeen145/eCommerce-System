import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';
import ReactPaginate from 'react-paginate';

// let url_product = `http://localhost:3001/products/`;
let url_product = `https://gatewayserver.onrender.com/products/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

let productsPerPage = 8;

export interface CatalogProps {
  changePage(newPage: Pages): void,
}

export const Catalog: React.FC<CatalogProps> = ({
  changePage,  
}) => {  

  let imageNotAvailable = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState<number>(0);

  const goToProduct = async (product:any) => {
    await logout();

    localStorage.setItem('product', product['id']);

    changePage(Pages.Product)
  }

  const logout = async() => {
    setLoading(true);
    try{
        const response1 = await axios.get(
          url_user+"permission/"+ localStorage.getItem("username"), { withCredentials: true }
        );
    
        if(response1.status === 200){
            if(response1.data['permission'] === localStorage.getItem("permission")){
              return;
            }
        }

        const response2 = await axios.post(
          url_user+"logout", {}, { withCredentials: true }
        );
    
        if(response2.status === 200){
            localStorage.clear();
            setLoading(false);
            changePage(Pages.Login);
        }
    }
    catch(error){

    }
    setLoading(false);
  }

  const handlePageClick = async(data: { selected: number }) => {
    setLoading(true);
    await logout();

    try{
      const response = await axios.get(
        url_product+"page/"+productsPerPage+"/"+data.selected,
        { withCredentials: true }
      );

      if(response.status === 200){
        setProducts(response.data['products']);
        setProductsLength(response.data['productsNum']);
      }
    } catch{
      setLoading(false);
      changePage(Pages.ErrorLoading)
    }

    setCurrentPage(data.selected);
    setLoading(false);
  }

    const fetchData = async() => {
      setLoading(true);
      await logout();

      try{
        const response = await axios.get(
          url_product+"page/"+productsPerPage+"/1",
          { withCredentials: true }
        );
  
        if(response.status === 200){
          setProducts(response.data['products']);
          setProductsLength(response.data['productsNum']);
        }
      } catch{
        setLoading(false);
        changePage(Pages.ErrorLoading)
      }

      setLoading(false);
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

          <div className='products-container'>
            <div className="products">
              {products &&
                products.map((product:any) => (
                  
                  <div key={product["id"]}>
                  
                  { product &&
                    product['stock'] > 0?

                    <div className="product">
                      <h3 className='center'>{product['name']}</h3>
                      <img className="photo"src={product['image']? product['image']: imageNotAvailable} alt={product['name']} />
                        <div className="details price">Price: {product['price']}₪</div>
                        <div className="details category">Category: {product['category']}</div>
                      <button className='product-btn' onClick={() => goToProduct(product)}>
                        See Details
                      </button>
                    </div>

                    :

                    <></>
                  }

                  </div>

                ))}
            </div>
          </div>

        <div className='center'>
          <ReactPaginate className='center'
            previousLabel= "<"
            nextLabel = ">"
            breakLabel = "..."
            pageCount={Math.ceil(productsLength / productsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            breakClassName = 'btn pagenation-button'
            activeClassName = 'btn pagenation-active-button' 
            pageClassName = 'btn pagenation-button' 
            previousClassName = 'btn pagenation-sign-button' 
            nextClassName = 'btn pagenation-sign-button' 
          />
        </div>


        </div>
      }

      </div>
    );
}
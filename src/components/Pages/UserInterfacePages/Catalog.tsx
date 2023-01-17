import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { PageLayout } from '../PageLayout';
import { pages, Pages } from '../../../Constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Loading } from '../../Common/Loading';
import { Pagination } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

let url_product = `http://localhost:3001/products/`;

let productsPerPage = 8;

export interface CatalogProps {
  changePage(newPage: Pages): void,
}

export const Catalog: React.FC<CatalogProps> = ({
  changePage,  
}) => {  

  let imageNotAvailable = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [products, setProducts] = useState([]);

  const goToProduct = (product:any) => {
    localStorage.setItem('product', product['id']);

    changePage(Pages.Product)
  }


  const handlePageClick = (data: { selected: number }) => {
    let selected = data.selected;
    setCurrentPage(selected);
  }
  const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);


    const fetchData = async() => {
      setLoading(true);
      try{
        const response = await axios.get(
          url_product,
          { withCredentials: true }
        );
  
        if(response.status === 200){
          setProducts(response.data);
          setLoading(false);
        }
      } catch{
        setLoading(false);
        changePage(Pages.ErrorLoading)
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

          <div className='products-container'>
            <div className="products">
              {currentProducts &&
                currentProducts?.map((product) => (
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

        <div className='center'>
          <ReactPaginate className='center'
            previousLabel= "<"
            nextLabel = ">"
            breakLabel = "..."
            pageCount={Math.ceil(products.length / productsPerPage)}
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
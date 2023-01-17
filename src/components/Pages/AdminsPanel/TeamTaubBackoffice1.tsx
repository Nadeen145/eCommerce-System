import React, { useEffect, useState } from 'react';
import './AdminsPanel.css';
import { Header } from '../../AppHeader/Header';
import { PageLayout } from '../PageLayout';
import { pages, Pages } from '../../../Constants';
import { BackofficeNavbar } from './BackofficeNavebar';
import axios from 'axios';
import { Loading } from '../../Common/Loading';
import ReactPaginate from 'react-paginate';

let url_product = `http://localhost:3001/products/`;

let productsPerPage = 8;

export interface TeamTaubBackoffice1Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice1: React.FC<TeamTaubBackoffice1Props> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageClick = (data: { selected: number }) => {
    let selected = data.selected;
    setCurrentPage(selected);
  }
  const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

    const updateProduct = async(id:any) => {
      localStorage.setItem('product', id);
      changePage(Pages.TeamTaubBackoffice2);
    }

    const removeProduct = async(id:any, product:any) => {
      setLoading(true);
      try{
        const response = await axios.delete(
          url_product+id,
          { withCredentials: true }
        );
  
        if(response.status === 200){
          let index = 0;
          products?.map((product) => {
            if(product['id'] === id){
              products.splice(index,1);
            }
            index = index + 1;
          });
          setProducts(products);      
        }
      } catch{
        setLoading(false);
      }
      setLoading(false);
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
          title={pages[Pages.TeamTaubBackoffice1]}
        />

        <BackofficeNavbar changePage={changePage} isProductsButton={true} />

    {
    loading?
    <div className='margin-top-container'>
      <Loading /> 
    </div>
            :
    <div>
        <button className='btn new-button' onClick={() => updateProduct('')}>
            + New Product
        </button>

        <div className='products-list-container'>
            {
            
            products.length === 0 ? (
              <div className="center">
                <h2 className='center'>There are no products!</h2>
              </div>
            ) : 
            
            currentProducts &&
              currentProducts?.map((product) => (
                <div key={product['id']} className="list-item-product split-screen">

                    <div className='text-container side3 padding-two-sides'>
                        <span>ID: {product['id']}</span>
                        <br></br>
                        <span>Name: {product['name']}</span>
                        <br></br>

                        <span>Category: {product['category']}</span>
                        <br></br>
                        <span>Price: {product['price']} ₪</span>
                        <br></br>

                        <span>Amount: {product['price']}</span>
                    </div>

                    <div className='side1'>
                        <button className='btn update-button' onClick={() => updateProduct(product['id'])}>
                            Update
                        </button>
                        <br></br>
                        <button className='btn remove-button' onClick={() => removeProduct(product['id'], product)}>
                            Remove
                        </button>
                    </div>

                </div>
              ))}
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
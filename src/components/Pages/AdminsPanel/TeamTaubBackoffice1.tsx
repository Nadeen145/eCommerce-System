import React, { useEffect, useState } from 'react';
import './AdminsPanel.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import { BackofficeNavbar } from './BackofficeNavebar';
import axios from 'axios';
import { Loading } from '../../Common/Loading';
import ReactPaginate from 'react-paginate';

// let url_product = `http://localhost:3001/products/`;
let url_product = `https://gatewayserver.onrender.com/products/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

let productsPerPage = 12;

export interface TeamTaubBackoffice1Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice1: React.FC<TeamTaubBackoffice1Props> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [productsLength, setProductsLength] = useState<number>(0);

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

    const updateProduct = async(id:any) => {
      localStorage.setItem('product', id);
      await logout();
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
      await logout();

      try{
        const response = await axios.get(
          url_product+"page/"+productsPerPage+"/1",
          { withCredentials: true }
        );
  
        if(response.status === 200){
          setProducts(response.data['products']);
          setProductsLength(response.data['productsNum']);
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

        <BackofficeNavbar changePage={changePage} page={0} />

    {
    loading?
    <div className='margin-top-container'>
      <Loading /> 
    </div>
            :
    <div>

      { localStorage.getItem("permission") === "A" || localStorage.getItem("permission") === "M"?
        <button className='btn new-button' onClick={() => updateProduct('')}>
            + New Product
        </button>
        :
        <></>
      }

        <div className='products-list-container'>
            {
            
            products.length === 0 ? (
              <div className="center">
                <h2 className='center'>There are no products!</h2>
              </div>
            ) : 
            
            products &&
              products.map((product) => (
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

                        <span>Amount: {product['stock']}</span>
                    </div>

                    <div className='side1'>
                      { localStorage.getItem("permission") === "A" || localStorage.getItem("permission") === "M"?
                        <button className='btn update-button' onClick={() => updateProduct(product['id'])}>
                            Update
                        </button>
                        :
                        <></>
                      }

                        <br></br>

                      { localStorage.getItem("permission") === "A"?
                        <button className='btn remove-button' onClick={() => removeProduct(product['id'], product)}>
                            Remove
                        </button>
                        :
                        <></>
                      }  
                    </div>

                </div>
              ))}
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
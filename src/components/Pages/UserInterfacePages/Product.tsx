import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

// let url_product = `http://localhost:3001/products/`;
// let url_cart = `http://localhost:3001/carts/`;

let url_product = `https://gatewayserver.onrender.com/products/`;
let url_cart = `https://gatewayserver.onrender.com/carts/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface ProductProps {
  changePage(newPage: Pages): void,
}

export const Product: React.FC<ProductProps> = ({
  changePage,  
}) => {  

    let imageNotAvailable = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"

    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<any[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

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

    const increase = () => {
      let stock = parseInt(product[0]['stock']);
      if(quantity >= stock){
        return;
      }
      setQuantity(quantity => quantity + 1);
    };
    const decrease = () => {
        if(quantity <= 1){
            return;
        }
        setQuantity(quantity => quantity - 1);
    };

    const goToCart = async(id:string) => {
      setLoading(true);
      await logout();

      try{
        const response = await axios.put(
          url_cart+localStorage.getItem('username'),
          {
            productId: id,
            quantity: quantity
          },
          { withCredentials: true }
        );
  
        if(response.status === 200){
          product.push(response.data);
          setProduct(product);

          setLoading(false);
          changePage(Pages.Catalog);
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
          url_product+localStorage.getItem('product'),
          { withCredentials: true }
        );
  
        localStorage.setItem("product", '');

        if(response.status === 200){
          product.push(response.data);
          setProduct(product);
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
          title={pages[Pages.Product]}
        />

        <button className='btn back-button' onClick={() => changePage(Pages.Catalog)}>
            ← Go Back
        </button>

        {
        loading || !product[0]?
        <div className='margin-top-container'>
          <Loading /> 
        </div>
            :

            <div>
        <div className='product-detail-container'>
             
            <img className='product-image-container' 
              src={product[0]['image']? product[0]['image'] : imageNotAvailable} 
              alt={product[0]['name']} />

            <div className='product-detail'>
                <div className="product-text">{product[0]['name']}</div>
                <div className="product-text">Price: {product[0]['price']} ₪</div>
                <div className="product-text">Category: {product[0]['category']}</div>
                <div className="product-text" >
                 Quantity:
                    <button className="btn product-button-quantity" onClick={decrease}>-</button>
                     {quantity}
                    <button className="btn product-button-quantity" onClick={increase}>+</button>
                </div>
                <button 
                    className="product-button btn"
                    onClick={() => goToCart(product[0]['id'])}>
                Add to cart
                </button>
            </div>
        </div>

        <div className='product-description-container'>
            Product description
        </div>

        <div className='product-text product-text-container'>
            {product[0]['description']}
        </div>
        </div>
}
      </div>
    );
}
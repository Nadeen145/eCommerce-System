import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

// let url_cart = `http://localhost:3001/carts/`;
let url_cart = `https://gatewayserver.onrender.com/carts/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface CartProps {
  changePage(newPage: Pages): void,
}

export const Cart: React.FC<CartProps> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

  const calculateTotalPrice = () => {
    let sum = 0;
    products.map((product:any)=>{
      sum += (product['price'])*(product['quantity']);
    })
    setTotalPrice(sum);
  }

  const fetchData = async() => {
    setLoading(true);
    await logout();

    try{
      const response = await axios.get(
        url_cart+localStorage.getItem('username'),
        { withCredentials: true }
      );

      if(response.status === 200){
        setProducts(response.data);

        let sum = 0;
        response.data.map((product:any)=>{
          sum += (product['price'])*(product['quantity']);
        })
        setTotalPrice(sum);
      }
    } catch{
      setLoading(false);
      changePage(Pages.ErrorLoading)
    }

    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  }, [])

  const handleRemoveFromCart = async(product:any) => {
    setLoading(true);
    await logout();

      try{
        const response = await axios.delete(
          url_cart+localStorage.getItem('username')+"/"+product['productId'],
          { withCredentials: true }
        );

        if(response.status === 200){
          let index = 0;

          let data = products.filter(function(value, index, arr){ 
            return value['productId'] !== product['productId'];
          });
    
          setProducts(data);

          let sum = 0;
          data.map((product:any)=>{
            sum += (product['price'])*(product['quantity']);
          })
          setTotalPrice(sum);

        }
      } catch{
        setLoading(false);
      }
      setLoading(false);
  };

  const handleSeeProduct = async(productId:any) => {
    await logout();
    localStorage.setItem('product', productId);
    changePage(Pages.Product)
  };

  const goToCheckout = async() => {
    await logout();
    changePage(Pages.Checkout)
  }

  return (
    <div className="root">

      <Header 
        changePage={changePage} 
        title={pages[Pages.Cart]}
      />

      <button className='btn back-button' onClick={() => changePage(Pages.Catalog)}>
          ← Go Back
      </button>

      {
        loading?
        <div className='margin-top-container'>
          <Loading /> 
        </div>
            :
        <div>

      <div className="cart-container">
      {products.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty!</p>
          <div className="start-shopping">
          </div>
        </div>
      ) 
      : 
      (
        <div>
          <div className="cart-items">
            {products &&
              products.map((cartItem) => (
                <div className="cart-item " key={cartItem['productId']}>
                  <div className="cart-product">
                    <img src={cartItem['image']} alt={cartItem['name']} />
                    <div>
                      <h3>{cartItem['name']}</h3>
                      <p>{cartItem['description']}</p>

                      <button onClick={() => handleSeeProduct(cartItem['productId'])}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                              width="20" 
                              height="20" 
                              fill="rgb(193, 128, 163)" 
                              className="bi bi-info-circle-fill" 
                              viewBox="0 0 16 16"> 
                              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/> 
                        </svg>
                        <span> </span>
                        See product
                      </button>

                      <br></br>

                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                              width="20" 
                              height="20" 
                              fill="red" 
                              className="bi bi-trash-fill" 
                              viewBox="0 0 16 16"> 
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/> 
                        </svg>
                        <span> </span>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">Quantity: {cartItem['quantity']}</div>
                  <div className="cart-product-price">Price: {cartItem['price']} ₪</div>
                  <div className="cart-product-total-price">
                    Total Price: {cartItem['price']*cartItem['quantity']} ₪
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Total</span>
                <span className="amount">{totalPrice} ₪</span>
              </div>
              <button className='btn' onClick={() => goToCheckout()}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
      }
    </div>
  );
}
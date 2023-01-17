import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { PageLayout } from '../PageLayout';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

let url_cart = `http://localhost:3001/carts/`;

export interface CartProps {
  changePage(newPage: Pages): void,
}

export const Cart: React.FC<CartProps> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let sum = 0;
    products.map((product:any)=>{
      sum += (product['price'])*(product['quantity']);
    })
    setTotalPrice(sum);
  }

  const fetchData = async() => {
    setLoading(true);
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

        setLoading(false);
      }
    } catch{
      setLoading(false);
      changePage(Pages.ErrorLoading)
    }
  }

  useEffect(()=>{
    fetchData();
  }, [])

  /*
  const handleAddToCart = async (product:any) => {
    try{
      let stock = parseInt(product['stock']);
      if(product['quantity'] >= stock){
        return;
      }

      const response = await axios.put(
        url_cart+localStorage.getItem('username'),
        {
          productId: product['productId'],
          quantity: product['quantity']+1
        },
        { withCredentials: true }
      );

      if(response.status === 200){
        const newProducts =  products.map((item:any)=>{
          if(item['productId'] === product['productId']){
            return{
              ...item,
              quantity: item['quantity'] + 1,
            }
          } else{
            return item;
          }
        })
        setProducts(newProducts);

        let sum = 0;
        newProducts.map((product:any)=>{
          sum += (product['price'])*(product['quantity']);
        })
        setTotalPrice(sum);

      }
    } catch{
    }
  };

  const handleDecreaseCart = async(product:any) => {
    try{
      if(product['quantity'] <= 1){
        return;
      }

      const response = await axios.put(
        url_cart+localStorage.getItem('username'),
        {
          productId: product['productId'],
          quantity: product['quantity']-1
        },
        { withCredentials: true }
      );

      if(response.status === 200){
        const newProducts =  products.map((item:any)=>{
          if(item['productId'] === product['productId']){
            return{
              ...item,
              quantity: item['quantity'] - 1,
            }
          } else{
            return item;
          }
        })
        setProducts(newProducts);

        let sum = 0;
        newProducts.map((product:any)=>{
          sum += (product['price'])*(product['quantity']);
        })
        setTotalPrice(sum);

      }
    } catch{
    }
  };
  */

  const handleRemoveFromCart = async(product:any) => {
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
    }
  };

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
      ) : 
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
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">{cartItem['price']} ₪</div>
                  <div className="cart-product-total-price">
                    {cartItem['price']*cartItem['quantity']} ₪
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
              <button className='btn' onClick={() => changePage(Pages.Checkout)}>
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
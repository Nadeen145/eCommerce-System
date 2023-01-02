import React, { useEffect, useState } from 'react';
import './../UserInterface.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';

export interface CartProps {
  changePage(newPage: Pages): void,
}

export const Cart: React.FC<CartProps> = ({
  changePage,  
}) => {  
    //TODO: product
    let cart = [
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      },
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      },
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      },
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      },
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      },
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      },
      {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat",
        quantity:10
      }
    ]

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(()=>{
    let sum = 0;
    cart.map((item)=>{
      sum += (item.price)*(item.quantity);
    })
    setTotalPrice(sum);
  }, [])

  const handleAddToCart = (product:any) => {
      // addToCart(product);
  };

  const handleDecreaseCart = (product:any) => {
    // decreaseCart(product);
  };

  const handleRemoveFromCart = (product:any) => {
    // removeFromCart(product);
  };

  const handleClearCart = () => {
    // clearCart();
  };

  return (
    <div className="root">

      <Header 
        changePage={changePage} 
        title={pages[Pages.Cart]}
        isUserInterface={true}  
      />

      <button className='btn back-button' onClick={() => changePage(Pages.Product)}>
          ← Go Back
      </button>

      <div className="cart-container">
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
          </div>
        </div>
      ) : (
        <div>
          <div className="cart-items">
            {cart &&
              cart.map((cartItem) => (
                <div className="cart-item " key={cartItem._id}>
                  <div className="cart-product">
                    <img src={cartItem.image?.url} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.price*cartItem.quantity}₪
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Total</span>
                <span className="amount">{totalPrice}₪</span>
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
  );
}
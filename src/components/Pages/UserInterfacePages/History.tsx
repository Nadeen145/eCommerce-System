import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { PageLayout } from '../PageLayout';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

let url_order = `http://localhost:3001/orders/`;

export interface HistoryProps {
  changePage(newPage: Pages): void,
}

export const History: React.FC<HistoryProps> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchData = async() => {
    setLoading(true);
    try{
      const response = await axios.get(
        url_order+localStorage.getItem('username'),
        { withCredentials: true }
      );

      if(response.status === 200){
        setOrders(response.data);
        setLoading(false);
      }
    } catch{
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  }, [])

  return (
    <div className="root">

      <Header 
        changePage={changePage} 
        title={pages[Pages.UserHistory]}
      />

      <button className='btn back-button' onClick={() => changePage(Pages.Product)}>
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
      {orders.length === 0 ? (
        <div className="cart-empty">
          <p>Yet no orders!</p>
          <div className="start-shopping">
          </div>
        </div>
      ) : (
          <div className="cart-items">
            {orders &&
              orders.map((order) => (
                <div className="cart-item " key={order['id']}>
                  <div className="cart-product">
                    <div>
                      <h3>{order['id']}</h3>
                      <p>{order['timestamp']}</p>
                      <p>{order['status']}</p>
                      <p>{order['items']}</p>
                    </div>
                  </div>
                  <div className="cart-product-price">{order['totalPrice']} ₪</div>
                </div>
              ))}
          </div>
      )}
    </div>
    </div>
      }
    </div>
  );
}
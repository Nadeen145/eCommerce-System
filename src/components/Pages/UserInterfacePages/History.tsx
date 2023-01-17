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
        url_order, //+localStorage.getItem('username'),
        { withCredentials: true }
      );

      if(response.status === 200){
        setOrders(response.data);
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

  return (
    <div className="root">

      <Header 
        changePage={changePage} 
        title={pages[Pages.UserHistory]}
      />

      <div>
        <br></br>
        <br></br>
        <div className="center">
          <h2 className='center'>{localStorage.getItem('username')}</h2>
        </div>
        <br></br>
      </div>

      {
          loading?
          <div className='margin-top-container'>
            <Loading /> 
          </div>
                  :
          <div>
            <div className='products-list-container'>
              {
                
                orders.length === 0 ? (
                  <div className="center">
                    <h2 className='center'>There is no history available!</h2>
                  </div>
                ) : 
                
                orders &&
                orders.map((order) => (
                  <div key={order['id']} className="list-item-product split-screen">

                      <div className='text-container side3 padding-two-sides'>
                          <span>Date: {order['timestamp'].slice(0, 10)}</span>
                          <br></br>
                          <br></br>

                          <span>Items: </span>
                            {
                              orders.map((order) => (
                                <div>
                                  <ul>order['username']</ul>
                                </div>
                              ))
                            }
                            
                          <br></br>
                          <span>Total price: {order['totalPrice']} ₪</span>
                      </div>

                      <div className='side1'>
                          <div>Status: </div>
                              <div className='center like-button'>
                                {order['status']}
                              </div>
                      </div>

                  </div>
                ))}
            </div>
          </div>
          }


    </div>
  );
}
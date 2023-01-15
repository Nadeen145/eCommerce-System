import React, { useEffect, useState } from 'react';
import './AdminsPanel.css';
import { Header } from '../../AppHeader/Header';
import { PageLayout } from '../PageLayout';
import { pages, Pages } from '../../../Constants';
import { BackofficeNavbar } from './BackofficeNavebar';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

let url_order = `http://localhost:3001/orders/`;

// TODO: Messege Broker => changeSatus 

export interface TeamTaubBackoffice3Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice3: React.FC<TeamTaubBackoffice3Props> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const changeSatus = async(event:any, id:any) => {
    try{
      const response = await axios.put(
        url_order+id,
        {
          status: 'Delivered'
        },
        { withCredentials: true }
      );

      if(response.status === 200){

        const newOrders =  orders.map((item:any)=>{
          if(item['id'] === id){
            return{
              ...item,
              status: 'Delivered',
            }
          } else{
            return item;
          }
        })

        setOrders(newOrders);
      }
    } catch{
    }
  }

    const fetchData = async() => {
      setLoading(true);

      try{
        const response = await axios.get(
          url_order,
          { withCredentials: true }
        );

        if(response.status === 200){
          console.log(response.data);
          setOrders(response.data);  
          setLoading(false);
        }
      } catch{
        setLoading(false);
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
            title={pages[Pages.TeamTaubBackoffice1]}
          />
  
          <BackofficeNavbar changePage={changePage} isProductsButton={false} />
  
          <div className='order-page-option-bar-text center'>
                <span>Orders Page Option Bar</span>
          </div>

          {
          loading?
          <div className='margin-top-container'>
            <Loading /> 
          </div>
                  :
          <div>
            <div className='products-list-container'>
              {orders &&
                orders.map((order) => (
                  <div key={order['id']} className="list-item-product split-screen">

                      <div className='text-container side3 padding-two-sides'>
                          <span>ID: {order['id']}</span>
                          <br></br>
                          <span>Costumer username: {order['username']}</span>
                          <br></br>
                          <span>Adress: {order['address']}</span>
                          <br></br>
                          <span>Total price: {order['totalPrice']} ₪</span>
                      </div>

                      <div className='side1'>
                          <div>Status: </div>
                              <div className='center like-button'>
                                {order['status']}
                              </div>
                          <br></br>
                          {
                              order['status'] !== 'Pending'?
                              <></>
                              :
                              <button className='btn status-update-button' onClick={(event)=> changeSatus(event, order['id'])}>
                                  Mark as Delivered!
                              </button>
                          }
                      </div>

                  </div>
                ))}
            </div>
          </div>
          }

        </div>
      );
}
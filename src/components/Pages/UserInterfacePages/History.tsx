import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

// let url_order = `http://localhost:3001/orders/`;
let url_order = `https://gatewayserver.onrender.com/orders/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface HistoryProps {
  changePage(newPage: Pages): void,
}

export const History: React.FC<HistoryProps> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);

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

  const fetchData = async() => {
    setLoading(true);
    await logout();

    try{
      const response = await axios.get(
        url_order+localStorage.getItem('username'),
        { withCredentials: true }
      );

      if(response.status === 200){
        setOrders(response.data);
      }
    } catch(error:any){
      setLoading(false);
      changePage(Pages.ErrorLoading)
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

      <div>
        <br></br>
        <br></br>
        <div className="center">
          <h2 className='center'>{localStorage.getItem('username')}</h2>
          <button className='btn back-button' onClick={() => changePage(Pages.Catalog)}>
            ← Go Back
          </button>
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
                              order['items']?.map((item:any) => (
                                <div>
                                  <ul key={order['id'] + item['productId']}>
                                    <span>
                                      Product's name is
                                    </span>
                                    <span> </span>
                                    <span className='pink'>
                                       {item['name']}
                                    </span>
                                    <span> </span>
                                    <span>
                                      from category
                                    </span>
                                    <span> </span>
                                    <span className='pink'>
                                      {item['category']}
                                    </span>
                                    <span> </span>
                                    <span>
                                      X
                                    </span>
                                    <span> </span>
                                    <span className='pink'>
                                       {item['quantity']}
                                    </span>
                                  </ul>
                                </div>
                              ))
                            }

                      </div>

                      <div className='side1'>
                          <div>Status: </div>
                            <div className='center like-button'>
                              {order['status']}
                            </div>

                          <br></br>

                          <div>Total price: </div>
                          <div className='center like-button'>
                            <span></span>
                            <span className='pink'>
                              {order['totalPrice']}
                            </span>
                            <span>
                              ₪
                            </span>
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
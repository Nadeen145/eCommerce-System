import React, { useEffect, useState } from 'react';
import './AdminsPanel.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import { BackofficeNavbar } from './BackofficeNavebar';
import axios from 'axios';
import { Loading } from '../../Common/Loading';
import ReactPaginate from 'react-paginate';

// let url_order = `http://localhost:3001/orders/`;
let url_order = `https://gatewayserver.onrender.com/orders/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

let ordersPerPage = 8;

export interface TeamTaubBackoffice3Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice3: React.FC<TeamTaubBackoffice3Props> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [ordersLength, setOrdersLength] = useState<number>(0);

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
        url_order+"page/"+ordersPerPage+"/"+data.selected,
        { withCredentials: true }
      );

      if(response.status === 200){
        setOrders(response.data['orders']);
        setOrdersLength(response.data['ordersNum']);
      }
    } catch{
      setLoading(false);
      changePage(Pages.ErrorLoading)
    }

    setCurrentPage(data.selected);
    setLoading(false);
  }

  const changeSatus = async(event:any, id:any) => {
    setLoading(true);
    await logout();

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
        setLoading(false);
      }
    } catch{
      setLoading(false);
    }
  }

    const fetchData = async() => {
      setLoading(true);
      await logout();

      try{
        const response = await axios.get(
          url_order+"page/"+ordersPerPage+"/1",
          { withCredentials: true }
        );

        if(response.status === 200){
          setOrders(response.data['orders']);
          setOrdersLength(response.data['ordersNum']);        }
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
            title={pages[Pages.TeamTaubBackoffice1]}
          />
  
          <BackofficeNavbar changePage={changePage} page={1} />

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
                  <h2 className='center'>There are no orders!</h2>
                </div>
              ) : 
              
              orders &&
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
                              order['status'] === 'Pending' && localStorage.getItem("permission") === "A"?
                              <button className='btn status-update-button' onClick={(event)=> changeSatus(event, order['id'])}>
                                  Mark as Delivered!
                              </button>
                              :
                              <></>
                          }
                      </div>

                  </div>
                ))}
            </div>

            { orders && orders.length > 0? 
                <div className='center'>
                  <ReactPaginate className='center'
                    previousLabel= "<"
                    nextLabel = ">"
                    breakLabel = "..."
                    pageCount={Math.ceil(ordersLength / ordersPerPage)}
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
                :
                <></>
            }

          </div>

            }

        </div>
      );
}
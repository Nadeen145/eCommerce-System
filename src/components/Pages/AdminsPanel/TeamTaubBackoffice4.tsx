import React, { useEffect, useState } from 'react';
import './AdminsPanel.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import { BackofficeNavbar } from './BackofficeNavebar';
import axios from 'axios';
import { Loading } from '../../Common/Loading';
import ReactPaginate from 'react-paginate';

// let url_user = `http://localhost:3001/users/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

let usersPerPage = 12;

export interface TeamTaubBackoffice4Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice4: React.FC<TeamTaubBackoffice4Props> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [usersLength, setUsersLength] = useState<number>(0);

  const handlePageClick = async(data: { selected: number }) => {
    setLoading(true);

    try{
      const response = await axios.get(
        url_user+"page/"+usersPerPage+"/"+data.selected,
        { withCredentials: true }
      );

      if(response.status === 200){
        setUsers(response.data['users']);
        setUsersLength(response.data['usersNum']);
      }
    } catch{
      setLoading(false);
      changePage(Pages.ErrorLoading)
    }

    setCurrentPage(data.selected);
    setLoading(false);
  }

  const getPermission = (permission:string) => {
    if(permission === "U"){
      return "User";
    }

    if(permission === "W"){
      return "Workhouse";
    }
    
    if(permission === "M"){
      return "Manager";
    }

    if(permission === "A"){
      return "Admin";
    }

    return "Undefined";
  }

  const updatePermission = async (username: String, currentPermission: String, permission:String) => {
    setLoading(true);

      if(currentPermission === permission){
        setLoading(false);
        return;
      }

      try{
        const response = await axios.put(
          url_user + 'permission',
          {
            username: username,
            permission: permission 
          },
          { withCredentials: true }
        );

        if(response.status === 200){
          setLoading(false);
          fetchData();
        }
      } catch{
        setLoading(false);
        changePage(Pages.ErrorLoading)
      }

      setLoading(false);
  }

    const fetchData = async() => {
      setLoading(true);

      try{
        const response = await axios.get(
          url_user+"page/"+usersPerPage+"/1",
          { withCredentials: true }
        );

        if(response.status === 200){
          setUsers(response.data['users']);
          setUsersLength(response.data['usersNum']);
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
            title={pages[Pages.TeamTaubBackoffice4]}
          />
  
          <BackofficeNavbar changePage={changePage} page={2} />

          {
          loading?
          <div className='margin-top-container'>
            <Loading /> 
          </div>
                  :
          <div>
            <div className='products-list-container'>
              {
              
              users.length === 0 ? (
                <div className="center">
                  <h2 className='center'>There are no orders!</h2>
                </div>
              ) : 
              
              users &&
                users.map((user) => (
                  <div key={user['id']} className="list-item-product split-screen">

                      <div className='text-container side3 padding-two-sides'>
                          <span>Username: {user['username']}</span>
                          <br></br>
                          <span>Permission: {getPermission(user['permission'])}</span>
                      </div>

                      <div className='side1'>
                        {
                          user['permission'] === "A"?
                            <></>
                            :
                            <div>
                              <button className='btn status-update-permission-button' 
                                      onClick={()=> updatePermission(
                                                    user['username'], user['permission'], "U")}>
                                User
                              </button>
                              <br></br>
                              <br></br>
                              <button className='btn status-update-permission-button' 
                                      onClick={()=> updatePermission(
                                                    user['username'], user['permission'], "W")}>
                                Workhouse
                              </button>
                              <br></br>
                              <br></br>
                              <button className='btn status-update-permission-button' 
                                      onClick={()=> updatePermission(
                                                    user['username'], user['permission'], "M")}>
                                Manager
                              </button>
                            </div>
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
              pageCount={Math.ceil(usersLength / usersPerPage)}
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
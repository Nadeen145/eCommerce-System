import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pages, pages } from '../../Constants';
import './AppHeader.css';

// let url_user = `http://localhost:3001/users/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface NavbarProps {
    changePage(newPage: Pages): void;
}
export const Navbar: React.FC<NavbarProps> = ({
    changePage,
}) => {

    const [isUserInterface, setIsUserInterface] = useState(true);

    const logout = async() => {
        try{
            const response = await axios.post(
            url_user+"logout", {}, { withCredentials: true }
            );
        
            if(response.status === 200){
                localStorage.clear();
                changePage(Pages.Login);
            }
        }
        catch(error){

        }
    }

    useEffect(()=>{
        if(localStorage.getItem('permission') === 'U'){
            setIsUserInterface(true);
        } else{
            setIsUserInterface(false);
        }
    }, [])

    return (
        <div className='nav-tab'>
            {
                isUserInterface?
                <div>
                    <h3 className='right'>{localStorage.getItem("username")}</h3>

                    <button className="nav-bag btn" onClick={() => changePage(Pages.Cart)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="35" 
                            height="35" 
                            fill="currentColor" 
                            color='white'
                            className="bi bi-cart2" 
                            viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                    </button>

                    <button className="nav-bag btn" onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="35" 
                            height="35" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            color='white' 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>

                    <button className='nav-bag btn' onClick={()=>changePage(Pages.UserHistory)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35" 
                            height="35" 
                            fill="currentColor"
                            color='white' 
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="white">
                            </path>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" fill="white"></path>
                        </svg>
                    </button>

                </div>
                :
                <div>
                    <h3 className='right'>{localStorage.getItem("username")}</h3>

                    <button className='nav-button' 
                        onClick={() => changePage(Pages.Catalog)}>
                    eCommerce System
                    </button>  
                    
                    <button className='nav-button' 
                        onClick={() => changePage(Pages.TeamTaubBackoffice1)}>
                    {pages[Pages.TeamTaubBackoffice1]}
                    </button>   

                    <button className="nav-bag btn" onClick={() => changePage(Pages.Cart)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="35" 
                            height="35" 
                            fill="currentColor" 
                            color='white'
                            className="bi bi-cart2" 
                            viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                    </button>

                    <button className="nav-bag btn" onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="35" 
                            height="35" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            color='white' 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>

                    <button className='nav-bag btn' onClick={()=>changePage(Pages.UserHistory)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35" 
                            height="35" 
                            fill="currentColor"
                            color='white' 
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="white">
                            </path>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" fill="white"></path>
                        </svg>
                    </button>  

                </div>
            }
        </div>
    )
}
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pages, pages } from '../../Constants';
import './AppHeader.css';

let url_user = `http://localhost:3001/users/`;

export interface NavbarProps {
    changePage(newPage: Pages): void;
}
export const Navbar: React.FC<NavbarProps> = ({
    changePage,
}) => {

    const [isUserInterface, setIsUserInterface] = useState(true);

    const logout = async() => {
        const response = await axios.post(
          url_user+"logout", {}, { withCredentials: true }
        );
    
        if(response.status === 200){
            localStorage.clear();
            changePage(Pages.Login);
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
                    <h3>{localStorage.getItem("username")}</h3>
                    <button className='nav-button' 
                        onClick={() => changePage(Pages.Cart)}>
                    {pages[Pages.Cart]}
                    </button>         
                    <button className='nav-button' 
                        onClick={logout}>
                    Logout
                    </button>          
                </div>
                :
                <div>
                    <h3>{localStorage.getItem("username")}</h3>
                    <button className='nav-button' 
                        onClick={() => changePage(Pages.Catalog)}>
                    eCommerce System
                    </button>  
                    <button className='nav-button' 
                        onClick={() => changePage(Pages.TeamTaubBackoffice1)}>
                    {pages[Pages.TeamTaubBackoffice1]}
                    </button>   
                    <button className='nav-button' 
                        onClick={() => changePage(Pages.Cart)}>
                    {pages[Pages.Cart]}
                    </button>    
                    <button className='nav-button' 
                        onClick={logout}>
                    Logout
                    </button>    
                </div>
            }
        </div>
    )
}
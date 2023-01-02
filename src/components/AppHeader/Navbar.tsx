import React from 'react';
import { Pages, pages } from '../../Constants';
import './AppHeader.css';

export interface NavbarProps {
    changePage(newPage: Pages): void;
    isUserInterface: boolean;
}
export const Navbar: React.FC<NavbarProps> = ({
    changePage,
    isUserInterface,
}) => {

    let list = ['Admin', 'Cart'];

    return (
        <div className='nav-tab'>
            {
                isUserInterface?
                <div>
                    {/* TODO: username */}
                    <h3>username</h3>
                    <button className='nav-button' 
                        onClick={() => changePage(Pages.Cart)}>
                    {pages[Pages.Cart]}
                    </button>              
                </div>
                :
                <div>
                    {/* TODO: username */}
                    <h3>username</h3>
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
                </div>
            }
        </div>
    )
}
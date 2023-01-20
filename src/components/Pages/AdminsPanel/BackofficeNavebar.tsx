import React, { useEffect } from 'react';
import { Pages } from '../../../Constants';
import './AdminsPanel.css';

export interface BackofficeNavbarProps {
    page: number,
    changePage(newPage: Pages): void,
}
export const BackofficeNavbar: React.FC<BackofficeNavbarProps> = ({
    page,
    changePage
}) => {

    useEffect(()=>{
        const btnProducts = document.getElementById('products-button');
        const btnOrders = document.getElementById('orders-button');

        if(page === 0 && btnProducts !== null && btnOrders !== null){
            btnProducts.style.backgroundColor = 'rgb(0, 84, 124)';
            btnOrders.style.backgroundColor = 'rgb(193, 128, 163);';
        } 
        
        if(page === 1 && btnOrders != null && btnProducts != null){
            btnOrders.style.backgroundColor = 'rgb(0, 84, 124)';
            btnProducts.style.backgroundColor = 'rgb(193, 128, 163)';
        }
        
        if(page === 2 && btnOrders != null && btnProducts != null){
            btnProducts.style.backgroundColor = 'rgb(193, 128, 163)';
            btnOrders.style.backgroundColor = 'rgb(193, 128, 163);';
        }

        if(localStorage.getItem("permission") === "A"){
            const btnPermissions = document.getElementById('permissions-button');
            if(btnPermissions !== null){
                if(page === 0 || page === 1){
                    btnPermissions.style.backgroundColor = 'rgb(193, 128, 163);';
                }
                if(page === 2){
                    btnPermissions.style.backgroundColor = 'rgb(0, 84, 124)';
                }
            }
        }

    }, [])

    const changeCurrentPageProducts = () => {
        if(page === 0){
            return;
        }
        return changePage(Pages.TeamTaubBackoffice1);
    }

    const changeCurrentPageOrders = () => {
        if(page === 1){
            return;
        }
        return changePage(Pages.TeamTaubBackoffice3);
    }

    const changeCurrentPagePermissions = () => {
        if(page === 2){
            return;
        }
        return changePage(Pages.TeamTaubBackoffice4);
    }

    return (
        <div className='center'>
            <button id='products-button' 
                    className='btn'
                    onClick={() => changeCurrentPageProducts()}>Products</button>
            <button id='orders-button' 
                    className='btn'
                    onClick={() => changeCurrentPageOrders()}>Orders</button>
            { localStorage.getItem("permission") === "A"?
                <button id='permissions-button' 
                    className='btn'
                    onClick={() => changeCurrentPagePermissions()}>Permissions</button>
                :
                <></>
            }
        </div>
    )
}
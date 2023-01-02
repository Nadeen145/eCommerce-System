import React, { useEffect } from 'react';
import { Pages } from '../../../Constants';
import './AdminsPanel.css';

export interface BackofficeNavbarProps {
    isProductsButton: boolean
    changePage(newPage: Pages): void,
}
export const BackofficeNavbar: React.FC<BackofficeNavbarProps> = ({
    isProductsButton,
    changePage
}) => {

    useEffect(()=>{
        const btnProducts = document.getElementById('products-button');
        const btnOrders = document.getElementById('orders-button');
        if(isProductsButton && btnProducts != null && btnOrders != null){
            btnProducts.style.backgroundColor = 'rgb(0, 84, 124)';
            btnOrders.style.backgroundColor = 'rgb(193, 128, 163);';
        } else{
            if(btnOrders != null && btnProducts != null){
                btnOrders.style.backgroundColor = 'rgb(0, 84, 124)';
                btnProducts.style.backgroundColor = 'rgb(193, 128, 163)';
            }
        }

    }, [])

    const changeCurrentPageProducts = () => {
        if(isProductsButton){
            return;
        }
        return changePage(Pages.TeamTaubBackoffice1);
    }

    const changeCurrentPageOrders = () => {
        if(!isProductsButton){
            return;
        }
        return changePage(Pages.TeamTaubBackoffice3);
    }

    return (
        <div className='center'>
            <button id='products-button' 
                    className='btn'
                    onClick={() => changeCurrentPageProducts()}>Products</button>
            <button id='orders-button' 
                    className='btn'
                    onClick={() => changeCurrentPageOrders()}>Orders</button>
        </div>
    )
}
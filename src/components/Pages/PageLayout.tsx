import React from 'react';
import '../../App.css';
import { Pages } from '../../Constants';
import { TeamTaubBackoffice1 } from './AdminsPanel/TeamTaubBackoffice1Page/TeamTaubBackoffice1';
import { TeamTaubBackoffice2 } from './AdminsPanel/TeamTaubBackoffice2Page/TeamTaubBackoffice2';
import { TeamTaubBackoffice3 } from './AdminsPanel/TeamTaubBackoffice3Page/TeamTaubBackoffice3';
import { Login } from './AuthPages/LoginPage/Login';
import { ResetPassword } from './AuthPages/ResetPasswordPage/ResetPassword';
import { Signup } from './AuthPages/SignupPage/Signup';
import { Cart } from './UserInterfacePages/CartPage/Cart';
import { Catalog } from './UserInterfacePages/CatalogPage/Catalog';
import { Checkout } from './UserInterfacePages/CheckoutPage/Checkout';
import { Product } from './UserInterfacePages/ProductPage/Product';
import { ThankYou } from './UserInterfacePages/ThankYouPage/ThankYou';

export interface PageLayoutProps {
    page: Pages;
    changePage(newPage: Pages): void;
}
export const PageLayout: React.FC<PageLayoutProps> = ({
    page,
    changePage,
}) => {

    switch(page) {
        case Pages.Login:
            return <Login changePage={changePage} />            
        case Pages.Signup:
            return <Signup changePage={changePage} />
        case Pages.ResetPassword:
            return <ResetPassword changePage={changePage} />

        case Pages.Catalog:
            return <Catalog changePage={changePage} />
        case Pages.Product:
            return <Product changePage={changePage} />            
        case Pages.Cart:
            return <Cart changePage={changePage} />
        case Pages.Checkout:
            return <Checkout changePage={changePage} />
        case Pages.ThankYou:
            return <ThankYou changePage={changePage} />

        case Pages.TeamTaubBackoffice1:
            return <TeamTaubBackoffice1 changePage={changePage} />
        case Pages.TeamTaubBackoffice2:
            return <TeamTaubBackoffice2 changePage={changePage} />
        case Pages.TeamTaubBackoffice3:
            return <TeamTaubBackoffice3 changePage={changePage} />

        default:
            return null;            
    }
}
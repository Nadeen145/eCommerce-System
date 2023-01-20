import React from 'react';
import '../../App.css';
import { Pages } from '../../Constants';
import { ErrorLoading } from '../Common/ErrorLoading';
import { TeamTaubBackoffice1 } from './AdminsPanel/TeamTaubBackoffice1';
import { TeamTaubBackoffice2 } from './AdminsPanel/TeamTaubBackoffice2';
import { TeamTaubBackoffice3 } from './AdminsPanel/TeamTaubBackoffice3';
import { TeamTaubBackoffice4 } from './AdminsPanel/TeamTaubBackoffice4';
import { Login } from './AuthPages/Login';
import { ResetPassword } from './AuthPages/ResetPassword';
import { ResetSuccess } from './AuthPages/ResetSuccess';
import { Signup } from './AuthPages/Signup';
import { Cart } from './UserInterfacePages/Cart';
import { Catalog } from './UserInterfacePages/Catalog';
import { Checkout } from './UserInterfacePages/Checkout';
import { History } from './UserInterfacePages/History';
import { Product } from './UserInterfacePages/Product';
import { ThankYou } from './UserInterfacePages/ThankYou';

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
        case Pages.ResetSuccessfully:
            return <ResetSuccess changePage={changePage} />
    
        case Pages.UserHistory:
            return <History changePage={changePage} />
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
        case Pages.TeamTaubBackoffice3:
            return <TeamTaubBackoffice3 changePage={changePage} />
        case Pages.TeamTaubBackoffice4:
            return <TeamTaubBackoffice4 changePage={changePage} />

        case Pages.ErrorLoading:
            return <ErrorLoading changePage={changePage} />    

        default:
            return null;            
    }
}
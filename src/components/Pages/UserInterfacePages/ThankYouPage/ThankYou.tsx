import React from 'react';
import './../UserInterface.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';

export interface ThankYouProps {
  changePage(newPage: Pages): void,
}

export const ThankYou: React.FC<ThankYouProps> = ({
  changePage,  
}) => {  
    return (
        <div className="root center">
  
          <Header 
            changePage={changePage} 
            title={pages[Pages.ThankYou]}
            isUserInterface={true}  
          />

            <div className='thank-you-text'>
              <span>Thank you for buying</span>
              <br></br>
              <span>TeamTaub!</span>
            </div>

            <br></br>

            <button className='btn back-button' 
                    onClick={() => changePage(Pages.Catalog)}>
              ← Go Back
            </button>
  
        </div>
      );
}
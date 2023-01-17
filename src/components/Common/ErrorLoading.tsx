import React, { useEffect, useState } from 'react';
import './Common.css'
import { Header } from '../AppHeader/Header';
import { pages, Pages } from '../../Constants';


let url_order = `http://localhost:3001/orders/`;

export interface ErrorLoadingProps {
  changePage(newPage: Pages): void,
}

export const ErrorLoading: React.FC<ErrorLoadingProps> = ({
  changePage,  
}) => {  
  return (
    <div className="root center">

      <Header 
        changePage={changePage} 
        title={pages[Pages.ThankYou]}
      />

        <div className='thank-you-text'>
          <br></br>
          <span>An error occured!</span>
          <br></br>
          {/* <span>Sorry!</span> */}
        </div>

        <br></br>

    </div>
  );
}

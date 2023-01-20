import React from 'react';
import './Auth.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';

export interface ResetSuccessProps {
  changePage(newPage: Pages): void,
}

export const ResetSuccess: React.FC<ResetSuccessProps> = ({
  changePage,  
}) => {  

    return (
        <div className="root center">
  
            <div className='thank-you-text'>
              <span>Your password updated successfully!</span>
              <br></br>
              <span>TeamTaub!</span>
            </div>

            <br></br>

            <button className='btn back-button' 
                    onClick={() => changePage(Pages.Login)}>
              Login
            </button>

        </div>
      );
}
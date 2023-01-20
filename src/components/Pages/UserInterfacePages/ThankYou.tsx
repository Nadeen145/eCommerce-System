import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

let url_user = `https://gatewayserver.onrender.com/users/`;

export interface ThankYouProps {
  changePage(newPage: Pages): void,
}

export const ThankYou: React.FC<ThankYouProps> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);

  const logout = async() => {
    setLoading(true);
    try{
        const response1 = await axios.get(
          url_user+"permission/"+ localStorage.getItem("username"), { withCredentials: true }
        );
    
        if(response1.status === 200){
            if(response1.data['permission'] === localStorage.getItem("permission")){
              return;
            }
        }

        const response2 = await axios.post(
          url_user+"logout", {}, { withCredentials: true }
        );
    
        if(response2.status === 200){
            localStorage.clear();
            setLoading(false);
            changePage(Pages.Login);
        }
    }
    catch(error){

    }
    setLoading(false);
  }

  useEffect(() => {
    logout();
  }, []);

    return (
        <div className="root center">
  
          <Header 
            changePage={changePage} 
            title={pages[Pages.ThankYou]}
          />

{
        loading?
        <div className='margin-top-container'>
          <Loading /> 
        </div>
            :
        <div>

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
}
  
        </div>
      );
}
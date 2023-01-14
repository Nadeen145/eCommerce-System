import React, {useEffect, useState} from 'react';
import { Pages } from '../../../Constants';
import './Auth.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Loading } from '../../Common/Loading';

let url_user = `http://localhost:3001/users/`;
// let url_user = `https://gatewayserver.onrender.com/users/`;

export interface LoginProps {
  changePage(newPage: Pages): void,
}

export const Login: React.FC<LoginProps> = ({
  changePage,  
}) => {

  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const [username, setUsername] = useState({value:'', error:true, errorDetail:''});
  const [password, setPassword] = useState({value:'', error:true, errorDetail:''});

  const handleUsernameChange = (event:any) => {
    setUserNotFound(false);
    let data = event.target.value;
    if(data === ''){
      setUsername({
        value: data,
        error: true,
        errorDetail: 'Username cannot be empty!'});
        return;
    }

    setUsername({
      value: data,
      error: false,
      errorDetail: ''});
  };

  const handlePasswordChange = (event:any) => {
    setUserNotFound(false);
    let data = event.target.value;
    if(data === ''){
      setPassword({
        value: data,
        error: true,
        errorDetail: 'Password cannot be empty!'});
        return;
    }

    setPassword({
      value: data,
      error: false,
      errorDetail: ''});
  };

  const login = async() => {
    setLoading(true);
    try{
      const response = await axios.post(
        url_user+'login',
        {
        }, { withCredentials: true }
      );

      if(response.status === 200){
        localStorage.setItem('username', response.data["username"]);
        localStorage.setItem('permission', response.data["permission"]);
      if(localStorage.getItem("permission") == 'U'){
        changePage(Pages.Catalog);
      } else{
        changePage(Pages.TeamTaubBackoffice1);
      }
      setLoading(false);
    }
    } catch{
      setLoading(false);
    }
  }

  const checkUserExist = async (event:any) => {
    event.preventDefault();
    setLoading(true);

    try{
    if(username.error === true || password.error === true){
      if(username.error && username.value === ""){
        setUsername({
          value: username.value,
          error: true,
          errorDetail: 'Username cannot be empty!'});
      }
      if(password.error && password.value === ""){
        setPassword({
          value: password.value,
          error: true,
          errorDetail: 'Password cannot be empty!'});
      }
      setLoading(false);
      return;
    }

    const response = await axios.post(
      url_user+'login',
      {
        username: username.value,
        password: password.value,
      }, { withCredentials: true }
    );

    if(response.status === 200){
      localStorage.setItem('username', response.data["username"]);
      localStorage.setItem('permission', response.data["permission"]);

      if(localStorage.getItem("permission") == 'U'){
        changePage(Pages.Catalog);
      } else{
        changePage(Pages.TeamTaubBackoffice1);
      }
    } else{
      setUserNotFound(true);
    }

    setLoading(false);
  } catch{
    setUserNotFound(true);
    setLoading(false);
  }
  }

  useEffect(() => {
    login();
  }, []);

    return (
      <div>
        {loading? 
          <div className='margin-top-container'>
              <Loading />
          </div>
        :
        <div>
        <div>
          <h3 className="Auth-form-title">Sign In</h3>
        </div>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              { userNotFound?
                <div className='error'>Username or password is wrong!</div>
                :
                <></>
              }
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  required
                  className="form-control mt-1"
                  placeholder="Enter username"
                  onChange={handleUsernameChange}
                  value={username.value}
                />
              </div>
              {username.error && <p className='error'>{username.errorDetail}</p>}

              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  required
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                  value={password.value}
                />
              </div>
              {password.error && <p className='error'>{password.errorDetail}</p>}

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-login" onClick={(event) => checkUserExist(event)}>
                  Submit
                </button>
              </div>
              <p>
                Forgot Password? <a href="#" onClick={()=>changePage(Pages.ResetPassword)}>Reset</a>
              </p>
              <p>
                Not registered yet? <a href="#" onClick={()=>changePage(Pages.Signup)}>Sign Up</a>
              </p>
            </div>
          </form>
        </div>
        </div>
      }
      </div>
    )
}

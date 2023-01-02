import React, {useState} from 'react';
import { Pages } from '../../../../Constants';
import '../Auth.css';

export interface LoginProps {
  changePage(newPage: Pages): void,
}

export const Login: React.FC<LoginProps> = ({
  changePage,  
}) => {

  const [username, setUsername] = useState({value:'', error:true, errorDetail:''});
  const [password, setPassword] = useState({value:'', error:true, errorDetail:''});

  const handleUsernameChange = (event:any) => {
    let data = event.target.value;
    if(data === ''){
      setUsername({
        value: data,
        error: true,
        errorDetail: 'Name cannot be empty!'});
        return;
    }

    setUsername({
      value: data,
      error: false,
      errorDetail: ''});
  };

  const handlePasswordChange = (event:any) => {
    let data = event.target.value;
    if(data === ''){
      setPassword({
        value: data,
        error: true,
        errorDetail: 'Name cannot be empty!'});
        return;
    }

    setPassword({
      value: data,
      error: false,
      errorDetail: ''});
  };

  const checkUserExist = () => {
    if(username.error == true || password.error == true){
        return;
    }

    //TODO: backend
    changePage(Pages.Catalog);
  }

    return (
      <div>
        <div>
          <h3 className="Auth-form-title">Sign In</h3>
        </div>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
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
                <button type="submit" className="btn btn-login" onClick={() => checkUserExist()}>
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
    )
}
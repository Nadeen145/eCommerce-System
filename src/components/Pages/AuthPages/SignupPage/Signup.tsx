import React, {useState} from 'react';
import { Pages } from '../../../../Constants';
import '../Auth.css';

export interface SignupProps {
    changePage(newPage: Pages): void,
  }
  
  export const Signup: React.FC<SignupProps> = ({
    changePage,  
  }) => {

    const [username, setUsername] = useState({value:'', error:true, errorDetail:''});
    const [password, setPassword] = useState({value:'', error:true, errorDetail:''});
    const [confirmPassword, setConfirmPassword] = useState({value:'', error:true, errorDetail:''});

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

        if(data !== confirmPassword.value){
            setConfirmPassword({
                value: confirmPassword.value,
                error: true,
                errorDetail: 'Password and Confirm Password does not match!'
            })
        } else{
            setConfirmPassword({
                value: confirmPassword.value,
                error: false,
                errorDetail: ''
            });
        }

        setPassword({
            value: data,
            error: false,
            errorDetail: ''});
    };
    const handleConfirmPasswordChange = (event: any) => {
        if(password.value !== event.target.value){
            setConfirmPassword({
                value: event.target.value,
                error: true,
                errorDetail: 'Password and Confirm Password does not match!'
            })
        } else{
            setConfirmPassword({
                value: event.target.value,
                error: false,
                errorDetail: ''
            })
        }
    };

    const checkUserValidate = () => {
        if(username.error == true 
            || password.error == true 
            || confirmPassword.error == true){
            return;
        }

        //TODO: backend
        changePage(Pages.TeamTaubBackoffice1);
      }    

    return (
      <div>
        <div>
            <h3 className="Auth-form-title">Sign Up</h3>
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
                    placeholder="e.g TomS"
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
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password.value}
                />
                </div>
                {password.error && <p className='error'>{password.errorDetail}</p>}

                <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    className="form-control mt-1"
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword.value}
                />
                {confirmPassword.error && <p className='error'>{confirmPassword.errorDetail}</p>}
                
                </div>
                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-signup" onClick={()=>checkUserValidate()}>
                    Submit
                </button>
                </div>
                <p>
                Forgot Password? <a href="#" onClick={()=>changePage(Pages.ResetPassword)}>Reset</a>
                </p>
                <p>
                Already registered? <a href="#" onClick={()=>changePage(Pages.Login)}>Sign In</a>
                </p>
            </div>
            </form>
        </div>
      </div>
    )
}
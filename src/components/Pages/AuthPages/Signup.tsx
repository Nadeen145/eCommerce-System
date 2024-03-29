import axios from 'axios';
import React, {useState} from 'react';
import { Pages } from '../../../Constants';
import { Loading } from '../../Common/Loading';
import './Auth.css';

// let url_user = `http://localhost:3001/users/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface SignupProps {
    changePage(newPage: Pages): void,
  }
  
  export const Signup: React.FC<SignupProps> = ({
    changePage,  
  }) => {

    let questions = [
      '▼ What is your favorite pet?',
      '▼ What is your favorite food?',
      '▼ What is your favorite color?',
      '▼ What is the name of your first pet?',
      '▼ What is your favorite drink?',
      '▼ What is your favorite movie?',
      '▼ What is your habbit?'
    ];

    const [loading, setLoading] = useState<boolean>(false);
    const [userExist, setUserExist] = useState<boolean>(false);

    const [username, setUsername] = useState({value:'', error:true, errorDetail:''});
    const [password, setPassword] = useState({value:'', error:true, errorDetail:''});
    const [confirmPassword, setConfirmPassword] = useState({value:'', error:true, errorDetail:''});
    const [secureQuestion, setSecureQuestion] = useState<string>(questions[0]);
    const [answer, setAnswer] = useState({value:'', error:true, errorDetail:''});

    const handleUsernameChange = (event:any) => {
        let data = event.target.value;
        setUserExist(false);

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
        setUserExist(false);
        
        if(data === ''){
          setPassword({
            value: data,
            error: true,
            errorDetail: 'Password cannot be empty!'});
            return;
        }

        if (data.length < 8) {
          setPassword({
            value: data,
            error: true,
            errorDetail: 'Weak password!'});
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
      setUserExist(false);
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

    const handleSecureQuestion = (event:any) => {
      setUserExist(false);
      setSecureQuestion(event.target.value);
    };
    const handleAnswer = (event:any) => {
        let data = event.target.value;
        setUserExist(false);

        if(data === ''){
          setAnswer({
            value: data,
            error: true,
            errorDetail: 'Answer cannot be empty!'});
            return;
        }
    
        setAnswer({
          value: data,
          error: false,
          errorDetail: ''});
    };

    const checkUserValidate = async (event:any) => {
        event.preventDefault();
        setLoading(true);

        try{
        if(username.error === true 
            || password.error === true 
            || confirmPassword.error === true
            || answer.error === true){

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
                  if(confirmPassword.error && confirmPassword.value === ""){
                    setConfirmPassword({
                      value: confirmPassword.value,
                      error: true,
                      errorDetail: 'Confirm password cannot be empty!'});
                  }
                  if(answer.error && answer.value === ""){
                    setAnswer({
                      value: answer.value,
                      error: true,
                      errorDetail: 'Answer cannot be empty!'});
                  }

                setLoading(false);
                return;
        }

        const response = await axios.post(
            url_user+'signup',
            {
              username: username.value,
              password: password.value,
              question: secureQuestion,
              answer: answer.value,
            }, { withCredentials: true }
          );

          localStorage.setItem('username', username.value);
          localStorage.setItem('permission', 'U');


          if(response.status === 200){
            if(localStorage.getItem("permission") == 'U'){
                changePage(Pages.Catalog);
            } else{
                changePage(Pages.TeamTaubBackoffice1);
            }
          }
        } catch{
          setUserExist(true);
          setLoading(false);
        }

        setLoading(false);
    }    

    return (
      <div>
        {loading? 
          <div className='margin-top-container'>
              <Loading />
          </div>
        :
        <div>
        <div>
            <h3 className="Auth-form-title">Sign Up</h3>
        </div>
        <div className="Auth-form-container">
            <form className="Auth-form">
            <div className="Auth-form-content">

            { userExist?
                <div className='error'>Username already exist!</div>
                :
                <></>
              }

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
                </div>
                {confirmPassword.error && <p className='error'>{confirmPassword.errorDetail}</p>}

                <div className="form-group mt-3">
                  <label>Security Question</label>
                  <select className="form-control mt-1" value={secureQuestion} onChange={handleSecureQuestion}>
                    {questions.map((question) => (
                      <option>
                        {question}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mt-3">
                <label>Answer</label>
                <input
                    type="text"
                    required
                    className="form-control mt-1"
                    placeholder="Answer"
                    onChange={handleAnswer}
                    value={answer.value}
                />
                </div>
                {answer.error && <p className='error'>{answer.errorDetail}</p>}


                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-signup" onClick={(event)=>checkUserValidate(event)}>
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
        }
      </div>
    )
}
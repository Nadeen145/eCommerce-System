import axios from 'axios';
import React, {useState} from 'react';
import { Pages } from '../../../Constants';
import { Loading } from '../../Common/Loading';
import './Auth.css';

// let url_user = `http://localhost:3001/users/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface ResetPasswordProps {
    changePage(newPage: Pages): void,
  }
  
  export const ResetPassword: React.FC<ResetPasswordProps> = ({
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
    const [userNotFound, setUserNotFound] = useState<boolean>(false);

    const [username, setUsername] = useState({value:'', error:true, errorDetail:''});
    const [secureQuestion, setSecureQuestion] = useState<string>(questions[0]);
    const [answer, setAnswer] = useState({value:'', error:true, errorDetail:''});
    const [newPassword, setNewPassword] = useState({value:'', error:true, errorDetail:''});
    const [confirmPassword, setConfirmPassword] = useState({value:'', error:true, errorDetail:''});

    const handleUsernameChange = (event:any) => {
        let data = event.target.value;
        setUserNotFound(false);

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
  
    const handleSecureQuestion = (event:any) => {
        setSecureQuestion(event.target.value);
        setUserNotFound(false);
    };
    const handleAnswer = (event:any) => {
        let data = event.target.value;
        setUserNotFound(false);

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

    const handleNewPasswordChange = (event:any) => {
        let data = event.target.value;
        setUserNotFound(false);

        if(data === ''){
          setNewPassword({
            value: data,
            error: true,
            errorDetail: 'New Password cannot be empty!'});
            return;
        }

        if (data.length < 8) {
          setNewPassword({
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

        setNewPassword({
            value: data,
            error: false,
            errorDetail: ''});
    };
    const handleConfirmPasswordChange = (event: any) => {
      setUserNotFound(false);
      if(newPassword.value !== event.target.value){
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

    const changeUserPassword = async(event:any) => {
        event.preventDefault();
        setLoading(true);

        try{
            if(username.error == true || answer.error == true){
                setLoading(false);
                return;
            }

        const response = await axios.put(
            url_user+'updatepassword/'+username.value,
            {
              password: newPassword.value,
              question: secureQuestion,
              answer: answer.value,
            }, { withCredentials: true }
          );

          if(response.status === 200){
            changePage(Pages.ResetSuccessfully);
          } 
        } catch{
          setUserNotFound(true);
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
              <h3 className="Auth-form-title">Reset Password</h3>
          </div>
          <div className="Auth-form-container">
              <form className="Auth-form">
              <div className="Auth-form-content">


              { userNotFound?
                <div className='error'>Somethig went wrong!</div>
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

                    <div className="form-group mt-3">
                    <label>New Password</label>
                    <input
                        type="password"
                        required
                        className="form-control mt-1"
                        placeholder="New Password"
                        onChange={handleNewPasswordChange}
                        value={newPassword.value}
                    />
                    </div>
                    {newPassword.error && <p className='error'>{newPassword.errorDetail}</p>}
  
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

  
                  <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-signup" onClick={(event)=>changeUserPassword(event)}>
                      Submit
                  </button>
                  </div>
                  <p>
                  Remembered your password? <a href="#" onClick={()=>changePage(Pages.Login)}>Sign In</a>
                  </p>
                  <p>
                  Not registered? <a href="#" onClick={()=>changePage(Pages.Signup)}>Sign Up</a>
                  </p>
              </div>
              </form>
          </div>
          </div>
          }
        </div>
      )
}
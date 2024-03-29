import React, { useEffect, useState } from 'react';
import './UserInterface.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

let url_payment = `https://gatewayserver.onrender.com/payment/`;
let url_user = `https://gatewayserver.onrender.com/users/`;
let url_cart = `https://gatewayserver.onrender.com/carts/`;

export interface CheckoutProps {
  changePage(newPage: Pages): void,
}

export const Checkout: React.FC<CheckoutProps> = ({
  changePage,  
}) => {  

  const [loading, setLoading] = useState<boolean>(false);
  const [paymentFailed, setPaymentFailed] = useState({error:false, errorDetail:''});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);

  const [nameAdress, setNameAdress] = useState({value:'', error:true, errorDetail:''});
  const [adress, setAdress] = useState({value:'', error:true, errorDetail:''});

  const [cardNumber, setCardNumber] = useState({value:'', error:true, errorDetail:''});
  const [nameCreditCard, setNameCreditCard] = useState({value:'', error:true, errorDetail:''});
  const [cvv, setCvv] = useState({value:'', error:true, errorDetail:''});
  const [expirationDate, setExpirationDate] = useState({value:'', error:true, errorDetail:''});

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

  const handleNameAdress = (event:any) => {
    let data = event.target.value;
    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    if(data === ''){
      setNameAdress({
        value: data,
        error: true,
        errorDetail: 'Name cannot be empty!'});
        return;
    }

    setNameAdress({
      value: data,
      error: false,
      errorDetail: ''});
  };
  const handleAdress = (event:any) => {
    let data = event.target.value;
    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    if(data === ''){
      setAdress({
        value: data,
        error: true,
        errorDetail: 'Adress cannot be empty!'});
        return;
    }
    setAdress({
      value: data,
      error: false,
      errorDetail: ''}); 
  };

  const handleCardNumber = (event:any) => {
    let data = event.target.value;
    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    if(data === ''){
      setCardNumber({
        value: data,
        error: true,
        errorDetail: 'Card number cannot be empty!'});
      return;
    } 
    
    if (isNaN(data) || data.length !== 16) {
      setCardNumber({
        value: data,
        error: true,
        errorDetail: 'Invalid card number!'});
      return;
    }
    
    setCardNumber({
      value: data,
      error: false,
      errorDetail: ''});
  };
  const handleNameCreditCard = (event:any) => {
    let data = event.target.value;
    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    if(data === ''){
      setNameCreditCard({
        value: data,
        error: true,
        errorDetail: 'Name cannot be empty!'});
      return;
    } 
  
    setNameCreditCard({
      value: data,
      error: false,
      errorDetail: ''});
  };
  const handleCvv = (event:any) => {
    let data = event.target.value;
    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    if(data === ''){
      setCvv({
        value: data,
        error: true,
        errorDetail: 'CVV cannot be empty!'});
      return;
    } 
    
    if (isNaN(data) || data.length !== 3) {
      setCvv({
        value: data,
        error: true,
        errorDetail: 'Invalid CVV!'});
      return;
    }
    
    setCvv({
      value: data,
      error: false,
      errorDetail: ''});
  };
  const handleExpirationDate = (event:any) => {
    let data = event.target.value;
    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    if(data === ''){
      setExpirationDate({
        value: data,
        error: true,
        errorDetail: 'Expiration Date cannot be empty!'});
      return;
    } 
    
    if(data.length !== 5){
      setExpirationDate({
        value: data,
        error: true,
        errorDetail: 'Invalid Date!'});
      return;
    }

    if (validDate(data) === false) {
      return;
    }
    
    setExpirationDate({
      value: data,
      error: false,
      errorDetail: ''});
  };

  const validDate = (date:string) => {
    let arr = date.split('/')
    let month = parseInt(arr[0]);
    let year = parseInt("20"+arr[1]);

    let today = new Date();
    let currMonth = (today.getMonth()) +1;
    let currYear = today.getFullYear();

    if(month>12 || month===0){
      setExpirationDate({
        value: date,
        error: true,
        errorDetail: 'Not valid month! should be between 1 to 12!'});
      return false;
    }
        
    if(year<currYear || (year===currYear && month<currMonth)){
      setExpirationDate({
        value: date,
        error: true,
        errorDetail: 'The visa expired!'});
      return false;
    }

    return true;
  }

  const validInputs = async(event:any) => {
    event.preventDefault();
    setLoading(true);
    await logout();

    try{
      if(nameAdress.error === true
        || adress.error === true
        || cardNumber.error === true
        || nameCreditCard.error === true
        || cvv.error === true
        || expirationDate.error === true){
          if(nameAdress.error && nameAdress.value === ""){
            setNameAdress({
              value: nameAdress.value,
              error: true,
              errorDetail: 'Name cannot be empty!'});
          }
          if(adress.error && adress.value === ""){
            setAdress({
              value: adress.value,
              error: true,
              errorDetail: 'Adress cannot be empty!'});
          }
          if(cardNumber.error && cardNumber.value === ""){
            setCardNumber({
              value: cardNumber.value,
              error: true,
              errorDetail: 'Card number cannot be empty!'});
          }
          if(nameCreditCard.error && nameCreditCard.value === ""){
            setNameCreditCard({
              value: nameCreditCard.value,
              error: true,
              errorDetail: 'The name of the credit card holder cannot be empty!'});
          }
          if(cvv.error && cvv.value === ""){
            setCvv({
              value: cvv.value,
              error: true,
              errorDetail: 'CVV cannot be empty!'});
          }
          if(expirationDate.error && expirationDate.value === ""){
            setExpirationDate({
              value: expirationDate.value,
              error: true,
              errorDetail: 'Expiration date cannot be empty!'});
          }
          setLoading(false);
          return;
      }

      setPaymentFailed(
        {
          error: false,
          errorDetail: ''
        }
      );

      const response = await axios.post(
        url_payment+'pay',
        {
          cc: cardNumber.value,
          holder: nameCreditCard.value,
          cvv: cvv.value,
          exp: expirationDate.value,
          charge: ''+totalPrice,
          username: localStorage.getItem('username'),
          address: adress.value,
          totalPrice: totalPrice
        },
        { withCredentials: true }
      );

      if(response.status === 200){
        setLoading(false);
        changePage(Pages.ThankYou);
      }

    } catch(error:any){
      setPaymentFailed(
        {
          error: true,
          errorDetail: error.response.data.error
        }
      )
      setLoading(false);  
    }

    setLoading(false);
  }

  const fetchData = async() => {
    setLoading(true);
    await logout();

    setPaymentFailed(
      {
        error: false,
        errorDetail: ''
      }
    );

    try{
      const response = await axios.get(
        url_cart+localStorage.getItem('username'),
        { withCredentials: true }
      );

      if(response.status === 200){
        await setProducts(response.data);

        let sum = 0;
        response.data.map((product:any)=>{
          sum += (product['price'])*(product['quantity']);
        })
        setTotalPrice(sum);
      }
    } catch{
      setLoading(false);
      changePage(Pages.ErrorLoading)
    }

    setLoading(false);
  }


  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div className="root">
  
          <Header 
            changePage={changePage} 
            title={pages[Pages.Checkout]}
          />

          <button className='btn back-button' onClick={() => changePage(Pages.Cart)}>
              ← Go Back
          </button>

          
          {
        loading?
        <div className='margin-top-container'>
          <Loading /> 
        </div>
            :
        <div>


          { paymentFailed.error?
            <div className='error center'> {paymentFailed.errorDetail} </div>
              :
            <></>
          }

          <div>
            <div className='split-screen'>

              <div className="side">
                <div className="checkout-form-container">
                  <form>
                    <h3 className="checkout-title">Shipping Adress</h3>
                    <div className="checkout-form-content">

                      <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter name"
                          onChange={handleNameAdress}
                          value={nameAdress.value}
                        />
                      </div>
                      {nameAdress.error && <p className='error'>{nameAdress.errorDetail}</p>}

                      <div className="form-group mt-3">
                        <label>Adress</label>
                        <input
                          type="Adress"
                          required
                          className="form-control mt-1"
                          placeholder="Enter adress"
                          onChange={handleAdress}
                          value={adress.value}
                        />
                      </div>
                      {adress.error && <p className='error'>{adress.errorDetail}</p>}

                    </div>
                  </form>
                </div>

                <form className="checkout-form-container">
                  <h3 className="checkout-title">Credit Card</h3>
                  <div className="checkout-form-content">  
                    <div className="form-group mt-3">
                          <label>Card Number</label>
                          <input type="text" 
                                  className="form-control mt-1"
                                  placeholder="16 digits"
                                  maxLength={16}
                                  minLength={16}
                                  onChange={handleCardNumber}
                                  value={cardNumber.value}
                                  required />
                    </div>
                    {cardNumber.error && <p className='error'>{cardNumber.errorDetail}</p>}

                    <div className="form-group mt-3">
                          <label >Name</label>
                          <input type="text"
                                  className="form-control mt-1"
                                  placeholder="Enter name"
                                  pattern="[' ']*[A-Za-z]+[A-Za-z' ']*" 
                                  onChange={handleNameCreditCard}
                                  value={nameCreditCard.value}
                                  required />
                    </div>
                    {nameCreditCard.error && <p className='error'>{nameCreditCard.errorDetail}</p>}

                    <div className="input-right-margin form-group mt-3">
                          <label>CVV</label>
                          <input type="text" 
                              className="form-control mt-1"
                              pattern="[0-9]+" 
                              maxLength={3}
                              minLength={3}
                              placeholder="3 digits"
                              onChange={handleCvv}
                              value={cvv.value}
                              required />
                    </div>
                    {cvv.error && <p className='error'>{cvv.errorDetail}</p>}

                    <div className="form-group mt-3">
                          <label>Expiration Date</label>
                          <input type="text" 
                              className="form-control mt-1"
                              pattern="[0-9][0-9]/[0-9][0-9]" 
                              maxLength={5}
                              minLength={5}
                              placeholder="MM/YY"
                              onChange={handleExpirationDate}
                              value={expirationDate.value}
                              required />
                    </div>
                    {expirationDate.error && <p className='error'>{expirationDate.errorDetail}</p>}

                  </div>
                </form>

              </div>

              <div className="side checkout-form-container checkout-form">
                <form>
                  <h3 className="checkout-title">Summery</h3>
                  <div className="checkout-form-content">

                    <div className="form-group mt-3">
                      {products &&
                        products.map((product) => (
                          <div className="checkout-text" key={product['id']}>
                              <span>{product['name']}</span>
                              <span> X </span>
                              <span>{product['quantity']}</span>
                              <span> = </span>
                              <span className='pink'>{(product['quantity']) * (product['price'])}</span>
                          </div>
                        ))}
                    </div>
                    
                    <div>
                      <h4 className='center'>Total price</h4>
                      <h4 className='pink center'>{totalPrice}</h4>
                    </div>

                    <div className="d-grid gap-2 mt-3">
                      <button className="btn pay-button" onClick={(event)=>validInputs(event)}>
                        Pay
                      </button>
                    </div>

                  </div>
                </form>

              </div>

            </div>

          </div>

          </div>
      }


        </div>
    );
}
import React, { useEffect, useState } from 'react';
import './AdminsPanel.css';
import { Header } from '../../AppHeader/Header';
import { pages, Pages } from '../../../Constants';
import { BackofficeNavbar } from './BackofficeNavebar';
import axios from 'axios';
import { Loading } from '../../Common/Loading';

// let url_product = `http://localhost:3001/products/`;
let url_product = `https://gatewayserver.onrender.com/products/`;
let url_user = `https://gatewayserver.onrender.com/users/`;

export interface TeamTaubBackoffice2Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice2: React.FC<TeamTaubBackoffice2Props> = ({
  changePage,  
}) => {  

    let categories = ['t-shirt', 'hoodie', 'hat', 
                      'necklace', 'bracelet', 'shoes',
                      'pillow', 'mug', 'book',
                      'puzzle', 'cards'];

    const [loading, setLoading] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>('Add Product!');

    const [name, setName] = useState({value:'', error:true, errorDetail:''});
    const [category, setCategory] = useState({value:'', error:true, errorDetail:''});
    const [description, setDescription] = useState({value:'', error:true, errorDetail:''});
    const [price, setPrice] = useState({value:'', error:true, errorDetail:''});
    const [stock, setStock] = useState({value:'', error:true, errorDetail:''});
    const [imgUrl, setImgUrl] = useState({value:'', error:false, errorDetail:''});
  
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

    const handleName = (event:any) => {
      let data = event.target.value;
      if(data === ''){
        setName({
          value: data,
          error: true,
          errorDetail: 'Name cannot be empty!'});
          return;
      }
  
      setName({
        value: data,
        error: false,
        errorDetail: ''});
    };

    const handleCategory = (event:any) => {
        let data = event.target.value;
        if(data === ''){
          setCategory({
            value: data,
            error: true,
            errorDetail: 'Category cannot be empty!'});
            return;
        }

        let flag = false; 
        categories.map((temp) => {
          if(temp === data){
            flag = true;
          }
        })

        if(flag === false){
          setCategory({
            value: data,
            error: true,
            errorDetail: 'Invalid Category!'});
            return;
        }
    
        setCategory({
          value: data,
          error: false,
          errorDetail: ''});
    };

    const handleDescription = (event:any) => {
        let data = event.target.value;
        if(data === ''){
          setDescription({
            value: data,
            error: true,
            errorDetail: 'Description cannot be empty!'});
            return;
        }
    
        setDescription({
          value: data,
          error: false,
          errorDetail: ''});
    };

    const handlePrice = (event:any) => {
        let data = event.target.value;
        if(data === ''){
          setPrice({
            value: data,
            error: true,
            errorDetail: 'Price cannot be empty!'});
          return;
        } 

        if (isNaN(data)) {
            setPrice({
              value: data,
              error: true,
              errorDetail: 'Invalid Price!'});
            return;
        }

        if (parseInt(data) <= 0) {
            setPrice({
              value: data,
              error: true,
              errorDetail: 'Price cannot be smaller or qual to zero!'});
            return;
        }
          
        setPrice({
            value: data,
            error: false,
            errorDetail: ''});
    };

    const handleStock = (event:any) => {
        let data = event.target.value;
        if(data === ''){
          setStock({
            value: data,
            error: true,
            errorDetail: 'Stock cannot be empty!'});
          return;
        } 

        if (isNaN(data)) {
            setStock({
              value: data,
              error: true,
              errorDetail: 'Invalid Stock!'});
            return;
        }

        if (parseInt(data) < 0) {
            setStock({
              value: data,
              error: true,
              errorDetail: 'Stock cannot be smaller than zero!'});
            return;
        }
          
        setStock({
            value: data,
            error: false,
            errorDetail: ''});
    };

    const handleImgUrl = (event:any) => {
        let data = event.target.value;
        if(data === ''){
          setImgUrl({
            value: data,
            error: false,
            errorDetail: 'Image URL cannot be empty!'});
            return;
        }
    
        setImgUrl({
          value: data,
          error: false,
          errorDetail: ''});
      };

    const validInputs = () => {
        if(name.error === true
          || category.error === true
          || description.error === true
          || price.error === true
          || stock.error === true
          || imgUrl.error === true){

            if(name.error && name.value === ""){
              setName({
                value: name.value,
                error: true,
                errorDetail: 'Name cannot be empty!'});
            }
            if(category.error && category.value === ""){
              setCategory({
                value: category.value,
                error: true,
                errorDetail: 'Category cannot be empty!'});
            }
            if(description.error && description.value === ""){
              setDescription({
                value: description.value,
                error: true,
                errorDetail: 'Description cannot be empty!'});
            }
            if(price.error && price.value === ""){
              setPrice({
                value: price.value,
                error: true,
                errorDetail: 'Price cannot be empty!'});
            }
            if(stock.error && stock.value === ""){
              setStock({
                value: stock.value,
                error: true,
                errorDetail: 'Stock cannot be empty!'});
            }
            
            return;
        }

        if(localStorage.getItem('product') === ''){
          addProduct();
        } else{
          updateProduct();
        }

      }

      const addProduct = async() => {
        setLoading(true);
        await logout();

        try{
          const response = await axios.post(
            url_product,
            {
              name: name.value,
              category: category.value,
              description: description.value,
              price: parseInt(price.value),
              stock: parseInt(stock.value),
              image: imgUrl.value
            },
            { withCredentials: true }
          );

          localStorage.setItem("product", "");
          if(response.status === 200){
            setLoading(false);
          }
        } catch{
          setLoading(false);
        }
        setLoading(false);
        changePage(Pages.TeamTaubBackoffice1);
      }

      const updateProduct = async() => {
        let id = localStorage.getItem('product');
        
        try{
          const response = await axios.put(
            url_product+id,
            {
              name: name.value,
              category: category.value,
              description: description.value,
              price: parseInt(price.value),
              stock: parseInt(stock.value),
              image: imgUrl.value
            },
            { withCredentials: true }
          );

          localStorage.setItem("product", "");

          if(response.status === 200){
          }
        } catch{
        }
        setLoading(false);
        changePage(Pages.TeamTaubBackoffice1);
      }

      const fetchData = async() => {
        setLoading(true);
        await logout();

        if(localStorage.getItem('product') === ''){
          setLoading(false);
          return;
        }
        setButtonText('Update Product!')

        try{
          const response = await axios.get(
            url_product+localStorage.getItem('product'),
            { withCredentials: true }
          );
  
          if(response.status === 200){
            let data = response.data;
            setName({value: data['name'], error:false, errorDetail:''})
            setCategory({value: data['category'], error:false, errorDetail:''})
            setDescription({value: data['description'], error:false, errorDetail:''})
            setPrice({value: data['price'], error:false, errorDetail:''})
            setStock({value: data['stock'], error:false, errorDetail:''})
            setImgUrl({value: data['image']? data['image']:'', error:false, errorDetail:''})
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
                title={pages[Pages.TeamTaubBackoffice1]}
            />
  
            <BackofficeNavbar changePage={changePage} page={0} />

            <div className='update-new-text center'>
                <span>New Product | Update Product</span>
            </div>

            {
        loading?
        <div className='margin-top-container'>
          <Loading /> 
        </div>
            :
        <div>

            <div>
                <form>
                    <div className="update-new-form-content regular-text">

                      <div className='row-input'>
                        <span className='align-regular-text'>Name: </span>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter name"
                          onChange={handleName}
                          value={name.value}
                        />
                      </div>
                      {name.error && <p className='error error-backoffice'>{name.errorDetail}</p>}

                      <div className='row-input'>
                        <span className='align-regular-text'>Category: </span>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter category"
                          onChange={handleCategory}
                          value={category.value}
                        />
                      </div>
                      {category.error && <p className='error error-backoffice'>{category.errorDetail}</p>}

                      <div className='row-input'>
                        <span className='align-regular-text'>Description: </span>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter description"
                          onChange={handleDescription}
                          value={description.value}
                        />
                      </div>
                      {description.error && <p className='error error-backoffice'>{description.errorDetail}</p>}

                      <div className='row-input'>
                        <span className='align-regular-text'>Price: </span>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter price"
                          onChange={handlePrice}
                          value={price.value}
                        />
                      </div>
                      {price.error && <p className='error error-backoffice'>{price.errorDetail}</p>}

                      <div className='row-input'>
                        <span className='align-regular-text'>Stock: </span>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter stock"
                          onChange={handleStock}
                          value={stock.value}
                        />
                      </div>
                      {stock.error && <p className='error error-backoffice'>{stock.errorDetail}</p>}

                      <div className='row-input'>
                        <span className='align-regular-text'>Image URL: </span>
                        <input
                          type="text"
                          required
                          className="form-control mt-1"
                          placeholder="Enter image URL"
                          onChange={handleImgUrl}
                          value={imgUrl.value}
                        />
                      </div>
                      {imgUrl.error && <p className='error error-backoffice'>{imgUrl.errorDetail}</p>}

                    </div>

                    <div className='center'>
                        <button type='button' className="btn add-button" onClick={()=>validInputs()}>
                            {buttonText}
                        </button>
                    </div>
                    
                </form>
            </div>

              </div>
          }

        </div>
      );
}
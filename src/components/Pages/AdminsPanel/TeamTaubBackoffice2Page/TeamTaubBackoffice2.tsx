import React, { useState } from 'react';
import './../AdminsPanel.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';
import { BackofficeNavbar } from '../BackofficeNavebar';

export interface TeamTaubBackoffice2Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice2: React.FC<TeamTaubBackoffice2Props> = ({
  changePage,  
}) => {  


    const [name, setName] = useState({value:'', error:true, errorDetail:''});
    const [category, setCategory] = useState({value:'', error:true, errorDetail:''});
    const [description, setDescription] = useState({value:'', error:true, errorDetail:''});
    const [price, setPrice] = useState({value:'', error:true, errorDetail:''});
    const [stock, setStock] = useState({value:'', error:true, errorDetail:''});
    const [imgUrl, setImgUrl] = useState({value:'', error:true, errorDetail:''});
  
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

        if (parseInt(data) <= 0) {
            setStock({
              value: data,
              error: true,
              errorDetail: 'Stock cannot be smaller or qual to zero!'});
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
            error: true,
            errorDetail: 'Image URL cannot be empty!'});
            return;
        }
    
        setImgUrl({
          value: data,
          error: false,
          errorDetail: ''});
      };

    const validInputs = () => {
        if(name.error == true
          || category.error == true
          || description.error == true
          || price.error == true
          || stock.error == true
          || imgUrl.error == true){
            return;
        }
        return changePage(Pages.TeamTaubBackoffice1);
      }

    return (
        <div className="root">
            <Header 
                changePage={changePage} 
                title={pages[Pages.TeamTaubBackoffice1]}
                isUserInterface={false}  
            />
  
            <BackofficeNavbar changePage={changePage} isProductsButton={true} />

            <div className='update-new-text center'>
                <span>New Product | Update Product</span>
            </div>


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
                      {name.error && <p className='error-backoffice'>{name.errorDetail}</p>}

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
                      {category.error && <p className='error-backoffice'>{category.errorDetail}</p>}

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
                      {description.error && <p className='error-backoffice'>{description.errorDetail}</p>}

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
                      {price.error && <p className='error-backoffice'>{price.errorDetail}</p>}

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
                      {stock.error && <p className='error-backoffice'>{stock.errorDetail}</p>}

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
                      {imgUrl.error && <p className='error-backoffice'>{imgUrl.errorDetail}</p>}

                    </div>

                    <div className='center'>
                        <button className="btn add-button" onClick={()=>validInputs()}>
                            Add Product
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
      );
}
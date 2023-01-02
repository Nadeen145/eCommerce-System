import React from 'react';
import './../AdminsPanel.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';
import { BackofficeNavbar } from '../BackofficeNavebar';

export interface TeamTaubBackoffice3Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice3: React.FC<TeamTaubBackoffice3Props> = ({
  changePage,  
}) => {  

    let data = [
      {
        _id: 1,
        isDelivered: false,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      },
      {
        _id: 1,
        name: "dd",
        isDelivered: true,
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      },
      {
        _id: 1,
        name: "dd",
        isDelivered: false,
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      },
      {
        _id: 1,
        name: "dd",
        isDelivered: false,
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      },
      {
        _id: 1,
        name: "dd",
        isDelivered: false,
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      },
      {
        _id: 1,
        name: "dd",
        isDelivered: true,
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      },
      {
        _id: 1,
        name: "dd",
        isDelivered: true,
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      }
    ]

    return (
        <div className="root">
          <Header 
            changePage={changePage} 
            title={pages[Pages.TeamTaubBackoffice1]}
            isUserInterface={false}  
          />
  
          <BackofficeNavbar changePage={changePage} isProductsButton={false} />
  
          <div className='order-page-option-bar-text center'>
                <span>Orders Page Option Bar</span>
          </div>

          <div className='products-list-container'>
            {data &&
              data?.map((product) => (
                <div key={product._id} className="list-item-product split-screen">

                    <div className='text-container side3'>
                        <span>ID: {product._id}</span>
                        <br></br>
                        <span>Name: {product.name}</span>
                        <br></br>

                        <span>Category: {product.category}</span>
                        <br></br>
                        <span>Price: {product.price}₪</span>
                        <br></br>

                        <span>Amount: {product.price}</span>
                    </div>

                    <div className='side1'>
                        <div>Status: </div>
                        {
                            product.isDelivered?
                            <div className='center like-button'>
                                Shipping
                            </div>
                            :
                            <div className='center like-button'>
                                Waiting for delivery
                            </div>
                        }   
                        <br></br>
                        {
                            product.isDelivered?
                            <></>
                            :
                            <button className='btn status-update-button'>
                                Mark as Delivered!
                            </button>
                        }
                    </div>

                </div>
              ))}
          </div>
  
        </div>
      );
}
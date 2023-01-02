import React from 'react';
import './../AdminsPanel.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';
import { BackofficeNavbar } from '../BackofficeNavebar';

export interface TeamTaubBackoffice1Props {
  changePage(newPage: Pages): void,
}

export const TeamTaubBackoffice1: React.FC<TeamTaubBackoffice1Props> = ({
  changePage,  
}) => {  

    let data = [
      {
        _id: 1,
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
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "dfslkfjlj",
        price: 100,
        category: "hat"
      }
    ]

    const updateProduct = () => {
        changePage(Pages.TeamTaubBackoffice2);
    }
    const removeProduct = () => {
        
    }

    return (
      <div className="root">
        <Header 
          changePage={changePage} 
          title={pages[Pages.TeamTaubBackoffice1]}
          isUserInterface={false}  
        />

        <BackofficeNavbar changePage={changePage} isProductsButton={true} />

        <button className='btn new-button' onClick={() => updateProduct()}>
            + New Product
        </button>

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
                        <button className='btn update-button' onClick={() => updateProduct()}>
                            Update
                        </button>
                        <br></br>
                        <button className='btn remove-button' onClick={() => removeProduct()}>
                            Remove
                        </button>
                    </div>

                </div>
              ))}
        </div>

      </div>
    );
}
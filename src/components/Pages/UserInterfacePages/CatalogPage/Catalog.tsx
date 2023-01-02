import React from 'react';
import './../UserInterface.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';

export interface CatalogProps {
  changePage(newPage: Pages): void,
}

export const Catalog: React.FC<CatalogProps> = ({
  changePage,  
}) => {  

    let categories = [
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
      {
        _id: 1,
        name: "hat",
      },
    ]

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

    return (
      <div className="root">
        <Header 
          changePage={changePage} 
          title={pages[Pages.Catalog]}
          isUserInterface={true}  
        />

        <div className="categories">
          {categories &&
            categories?.map((category) => (
              <div key={category._id} className="category-item">
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>

        <div className='products-container'>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image?.url} alt={product.name} />
                    <div className="details price">Price: {product.price}₪</div>
                    <div className="details category">Category: {product.category}</div>
                  <button onClick={() => changePage(Pages.Product)}>
                    See Details
                  </button>
                </div>
              ))}
          </div>
        </div>

      </div>
    );
}
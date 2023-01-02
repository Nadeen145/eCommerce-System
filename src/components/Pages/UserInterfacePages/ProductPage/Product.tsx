import React, { useState } from 'react';
import './../UserInterface.css';
import { Header } from '../../../AppHeader/Header';
import { PageLayout } from './../../../Pages/PageLayout';
import { pages, Pages } from '../../../../Constants';

export interface ProductProps {
  changePage(newPage: Pages): void,
}

export const Product: React.FC<ProductProps> = ({
  changePage,  
}) => {  

    const [quantity, setQuantity] = useState(0);

    const increase = () => {
        setQuantity(quantity => quantity + 1);
    };
    const decrease = () => {
        if(quantity <= 0){
            return;
        }
        setQuantity(quantity => quantity - 1);
    };
 

    //TODO: product
    let product = {
        _id: 1,
        name: "dd",
        image: {
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        desc: "Lionel Andrés Messi[note 1] (Spanish pronunciation: [ljoˈnel anˈdɾes ˈmesi] (listen); born 24 June 1987), also known as Leo Messi, is an Argentine professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team. Widely regarded as one of the greatest players of all time, Messi has won a record seven Ballon d'Or awards,[note 2] a record six European Golden Shoes, and in 2020 was named to the Ballon d'Or Dream Team. Until leaving the club in 2021, he had spent his entire professional career with Barcelona, where he won a club-record 35 trophies, including 10 La Liga titles, seven Copa del Rey titles and four UEFA Champions Leagues. With his country, he won the 2021 Copa América and the 2022 FIFA World Cup. A prolific goalscorer and creative playmaker, Messi holds the records for most goals in La Liga (474), most hat-tricks in La Liga (36) and the UEFA Champions League (8), and most assists in La Liga (192) and the Copa América (17). He has also the most international goals by a South American male (98). Messi has scored over 790 senior career goals for club and country, and has the most goals by a player for a single club (672).",
        price: 100,
        category: "hat"
      };

    return (
      <div className="root">

        <Header 
          changePage={changePage} 
          title={pages[Pages.Product]}
          isUserInterface={true}  
        />

        <button className='btn back-button' onClick={() => changePage(Pages.Catalog)}>
            ← Go Back
        </button>

        <div className='product-detail-container'>
             
            <img className='product-image-container' src={product.image?.url} alt={product.name} />

            <div className='product-detail'>
                <div className="product-text">{product.name}</div>
                <div className="product-text">Price: {product.price}₪</div>
                <div className="product-text">Category: {product.category}</div>
                <div className="product-text" >
                    Quantity: {quantity}
                        <button className="btn product-button-quantity" onClick={increase}>+</button>
                        <button className="btn product-button-quantity" onClick={decrease}>-</button>
                </div>
                <button 
                    className="product-button btn"
                    onClick={() => changePage(Pages.Cart)}>
                Add to cart
                </button>
            </div>
        </div>

        <div className='product-description-container'>
            Product description
        </div>

        <div className='product-text product-text-container'>
            {product.desc}
        </div>

      </div>
    );
}
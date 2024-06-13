import React, {useContext} from 'react'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'
import { useState } from 'react'

const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart} = useContext(ShopContext);
    const [btnColour, setBtnColour] = useState("black");
    const colourChange = ()=>{
        setBtnColour("red");
        setTimeout(() => {
            setBtnColour("black");
          }, 100);
    }
    const handleClick = ()=>{
        addToCart(product.id);
        colourChange();
    }
    console.log(props);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-main-img">
                <img src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-price-old">${product.old_price}</div>
                <div className="productdisplay-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-size">
                <h1>Select size</h1>
                <div className='sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div> 
            <button style={{backgroundColor:btnColour}} onClick={handleClick}>ADD TO CART</button> 
        </div>
    </div>
  )
}

export default ProductDisplay
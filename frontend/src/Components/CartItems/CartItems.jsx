import React, {useContext} from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import './CartItems.css'
const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems, removeFromCart} = useContext(ShopContext);

  return (
    <div className='cartitems'>
        <div className="cartitems-main-format removable">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                            <div className="cartitems-main-format cartitems-format">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <h1>Cart Total : ${getTotalCartAmount()}</h1>
            <button>Proceed to Checkout</button>
        </div>
    </div>
  )
}

export default CartItems
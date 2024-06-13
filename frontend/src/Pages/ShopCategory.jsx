import React, {useContext} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
       <img className='banner' src={props.banner} alt="" />
       <div className="sort">
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
        </div>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
       </div>
       <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if(item.category===props.category){
            return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
          }
          else return null;
        })}
       </div>
       <div className="shopcategory-loadmore">
        Explore More
       </div>
    </div>
  )
}

export default ShopCategory
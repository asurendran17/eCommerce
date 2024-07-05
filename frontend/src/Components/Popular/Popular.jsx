import React, { useEffect , useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
const Popular = () => {
  const [data_product,setData_Product]=useState([]);
  useEffect(()=>{
    fetch("https://ecommerce-backend-y3g3.onrender.com/popularinwomen")
    .then((response)=>response.json())
    .then((data)=>setData_Product(data));
  },[])
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
            })}
        </div>
    </div>
  )
}

export default Popular

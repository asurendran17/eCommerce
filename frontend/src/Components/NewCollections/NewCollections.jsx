import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {
  const [new_collection,setNew_Collection]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/newcollections")
    .then((response)=>response.json())
    .then((data)=>setNew_Collection(data));
  },[])

  return (

    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections
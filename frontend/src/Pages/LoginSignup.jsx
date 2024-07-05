import React, { useState } from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {
  const [state,setState]=useState("Sign Up");
  const [formData, setFormData]=useState({
    username:"",
    password:"",
    email:"",
  })

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  const handleClick = ()=>{
    if(state==="Sign Up") setState("Login");
    else setState("Sign Up");
  }

  const login = async ()=>{
    //console.log(formData);
    let responseData;
    await fetch('https://ecommerce-backend-y3g3.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async ()=>{
    console.log(formData);
    let responseData;
    await fetch('https://ecommerce-backend-y3g3.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className="loginsignup">
      <h1>{state}</h1>
      {state==="Sign Up"?<input onChange={handleChange} value={formData.username} name='username' type="text" className="name" placeholder='Name'/>:null}
      <input onChange={handleChange} value={formData.email} name='email' type="email" className="email" placeholder='Email'/>
      <input onChange={handleChange} value={formData.password} name='password' type="password" className="password" placeholder='Password'/>
      <button onClick={()=>{state==="Sign Up"?signup():login()}} >Continue</button>
      {state==="Sign Up"?<p>Already have an account? <span onClick={handleClick} >Login here</span></p>:null}
      {state==="Login"?<p><span onClick={handleClick} >Create an account</span></p>:null}
    </div>
  )
}

export default LoginSignup

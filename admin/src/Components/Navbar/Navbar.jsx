import React from 'react'
import './Navbar.css'
import shopbag from '../../assets/shopbag.jpg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={shopbag}/>
            <p className='nav-title'>bazaar <span>Admin Panel</span></p>
        </div>
        <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar
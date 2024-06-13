import React from 'react'
import shopbag from '../Assets/shopbag.jpg'
import insta_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
        <hr />
        <div className='footer-logo'>
            <img src={shopbag} alt="" />
            <h1>bazaar</h1>
        </div>
        <div className="links">
            <ul>
                <li>Company</li>
                <li>Products</li>
                <li>About</li>
                <li>Contacts</li>
            </ul>
        </div>
        <div className="footer-social-icon">
            <img src={insta_icon} alt="" />
            <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright 2024</p>
        </div>

    </div>
  )
}

export default Footer
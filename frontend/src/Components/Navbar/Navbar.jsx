import React, {useContext, useRef} from 'react'
import "./Navbar.css"
import logo from "../Assets/logo.png"
import shopbag from '../Assets/shopbag.jpg'
import cart_icon from "../Assets/cart_icon.png"
import { Link } from 'react-router-dom';
import nav_dropdown from '../Assets/dropdown_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {
    const {getTotalCartItems}=useContext(ShopContext);
    const menuRef= useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={shopbag}/>
            <p className='nav-title'>bazaar</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li><Link to='/' style={{textDecoration:'none'}}>All</Link></li>
            <li><Link to='/men' style={{textDecoration:'none'}}>Men</Link></li>
            <li><Link to='/women' style={{textDecoration:'none'}}>Women</Link></li>
            <li><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link></li>
        </ul>
        <div className='login-cart'>
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} >Logout</button>
            :<Link to='/login' style={{textDecoration:'none'}}><button>Login</button></Link>}
            <Link to='/cart' style={{textDecoration:'none'}}><img src={cart_icon}/></Link>
            <div className="count">
                <p>{getTotalCartItems()}</p>
            </div>
        </div>
    </div>
  )
}

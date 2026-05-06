import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'


function Nav() {
  return (
    <nav className='demo'>
      <div className='nav-logo'>
        <img src='/ChatGPT Image Apr 30, 2026, 11_11_36 AM (1).png' alt='FACINOVA Logo' />
        <span>FACINOVA</span>
      </div>

      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/Register'>Register</Link>
        <Link to='/Login'>Login</Link>
      </div>
    </nav>
  )
}

export default Nav

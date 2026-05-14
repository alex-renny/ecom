import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`premium-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-wrapper">
            <img 
              src="/ChatGPT Image Apr 30, 2026, 11_11_36 AM (1).png" 
              alt="FACINOVA Logo" 
              className="logo-image"
            />
            <div className="logo-glow"></div>
          </div>
          <span className="logo-text">
            FACINOVA
          </span>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">
            <span className="link-text">Home</span>
            <span className="link-hover"></span>
          </Link>

          {/* SECTION ON SAME PAGE */}

          <a href="#shop" className="nav-link">
            <span className="link-text">Categories</span>
            <span className="link-hover"></span>
          </a>
          <a href="#foot" className="nav-link">
            <span className="link-text">Contact</span>
            <span className="link-hover"></span>
          </a>
          
          <Link to="/Register" className="nav-link">
            <span className="link-text">Register</span>
            <span className="link-hover"></span>
          </Link>
          <Link to="/Login" className="nav-link login-btn">
            <span className="link-text">Login</span>
            <span className="btn-glow"></span>
          </Link>
        </div>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      
      <div className="nav-border-glow"></div>
    </nav>
  )
}

export default Nav
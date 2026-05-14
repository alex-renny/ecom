import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './UserNav.css'

function UserNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

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

    const handleLogout = () => {
        localStorage.removeItem('Role')
        localStorage.removeItem('loggeduser')
        navigate('/Login')
        window.location.reload()
    }

    const handleNavClick = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    return (
        <>
            {/* Overlay for mobile menu */}
            <div 
                className={`user-nav-overlay ${isOpen ? 'active' : ''}`} 
                onClick={() => setIsOpen(false)}
            ></div>

            <nav className={`user-nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="user-nav-container">
                    {/* User Brand/Logo */}
                    <div className="user-brand" onClick={() => handleNavClick('/UserIndex')}>
                        <div className="user-logo-wrapper">
                            <img 
                                src="/ChatGPT Image Apr 30, 2026, 11_11_36 AM (1).png" 
                                alt="FACINOVA Logo" 
                                className="user-logo-image"
                            />
                            <div className="user-logo-glow"></div>
                        </div>
                        <span className="user-brand-text">
                            FACINOVA
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className={`user-nav-links ${isOpen ? 'active' : ''}`}>
                        <button 
                            className={`user-nav-link ${location.pathname === '/UserIndex' ? 'active-link' : ''}`}
                            onClick={() => handleNavClick('/UserIndex')}
                        >
                            <svg className="user-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Home</span>
                            <span className="user-link-underline"></span>
                        </button>

                        <button 
                            className={`user-nav-link ${location.pathname === '/UserProduct' ? 'active-link' : ''}`}
                            onClick={() => handleNavClick('/UserProduct')}
                        >
                            <svg className="user-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>Products</span>
                            <span className="user-link-underline"></span>
                        </button>

                        <button 
                            className={`user-nav-link ${location.pathname === '/Cart' ? 'active-link' : ''}`}
                            onClick={() => handleNavClick('/Cart')}
                        >
                            <svg className="user-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            <span>Cart</span>
                            <span className="user-link-underline"></span>
                        </button>

                        <button 
                            className={`user-nav-link ${location.pathname === '/MyOrder' ? 'active-link' : ''}`}
                            onClick={() => handleNavClick('/MyOrder')}
                        >
                            <svg className="user-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            <span>My Orders</span>
                            <span className="user-link-underline"></span>
                        </button>

                        {/* Logout Button */}
                        <button className="user-logout-btn" onClick={handleLogout}>
                            <svg className="user-logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                            <span className="user-logout-glow"></span>
                        </button>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button 
                        className={`user-hamburger ${isOpen ? 'active' : ''}`} 
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className="user-hamburger-line"></span>
                        <span className="user-hamburger-line"></span>
                        <span className="user-hamburger-line"></span>
                    </button>
                </div>
                
                {/* Bottom Glow Border */}
                <div className="user-nav-border-glow"></div>
            </nav>
        </>
    )
}

export default UserNav
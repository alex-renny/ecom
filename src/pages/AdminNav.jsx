import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminNav.css'

function AdminNav() {
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
        navigate('/Login')
        window.location.reload()
    }

    const handleNavClick = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    return (
        <nav className={`admin-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="admin-nav-container">
                {/* Admin Logo/Brand */}
                <div className="admin-brand">
                    <div className="admin-logo-wrapper">
                        <svg className="admin-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="admin-logo-glow"></div>
                    </div>
                    <span className="admin-brand-text">
                        FACINOVA
                    </span>
                </div>

                {/* Navigation Links */}
                <div className={`admin-nav-links ${isOpen ? 'active' : ''}`}>
                    <button 
                        className={`admin-nav-link ${location.pathname === '/Admin' ? 'active-link' : ''}`}
                        onClick={() => handleNavClick('/Admin')}
                    >
                        <svg className="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Dashboard</span>
                        <span className="link-underline"></span>
                    </button>

                    <button 
                        className={`admin-nav-link ${location.pathname === '/UserTable' ? 'active-link' : ''}`}
                        onClick={() => handleNavClick('/UserTable')}
                    >
                        <svg className="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Users</span>
                        <span className="link-underline"></span>
                    </button>

                    <button 
                        className={`admin-nav-link ${location.pathname === '/AdminProduct' ? 'active-link' : ''}`}
                        onClick={() => handleNavClick('/AdminProduct')}
                    >
                        <svg className="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Products</span>
                        <span className="link-underline"></span>
                    </button>

                    <button 
                        className={`admin-nav-link ${location.pathname === '/P-List' ? 'active-link' : ''}`}
                        onClick={() => handleNavClick('/P-List')}
                    >
                        <svg className="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span>P-List</span>
                        <span className="link-underline"></span>
                    </button>

                    <button 
                        className={`admin-nav-link ${location.pathname === '/AdminOrder' ? 'active-link' : ''}`}
                        onClick={() => handleNavClick('/AdminOrder')}
                    >
                        <svg className="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>Orders</span>
                        <span className="link-underline"></span>
                    </button>

                    {/* Logout Button */}
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                        <span className="logout-glow"></span>
                    </button>
                </div>

                {/* Hamburger Menu */}
                <button 
                    className={`admin-hamburger ${isOpen ? 'active' : ''}`} 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>
            
            {/* Bottom Glow Border */}
            <div className="admin-nav-border-glow"></div>
        </nav>
    )
}

export default AdminNav
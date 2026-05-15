import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({ Email: '', Password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

    const handledata = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const Handlelogin = () => {
        const AdminMail = 'admin@gmail.com'
        const AdminPw = 'admin@123'

        // Validation
        const newErrors = {}
        if (!user.Email.trim()) newErrors.Email = 'Email is required'
        if (!user.Password) newErrors.Password = 'Password is required'
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsSubmitting(true)

        setTimeout(() => {
            // Admin Login
            if (user.Email === AdminMail && user.Password === AdminPw) {
                localStorage.setItem('Role', 'Admin')
                navigate('/Admin')
                window.location.reload()
                return
            }

            // User Login
            let userD = JSON.parse(localStorage.getItem('User')) || []
            const exist = userD.find(i => i.Email === user.Email && i.Password === user.Password)

            if (exist) {
                localStorage.setItem('loggeduser', JSON.stringify(user))
                localStorage.setItem('Role', 'User')
                navigate('/UserIndex')
                window.location.reload()
                return
            } else {
                setIsSubmitting(false)
                setErrors({ ...errors, Email: 'Account not found' })
                setTimeout(() => {
                    navigate('/Register')
                }, 2000)
            }
        }, 800)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            Handlelogin()
        }
    }

    return (
        <div className="premium-login-page">
            {/* Background Image - PRESERVED */}
            <img 
                className="login-bg-image" 
                src="/d2f9ba4d-f0f8-437a-8471-5319a9f948dd-Photoroom.png" 
                alt="FACINOVA Background" 
            />

            {/* Animated Overlay */}
            <div className="login-overlay"></div>
            <div className="login-bg-particles">
                <div className="login-particle lp1"></div>
                <div className="login-particle lp2"></div>
                <div className="login-particle lp3"></div>
                <div className="login-particle lp4"></div>
            </div>

            {/* Main Container */}
            <div className="login-container">
                {/* Brand Logo */}
                <div className="login-brand">
                    <div className="login-logo-circle">
                        <img 
                            src="/ChatGPT Image Apr 30, 2026, 11_11_36 AM (1).png" 
                            alt="FACINOVA Logo" 
                            className="login-logo-img"
                        />
                        <div className="login-logo-glow"></div>
                    </div>
                    <h1 className="login-brand-name">
                        <span className="login-brand-f">FACINOVA</span>
                    </h1>
                </div>

                {/* Header */}
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your premium account</p>
                </div>

                {/* Form */}
                <div className="login-form">
                    {/* Email */}
                    <div className={`login-form-group ${focusedField === 'Email' ? 'focused' : ''} ${errors.Email ? 'error' : ''}`}>
                        <div className="login-input-wrapper">
                            <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                className='login-input'
                                type='email'
                                placeholder='Email Address'
                                name='Email'
                                value={user.Email}
                                onChange={handledata}
                                onFocus={() => setFocusedField('Email')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                            {user.Email && !errors.Email && (
                                <svg className="login-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {errors.Email && <span className="login-error-text">{errors.Email}</span>}
                    </div>

                    {/* Password */}
                    <div className={`login-form-group ${focusedField === 'Password' ? 'focused' : ''} ${errors.Password ? 'error' : ''}`}>
                        <div className="login-input-wrapper">
                            <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                className='login-input'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                name='Password'
                                value={user.Password}
                                onChange={handledata}
                                onFocus={() => setFocusedField('Password')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                type="button"
                                className="login-toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.Password && <span className="login-error-text">{errors.Password}</span>}
                    </div>

                    {/* Forgot Password */}
                    <div className="login-forgot-row">
                        <label className="login-remember">
                            <input type="checkbox" />
                            <span className="login-checkmark"></span>
                            Remember me
                        </label>
                        <button className="login-forgot-link">Forgot Password?</button>
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={Handlelogin} 
                        className='login-submit-btn'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="login-spinner"></span>
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </>
                        )}
                    </button>

                    {/* Register Link */}
                    <div className="login-register-link">
                        <span>Don't have an account?</span>
                        <Link to="/Register">Create Account</Link>
                    </div>
                </div>
                

                {/* Footer Brand */}
                <div className="login-footer-brand">
                    <p> 2026 FACINOVA. Premium Shopping Experience.</p>
                </div>
            </div>
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Reg.css'

function Register() {
    const [user, setUser] = useState({ UserName: '', Email: '', Password: '', Phone: '', UserCode: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

    const navigate = useNavigate()

    const handlechange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const validateForm = () => {
        const newErrors = {}
        if (!user.UserName.trim()) newErrors.UserName = 'Username is required'
        if (!user.Email.trim()) newErrors.Email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(user.Email)) newErrors.Email = 'Invalid email format'
        if (!user.Password) newErrors.Password = 'Password is required'
        else if (user.Password.length < 6) newErrors.Password = 'Password must be at least 6 characters'
        if (!user.Phone) newErrors.Phone = 'Phone is required'
        else if (user.Phone.length < 10) newErrors.Phone = 'Enter valid phone number'
        if (!user.UserCode.trim()) newErrors.UserCode = 'User code is required'
        return newErrors
    }

    const handlesubmit = () => {
        const newErrors = validateForm()
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsSubmitting(true)

        let userD = JSON.parse(localStorage.getItem('User')) || []

        const exist = userD.find(i => i.Email === user.Email && i.UserCode === user.UserCode)

        if (exist) {
            setErrors({ ...errors, Email: 'User already exists with this Email or UserCode' })
            setIsSubmitting(false)
            return
        }

        userD.push(user)
        localStorage.setItem('User', JSON.stringify(userD))
        
        setTimeout(() => {
            setIsSubmitting(false)
            navigate('/Login')
        }, 500)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlesubmit()
        }
    }

    return (
        <div className="premium-register-page">
            {/* Background Image - PRESERVED */}
            <img 
                className="reg-bg-image" 
                src="/Gemini_Generated_Image_ltl3d6ltl3d6ltl3-Photoroom-Photoroom-Photoroom.png" 
                alt="FACINOVA Background" 
            />

            {/* Animated Overlay */}
            <div className="reg-overlay"></div>
            <div className="reg-bg-particles">
                <div className="particle p1"></div>
                <div className="particle p2"></div>
                <div className="particle p3"></div>
                <div className="particle p4"></div>
            </div>

            {/* Main Container */}
            <div className="reg-container">
                {/* Brand Logo */}
                <div className="reg-brand">
                    <div className="reg-logo-circle">
                        <img 
                            src="/ChatGPT Image Apr 30, 2026, 11_11_36 AM (1).png" 
                            alt="FACINOVA Logo" 
                            className="reg-logo-img"
                        />
                    </div>
                    <h1 className="reg-brand-name">
                        <span className="brand-f">FACINOVA</span>
                    </h1>
                </div>

                {/* Header */}
                <div className="reg-header">
                    <h2>Create Account</h2>
                    <p>Join the premium shopping experience</p>
                </div>

                {/* Form */}
                <div className="reg-form">
                    {/* Username */}
                    <div className={`reg-form-group ${focusedField === 'UserName' ? 'focused' : ''} ${errors.UserName ? 'error' : ''}`}>
                        <div className="reg-input-wrapper">
                            <svg className="reg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                className='reg-input'
                                type='text'
                                placeholder='Username'
                                name='UserName'
                                value={user.UserName}
                                onChange={handlechange}
                                onFocus={() => setFocusedField('UserName')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                            {user.UserName && (
                                <svg className="reg-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {errors.UserName && <span className="reg-error-text">{errors.UserName}</span>}
                    </div>

                    {/* Email */}
                    <div className={`reg-form-group ${focusedField === 'Email' ? 'focused' : ''} ${errors.Email ? 'error' : ''}`}>
                        <div className="reg-input-wrapper">
                            <svg className="reg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                className='reg-input'
                                type='email'
                                placeholder='Email Address'
                                name='Email'
                                value={user.Email}
                                onChange={handlechange}
                                onFocus={() => setFocusedField('Email')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                            {user.Email && !errors.Email && (
                                <svg className="reg-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {errors.Email && <span className="reg-error-text">{errors.Email}</span>}
                    </div>

                    {/* Password */}
                    <div className={`reg-form-group ${focusedField === 'Password' ? 'focused' : ''} ${errors.Password ? 'error' : ''}`}>
                        <div className="reg-input-wrapper">
                            <svg className="reg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                className='reg-input'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                name='Password'
                                value={user.Password}
                                onChange={handlechange}
                                onFocus={() => setFocusedField('Password')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                type="button"
                                className="reg-toggle-password"
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
                        {errors.Password && <span className="reg-error-text">{errors.Password}</span>}
                    </div>

                    {/* Phone */}
                    <div className={`reg-form-group ${focusedField === 'Phone' ? 'focused' : ''} ${errors.Phone ? 'error' : ''}`}>
                        <div className="reg-input-wrapper">
                            <svg className="reg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input
                                className='reg-input'
                                type='tel'
                                placeholder='Phone Number'
                                name='Phone'
                                value={user.Phone}
                                onChange={handlechange}
                                onFocus={() => setFocusedField('Phone')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        {errors.Phone && <span className="reg-error-text">{errors.Phone}</span>}
                    </div>

                    {/* User Code */}
                    <div className={`reg-form-group ${focusedField === 'UserCode' ? 'focused' : ''} ${errors.UserCode ? 'error' : ''}`}>
                        <div className="reg-input-wrapper">
                            <svg className="reg-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                            </svg>
                            <input
                                className='reg-input'
                                type='text'
                                placeholder='User Code'
                                name='UserCode'
                                value={user.UserCode}
                                onChange={handlechange}
                                onFocus={() => setFocusedField('UserCode')}
                                onBlur={() => setFocusedField(null)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        {errors.UserCode && <span className="reg-error-text">{errors.UserCode}</span>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={handlesubmit} 
                        className='reg-submit-btn'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="reg-spinner"></span>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </>
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="reg-login-link">
                        <span>Already have an account?</span>
                        <Link to="/Login">Sign In</Link>
                    </div>
                </div>

                {/* Footer Brand */}
                <div className="reg-footer-brand">
                    <p>2026 FACINOVA. Premium Shopping Experience.</p>
                </div>
            </div>
        </div>
    )
}

export default Register
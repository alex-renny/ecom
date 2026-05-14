import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Cart.css'

function Cart() {
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    // const [couponCode, setCouponCode] = useState('')
    const [discount, setDiscount] = useState(0)
    // const [appliedCoupon, setAppliedCoupon] = useState('')
    // const [couponError, setCouponError] = useState('')
    const [removingItem, setRemovingItem] = useState(null)
    const [showClearConfirm, setShowClearConfirm] = useState(false)

    // Available coupons
    // const coupons = {
    //     'SAVE20': 20,
    //     'WELCOME10': 10,
    //     'FACINOVA15': 15,
    //     'TECH25': 25
    // }

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {
        let user = JSON.parse(localStorage.getItem('loggeduser'))
        let data = JSON.parse(localStorage.getItem('Cart')) || []
        let userCart = data.filter(item => item.user === user?.Email)
        setCart(userCart)
    }

    const updateQuantity = (index, change) => {
        let updatedCart = [...cart]
        let newQuantity = (updatedCart[index].quantity || 1) + change

        if (newQuantity < 1) return
        if (newQuantity > 10) {
            alert('Maximum 10 items allowed per product')
            return
        }

        updatedCart[index] = {
            ...updatedCart[index],
            quantity: newQuantity
        }

        setCart(updatedCart)
        updateLocalStorage(updatedCart)
    }

    const removeItem = (index) => {
        setRemovingItem(index)
        
        // Animate out before removing
        setTimeout(() => {
            let updatedCart = [...cart]
            updatedCart.splice(index, 1)
            setCart(updatedCart)
            updateLocalStorage(updatedCart)
            setRemovingItem(null)
        }, 300)
    }

    const updateLocalStorage = (updatedCart) => {
        let user = JSON.parse(localStorage.getItem('loggeduser'))
        let allCart = JSON.parse(localStorage.getItem('Cart')) || []
        
        // Remove current user's items
        allCart = allCart.filter(item => item.user !== user?.Email)
        
        // Add updated cart
        allCart = [...allCart, ...updatedCart]
        
        localStorage.setItem('Cart', JSON.stringify(allCart))
    }

    const clearCart = () => {
        let user = JSON.parse(localStorage.getItem('loggeduser'))
        let allCart = JSON.parse(localStorage.getItem('Cart')) || []
        
        // Remove current user's items
        allCart = allCart.filter(item => item.user !== user?.Email)
        
        localStorage.setItem('Cart', JSON.stringify(allCart))
        setCart([])
        setShowClearConfirm(false)
        setDiscount(0)
        // setAppliedCoupon('')
        // setCouponCode('')
    }

    // const applyCoupon = () => {
    //     setCouponError('')
        
    //     if (!couponCode.trim()) {
    //         setCouponError('Please enter a coupon code')
    //         return
    //     }

    //     const code = couponCode.toUpperCase()
        
    //     if (coupons[code]) {
    //         setDiscount(coupons[code])
    //         setAppliedCoupon(code)
    //         setCouponError('')
    //     } else {
    //         setCouponError('Invalid coupon code')
    //         setDiscount(0)
    //         setAppliedCoupon('')
    //     }
    // }

    // const removeCoupon = () => {
    //     setDiscount(0)
    //     setAppliedCoupon('')
    //     setCouponCode('')
    //     setCouponError('')
    // }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {
        return sum + (Number(item.price) * (item.quantity || 1))
    }, 0)

    const discountAmount = (subtotal * discount) / 100
    const shipping = subtotal > 2000 ? 0 : 199
    const total = subtotal - discountAmount + shipping 

    const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

    // Save for free shipping
    const freeShippingThreshold = 2000
    const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty')
            return
        }
        navigate('/Checkout')
    }

    return (
        <div className="premium-cart-page">
            {/* Cart Header */}
            <div className="cart-header">
                <div className="cart-header-content">
                    <h1>Shopping Cart</h1>
                    <div className="cart-breadcrumb">
                        <Link to="/UserIndex">Home</Link>
                        <span className="separator">/</span>
                        <span className="current">Cart</span>
                    </div>
                </div>
            </div>

            <div className="cart-container">
                {cart.length === 0 ? (
                    /* Empty Cart State */
                    <div className="empty-cart">
                        <div className="empty-cart-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/UserProduct" className="continue-shopping-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* Cart Items Section */}
                        <div className="cart-items-section">
                            <div className="cart-items-header">
                                <h2>Cart Items ({itemCount})</h2>
                                <button 
                                    className="clear-cart-btn"
                                    onClick={() => setShowClearConfirm(true)}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Clear Cart
                                </button>
                            </div>

                            {/* Free Shipping Progress */}
                            {amountForFreeShipping > 0 && (
                                <div className="free-shipping-banner">
                                    <div className="shipping-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    </div>
                                    <div className="shipping-text">
                                        <p>Add <strong>₹{amountForFreeShipping.toLocaleString()}</strong> more to get <span>FREE shipping!</span></p>
                                        <div className="shipping-progress-bar">
                                            <div 
                                                className="shipping-progress-fill"
                                                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Cart Items List */}
                            <div className="cart-items-list">
                                {cart.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className={`cart-item ${removingItem === index ? 'removing' : ''}`}
                                    >
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                            {item.badge && (
                                                <span className="item-badge">{item.badge}</span>
                                            )}
                                        </div>

                                        <div className="cart-item-details">
                                            <div className="item-info">
                                                <h3>{item.name}</h3>
                                                {item.category && (
                                                    <span className="item-category">{item.category}</span>
                                                )}
                                                {item.description && (
                                                    <p className="item-description">{item.description}</p>
                                                )}
                                            </div>

                                            <div className="item-actions">
                                                <div className="quantity-controls">
                                                    <button 
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(index, -1)}
                                                        disabled={(item.quantity || 1) <= 1}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="qty-display">{item.quantity || 1}</span>
                                                    <button 
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(index, 1)}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <button 
                                                    className="remove-item-btn"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-item-price">
                                            <span className="item-price">₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}</span>
                                            {(item.quantity || 1) > 1 && (
                                                <span className="item-unit-price">₹{Number(item.price).toLocaleString()} each</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Shopping */}
                            <Link to="/UserProduct" className="continue-shopping-link">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Order Summary Section */}
                        <div className="order-summary-section">
                            <div className="order-summary-card">
                                <h3>Order Summary</h3>

                                {/* Coupon Code
                                <div className="coupon-section">
                                    <label>Coupon Code</label>
                                    <div className="coupon-input-wrapper">
                                        <input
                                            type="text"
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            disabled={!!appliedCoupon}
                                        />
                                        {appliedCoupon ? (
                                            <button className="remove-coupon-btn" onClick={removeCoupon}>
                                                Remove
                                            </button>
                                        ) : (
                                            <button className="apply-coupon-btn" onClick={applyCoupon}>
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                    {couponError && <p className="coupon-error">{couponError}</p>}
                                    {appliedCoupon && (
                                        <p className="coupon-success">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Coupon "{appliedCoupon}" applied! ({discount}% off)
                                        </p>
                                    )}
                                    <div className="available-coupons">
                                        <p>Available coupons:</p>
                                        <div className="coupon-tags">
                                            {Object.entries(coupons).map(([code, discount]) => (
                                                <span 
                                                    key={code} 
                                                    className="coupon-tag"
                                                    onClick={() => {
                                                        setCouponCode(code)
                                                        setCouponError('')
                                                    }}
                                                >
                                                    {code}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div> */}

                                {/* Price Breakdown */}
                                <div className="price-breakdown">
                                    <div className="price-row">
                                        <span>Subtotal ({itemCount} items)</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    
                                    {discount > 0 && (
                                        <div className="price-row discount-row">
                                            <span>Discount ({discount}%)</span>
                                            <span className="discount-amount">-₹{discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    
                                    <div className="price-row">
                                        <span>Shipping</span>
                                        {shipping === 0 ? (
                                            <span className="free-shipping">FREE</span>
                                        ) : (
                                            <span>₹{shipping.toLocaleString()}</span>
                                        )}
                                    </div>
                                
                                    
                                    <div className="price-divider"></div>
                                    
                                    <div className="price-row total-row">
                                        <span>Total</span>
                                        <span className="total-amount">₹{total.toLocaleString()}</span>
                                    </div>
                                    
                                    {discount > 0 && (
                                        <div className="savings-text">
                                            You save ₹{discountAmount.toLocaleString()} on this order!
                                        </div>
                                    )}
                                </div>

                                {/* Checkout Button */}
                                <button 
                                    className="checkout-btn"
                                    onClick={handleCheckout}
                                >
                                    <span>Proceed to Checkout</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>

                                {/* Payment Methods */}
                                <div className="payment-methods">
                                    <p>We Accept:</p>
                                    <div className="payment-icons">
                                        <span className="payment-icon">💳</span>
                                        <span className="payment-icon">🏦</span>
                                        <span className="payment-icon">📱</span>
                                        <span className="payment-icon">💵</span>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="trust-badges">
                                    <div className="trust-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span>Secure Checkout</span>
                                    </div>
                                    <div className="trust-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Clear Cart Confirmation Modal */}
            {showClearConfirm && (
                <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
                    <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3>Clear Cart?</h3>
                        <p>Are you sure you want to remove all items from your cart?</p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowClearConfirm(false)}>
                                Cancel
                            </button>
                            <button className="confirm-btn" onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
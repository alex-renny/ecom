import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout() {
    const navigate = useNavigate()
    const [cartitems, setCartitems] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState('card')
    const [showSuccess, setShowSuccess] = useState(false)

    const user = JSON.parse(localStorage.getItem('loggeduser'))

    useEffect(() => {
        const storedproducts = JSON.parse(localStorage.getItem('Cart')) || []
        setCartitems(storedproducts)
    }, [])

    const mycart = cartitems.filter(item => item.user === user.Email)

    const subtotal = mycart.reduce((sum, item) => {
        return sum + (Number(item.price) * (item.quantity || 1))
    }, 0)

    // const shipping = subtotal > 2000 ? 0 : 199
    const total = subtotal
    const itemCount = mycart.reduce((sum, item) => sum + (item.quantity || 1), 0)

    const handlepayment = () => {
        setIsProcessing(true)
        
        // Simulate payment processing
        setTimeout(() => {
            let allcarts = JSON.parse(localStorage.getItem('Cart')) || []
            let allorders = JSON.parse(localStorage.getItem('Orders')) || []

            const usercart = allcarts.filter(item => item.user === user.Email)
            const balancecart = allcarts.filter(item => item.user !== user.Email)

            const updatedOrders = [...allorders, ...usercart]
            localStorage.setItem('Orders', JSON.stringify(updatedOrders))
            localStorage.setItem('Cart', JSON.stringify(balancecart))

            setIsProcessing(false)
            setShowSuccess(true)
            setCartitems([])

            // Navigate to orders after showing success
            setTimeout(() => {
                navigate('/MyOrder')
            }, 10000)
        }, 2000)
    }

    if (showSuccess) {
        return (
            <div className="premium-checkout-page">
                <div className="success-container">
                    <div className="success-animation">
                        <div className="success-circle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h1>Payment Successful!</h1>
                    <p>Thank you for your purchase. Your order has been confirmed.</p>
                    {/* <p className="success-order-id">Order ID: #FAC{Math.random().toString(36).substr(2, 8).toUpperCase()}</p> */}
                    <p className="redirect-text">Redirecting to your orders...</p>
                    <div className="success-actions">
                        <button onClick={() => navigate('/MyOrder')} className="view-orders-btn">
                            View Orders
                        </button>
                        <button onClick={() => navigate('/UserProduct')} className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="premium-checkout-page">
            {/* Checkout Header */}
            <div className="checkout-header">
                <div className="checkout-header-content">
                    <h1>Checkout</h1>
                    <div className="checkout-breadcrumb">
                        <span onClick={() => navigate('/Cart')} className="breadcrumb-link">Cart</span>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Checkout</span>
                    </div>
                </div>
            </div>

            <div className="checkout-wrapper">
                {mycart.length === 0 ? (
                    /* Empty State */
                    <div className="checkout-empty-state">
                        <div className="empty-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                        </div>
                        <h2>No Products Found</h2>
                        <p>Your cart is empty. Add some products before checkout.</p>
                        <button onClick={() => navigate('/UserProduct')} className="shop-now-btn">
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <div className="checkout-layout">
                        {/* Left Column - Order Details */}
                        <div className="checkout-main">
                            {/* Shipping Address */}
                            <div className="checkout-section">
                                <div className="section-header">
                                    <div className="section-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3>Shipping Address</h3>
                                </div>
                                <div className="address-details">
                                    <p className="user-name">{user?.Name || user?.Email}</p>
                                    <p className="user-email">{user?.Email}</p>
                                    <p className="default-address">Default shipping address</p>
                                    <button className="change-address-btn">Change Address</button>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="checkout-section">
                                <div className="section-header">
                                    <div className="section-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <h3>Order Items ({itemCount})</h3>
                                </div>
                                <div className="checkout-items-list">
                                    {mycart.map((item, index) => (
                                        <div className="checkout-item-card" key={index}>
                                            <div className="checkout-item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="checkout-item-info">
                                                <h4>{item.name}</h4>
                                                {item.category && (
                                                    <span className="checkout-item-category">{item.category}</span>
                                                )}
                                                <div className="checkout-item-meta">
                                                    <span className="item-qty">Qty: {item.quantity || 1}</span>
                                                </div>
                                            </div>
                                            <div className="checkout-item-price">
                                                <span className="item-total-price">
                                                    ₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}
                                                </span>
                                                {(item.quantity || 1) > 1 && (
                                                    <span className="item-unit-price">
                                                        ₹{Number(item.price).toLocaleString()} each
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="checkout-section">
                                <div className="section-header">
                                    <div className="section-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3>Payment Method</h3>
                                </div>
                                <div className="payment-options">
                                    <label className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={selectedPayment === 'card'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                        />
                                        <div className="payment-option-content">
                                            <span className="payment-icon">💳</span>
                                            <div>
                                                <p className="payment-name">Credit/Debit Card</p>
                                                <p className="payment-desc">Pay with Visa, Mastercard</p>
                                            </div>
                                        </div>
                                        <div className="radio-indicator"></div>
                                    </label>
                                    
                                    <label className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="upi"
                                            checked={selectedPayment === 'upi'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                        />
                                        <div className="payment-option-content">
                                            <span className="payment-icon">📱</span>
                                            <div>
                                                <p className="payment-name">UPI</p>
                                                <p className="payment-desc">Google Pay, PhonePe, Paytm</p>
                                            </div>
                                        </div>
                                        <div className="radio-indicator"></div>
                                    </label>
                                    
                                    <label className={`payment-option ${selectedPayment === 'netbanking' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="netbanking"
                                            checked={selectedPayment === 'netbanking'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                        />
                                        <div className="payment-option-content">
                                            <span className="payment-icon">🏦</span>
                                            <div>
                                                <p className="payment-name">Net Banking</p>
                                                <p className="payment-desc">All major banks supported</p>
                                            </div>
                                        </div>
                                        <div className="radio-indicator"></div>
                                    </label>
                                    
                                    <label className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={selectedPayment === 'cod'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                        />
                                        <div className="payment-option-content">
                                            <span className="payment-icon">💵</span>
                                            <div>
                                                <p className="payment-name">Cash on Delivery</p>
                                                <p className="payment-desc">Pay when you receive</p>
                                            </div>
                                        </div>
                                        <div className="radio-indicator"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="checkout-sidebar">
                            <div className="order-summary-sticky">
                                <div className="order-summary-card">
                                    <h3>Order Summary</h3>
                                    
                                    <div className="summary-prices">
                                        <div className="summary-row">
                                            <span>Subtotal ({itemCount} items)</span>
                                            <span>₹{subtotal.toLocaleString()}</span>
                                        </div>
                                        {/* <div className="summary-row">
                                            <span>Shipping</span>
                                            {shipping === 0 ? (
                                                <span className="free-text">FREE</span>
                                            ) : (
                                                <span>₹{shipping.toLocaleString()}</span>
                                            )}
                                        </div> */}
                                        
                                        <div className="summary-divider"></div>
                                        
                                        <div className="summary-row summary-total">
                                            <span>Total</span>
                                            <span className="total-price">₹{total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button 
                                        className="pay-now-btn"
                                        onClick={handlepayment}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <span className="spinner"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Pay ₹{total.toLocaleString()}
                                            </>
                                        )}
                                    </button>

                                    <div className="secure-badge">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>Secure & Encrypted Payment</span>
                                    </div>
                                </div>

                                <div className="guarantee-card">
                                    <div className="guarantee-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="guarantee-text">
                                        <h4>100% Purchase Protection</h4>
                                        <p>Your information is secure and your satisfaction is guaranteed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Checkout
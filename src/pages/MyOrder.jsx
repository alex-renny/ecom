import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyOrder.css'

function MyOrder() {

    const [myOrders, setMyOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const user = JSON.parse(localStorage.getItem('loggeduser'))
    const navigate = useNavigate()

    useEffect(() => {

        const storedOrders =
            JSON.parse(localStorage.getItem('Orders')) || []

        const filteredOrders = storedOrders.filter(
            item => item.user === user.Email
        )

        const ordersWithDate = filteredOrders.map((order, index) => ({
            ...order,

            orderId:
                `FAC${Math.random().toString(36)
                    .substr(2, 6)
                    .toUpperCase()}`,

            orderDate:
                new Date(
                    Date.now() - (index * 86400000)
                ).toLocaleDateString(
                    'en-US',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                ),

            quantity: order.quantity || 1
        }))

        setMyOrders(ordersWithDate)

    }, [])

    const filteredOrders = myOrders.filter(order =>
        order.name?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    return (

        <div className="premium-orders-page">

            {/* HEADER */}

            <div className="orders-header">

                <div className="orders-header-content">

                    <h1>My Orders</h1>

                    <div className="orders-breadcrumb">

                        <span
                            onClick={() => navigate('/UserIndex')}
                            className="breadcrumb-link"
                        >
                            Home
                        </span>

                        <span className="breadcrumb-separator">
                            /
                        </span>

                        <span className="breadcrumb-current">
                            My Orders
                        </span>

                    </div>

                </div>

                {/* STATS */}

                <div className="orders-stats">

                    <div className="stat-card">
                        <span className="stat-number">
                            {myOrders.length}
                        </span>

                        <span className="stat-label">
                            Total Orders
                        </span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-number">
                            ₹{
                                myOrders.reduce(
                                    (acc, item) =>
                                        acc +
                                        (Number(item.price)
                                            * item.quantity),
                                    0
                                ).toLocaleString()
                            }
                        </span>

                        <span className="stat-label">
                            Total Spent
                        </span>
                    </div>

                </div>

            </div>

            {/* CONTENT */}

            <div className="orders-wrapper">

                {/* SEARCH */}

                <div className="orders-toolbar">

                    <div className="search-box">

                        <svg
                            className="search-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search Orders..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="search-input"
                        />

                    </div>

                </div>

                {/* EMPTY */}

                {filteredOrders.length === 0 ? (

                    <div className="orders-empty-state">

                        <div className="empty-illustration">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>

                        </div>

                        <h3>No Orders Found</h3>

                        <p>
                            You haven’t placed any orders yet.
                        </p>

                        <button
                            onClick={() => navigate('/UserProduct')}
                            className="start-shopping-btn"
                        >
                            Start Shopping
                        </button>

                    </div>

                ) : (

                    <div className="orders-list">

                        {filteredOrders.map((item, index) => (

                            <div
                                className="order-card"
                                key={index}
                            >

                                {/* TOP */}

                                <div className="order-card-header">

                                    <div>

                                        <span className="order-id-label">
                                            Order ID
                                        </span>

                                        <span className="order-id-value">
                                            {item.orderId}
                                        </span>

                                    </div>

                                    <div>

                                        <span className="order-date-label">
                                            Ordered On
                                        </span>

                                        <span className="order-date-value">
                                            {item.orderDate}
                                        </span>

                                    </div>

                                </div>

                                {/* BODY */}

                                <div className="order-card-body">

                                    <div className="order-product-image">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                    </div>

                                    <div className="order-product-details">

                                        <h3>{item.name}</h3>

                                        {item.category && (
                                            <span className="product-category">
                                                {item.category}
                                            </span>
                                        )}

                                        <div className="product-meta">

                                            <span className="product-qty">
                                                Qty:
                                                {item.quantity}
                                            </span>

                                            <span className="product-price">
                                                ₹{
                                                    Number(item.price)
                                                        .toLocaleString()
                                                }
                                            </span>

                                        </div>

                                    </div>

                                    <div className="order-product-total">

                                        <span className="total-label">
                                            Total
                                        </span>

                                        <span className="total-amount">
                                            ₹{
                                                (
                                                    Number(item.price)
                                                    * item.quantity
                                                ).toLocaleString()
                                            }
                                        </span>

                                    </div>

                                </div>

                                {/* FOOTER */}

                                <div className="order-card-footer">

                                    <button className="invoice-btn">

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>

                                        Download Invoice

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    )
}

export default MyOrder
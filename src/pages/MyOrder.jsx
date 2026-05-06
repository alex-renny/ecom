import React, { useEffect, useState } from 'react'
import './MyOrder.css'

function MyOrder() {
    const [myOrders, setMyOrders] = useState([])

    const user = JSON.parse(localStorage.getItem('loggeduser'))

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('Orders')) || []

        const filteredOrders = storedOrders.filter(
            item => item.user === user.Email
        )

        setMyOrders(filteredOrders)
    }, [])

    return (
        <div className="orders-container">
            <h2>My Orders</h2>

                {myOrders.length === 0 ? (
                    <p className="orders-empty">No Orders Found</p>
                ) : (
                    <div className="orders-list">
                        {myOrders.map((item, index) => (
                            <div className="order-card" key={index}>
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                            </div>
                        ))
                        }
                    </div>
            )}
        </div>
    )
}

export default MyOrder
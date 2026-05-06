import React, { useEffect, useState } from 'react'
import './AdminOrder.css'

function AdminOrder() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('Orders')) || []
        setOrders(storedOrders)
    }, [])

    return (
        <div className="admin-orders-container">
            <h2>All Orders (Admin)</h2>

            {orders.length === 0 ? (
                <p className="admin-orders-empty">No Orders Found</p>
            ) : (
                    <div className="admin-orders-list">
                        {orders.map((item, index) => (
                            <div className="admin-order-card" key={index}>
                                <h3>{item.name}</h3>
                                <p>User: {item.user}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                        ))
                        }
                    </div>
            )}
        </div>
    )
}

export default AdminOrder
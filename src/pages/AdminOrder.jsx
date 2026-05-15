import React, { useEffect, useState } from 'react'
import './AdminOrder.css'

function AdminOrder() {
    const [orders, setOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            const storedOrders = JSON.parse(localStorage.getItem('Orders')) || []
            
            // Add additional details for display
            const enrichedOrders = storedOrders.map((order, index) => ({
                ...order,
                orderId: `ORD-${String(index + 1).padStart(4, '0')}`,
                orderDate: new Date(Date.now() - (index * 2 * 86400000)).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                status: order.status || ['Delivered', 'Processing', 'In Transit', 'Shipped', 'Pending'][index % 5],
                quantity: order.quantity || 1,
                paymentMethod: ['Credit Card', 'UPI', 'Net Banking', 'COD'][index % 4],
                trackingId: `TRK${Math.random().toString(36).substr(2, 8).toUpperCase()}`
            }))
            
            setOrders(enrichedOrders)
            setLoading(false)
        }, 800)
    }, [])

    // Get unique users for filter
    const uniqueUsers = ['all', ...new Set(orders.map(o => o.user).filter(Boolean))]

    // Filter and sort
    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = true
            
            const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter
            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'oldest': return new Date(a.orderDate) - new Date(b.orderDate)
                case 'price-high': return (Number(b.price) || 0) - (Number(a.price) || 0)
                case 'price-low': return (Number(a.price) || 0) - (Number(b.price) || 0)
                default: return new Date(b.orderDate) - new Date(a.orderDate)
            }
        })

    const handleDeleteOrder = (index) => {
        const actualIndex = orders.findIndex(o => o.orderId === deleteConfirm)
        if (actualIndex > -1) {
            let allOrders = JSON.parse(localStorage.getItem('Orders')) || []
            allOrders.splice(actualIndex, 1)
            localStorage.setItem('Orders', JSON.stringify(allOrders))
            setOrders(prev => prev.filter(o => o.orderId !== deleteConfirm))
        }
        setDeleteConfirm(null)
    }

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(o => 
            o.orderId === orderId ? { ...o, status: newStatus } : o
        )
        setOrders(updatedOrders)
        
        // Update localStorage
        let allOrders = JSON.parse(localStorage.getItem('Orders')) || []
        const idx = allOrders.findIndex((o, i) => 
            orders[i]?.orderId === orderId
        )
        if (idx > -1) {
            allOrders[idx].status = newStatus
            localStorage.setItem('Orders', JSON.stringify(allOrders))
        }
    }

    
    return (
        <div className="premium-admin-orders">
            {/* Header */}
            <div className="ao-header">
                <div className="ao-header-content">
                    <h1>Order Management</h1>
                    <p>View and manage all customer orders</p>
                </div>
                
            </div>

            {/* Toolbar */}
            <div className="ao-toolbar">
                <div className="ao-toolbar-left">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="ao-sort"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                    </select>
                </div>
            </div>

            

            {/* Orders List */}
            {loading ? (
                <div className="ao-loading">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="ao-skeleton" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="ao-skeleton-row"></div>
                            <div className="ao-skeleton-row short"></div>
                            <div className="ao-skeleton-row medium"></div>
                        </div>
                    ))}
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="ao-empty">
                    <div className="ao-empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3>No Orders Found</h3>
                    <p>No orders match your current filters</p>
                    <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="ao-orders-list">
                    {filteredOrders.map((item, index) => (
                        <div 
                            key={index} 
                            className={`ao-order-card ${selectedOrder === item.orderId ? 'expanded' : ''}`}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            {/* Card Header */}
                            <div className="ao-card-header" onClick={() => setSelectedOrder(selectedOrder === item.orderId ? null : item.orderId)}>
                                <div className="ao-card-header-left">
                                    <div className="ao-order-id">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <span>{item.orderId}</span>
                                    </div>
                                    
                                </div>
                                <div className="ao-card-header-right">
                                    <span className="ao-order-date">{item.orderDate}</span>
                                    <svg className={`ao-expand-icon ${selectedOrder === item.orderId ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Card Body - Always visible */}
                            <div className="ao-card-body">
                                <div className="ao-product-info">
                                    {item.image && (
                                        <div className="ao-product-img">
                                            <img src={item.image} alt={item.name} onError={(e) => { e.target.style.display = 'none' }} />
                                        </div>
                                    )}
                                    <div className="ao-product-details">
                                        <h3>{item.name}</h3>
                                        <div className="ao-product-meta">
                                            <span className="ao-user">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {item.user}
                                            </span>
                                            <span className="ao-qty">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ao-price-section">
                                    <span className="ao-price">₹{Number(item.price).toLocaleString()}</span>
                                    <span className="ao-total-label">
                                        Total: ₹{(Number(item.price) * (item.quantity || 1)).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Card Expand - Extra details */}
                            {selectedOrder === item.orderId && (
                                <div className="ao-card-expand">
                                    <div className="ao-expand-grid">
                                        
                                    </div>
                                    <div className="ao-expand-actions">
                                        <button 
                                            className="ao-action-btn ao-delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setDeleteConfirm(item.orderId)
                                            }}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete Order
                                        </button>
                                        <button className="ao-action-btn ao-print-btn" onClick={(e) => e.stopPropagation()}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg>
                                            Print Invoice
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            {!loading && filteredOrders.length > 0 && (
                <div className="ao-footer">
                    <p>Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="ao-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="ao-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="ao-modal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3>Delete Order?</h3>
                        <p>Are you sure you want to delete this order? This action cannot be undone.</p>
                        <div className="ao-modal-actions">
                            <button className="ao-modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="ao-modal-delete" onClick={handleDeleteOrder}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOrder
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './P-List.css'

function P_List() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [viewMode, setViewMode] = useState('list')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            let data = JSON.parse(localStorage.getItem('Products')) || []
            setItems(data)
            setLoading(false)
        }, 800)
    }, [])

    // Get unique categories
    const categories = ['all', ...new Set(items.map(item => item.category).filter(Boolean))]

    // Filter and sort
    const filteredItems = items
        .filter(item => {
            const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return (Number(a.price) || 0) - (Number(b.price) || 0)
                case 'price-high': return (Number(b.price) || 0) - (Number(a.price) || 0)
                case 'name': return (a.name || '').localeCompare(b.name || '')
                default: return 0
            }
        })

    const totalValue = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
    const avgPrice = items.length > 0 ? totalValue / items.length : 0

    return (
        <div className="premium-plist">
            {/* Header */}
            <div className="plist-header">
                <div className="plist-header-content">
                    <h1>Product List</h1>
                    <p>Complete inventory overview</p>
                </div>
                <div className="plist-header-stats">
                    <div className="plist-stat">
                        <span className="plist-stat-value">{items.length}</span>
                        <span className="plist-stat-label">Products</span>
                    </div>
                    <div className="plist-stat">
                        <span className="plist-stat-value">₹{totalValue.toLocaleString()}</span>
                        <span className="plist-stat-label">Total Value</span>
                    </div>
                    <div className="plist-stat">
                        <span className="plist-stat-value">₹{Math.round(avgPrice).toLocaleString()}</span>
                        <span className="plist-stat-label">Avg Price</span>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="plist-toolbar">
                <div className="plist-toolbar-left">
                    <div className="plist-search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="plist-clear-search" onClick={() => setSearchTerm('')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="plist-sort"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A-Z</option>
                    </select>
                </div>

                <div className="plist-toolbar-right">
                    <div className="plist-view-toggle">
                        <button
                            className={`plist-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </button>
                        <button
                            className={`plist-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="plist-categories">
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        className={`plist-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat === 'all' ? 'All' : cat}
                    </button>
                ))}
            </div>

            {/* Products */}
            {loading ? (
                <div className={`plist-products ${viewMode}`}>
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div key={i} className="plist-skeleton" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="skeleton-img"></div>
                            <div className="skeleton-text skeleton-name"></div>
                            <div className="skeleton-text skeleton-price"></div>
                        </div>
                    ))}
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="plist-empty">
                    <div className="plist-empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                        Clear All Filters
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="plist-grid">
                    {filteredItems.map((item, index) => (
                        <div key={index} className="plist-card" style={{ animationDelay: `${index * 0.08}s` }}>
                            <div className="plist-card-img">
                                <img
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="%23333"><rect width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="20" fill="%23666">No Image</text></svg>'
                                    }}
                                />
                                {item.badge && (
                                    <span className="plist-badge">{item.badge}</span>
                                )}
                                {item.category && (
                                    <span className="plist-card-category">{item.category}</span>
                                )}
                            </div>
                            <div className="plist-card-body">
                                <h3>{item.name}</h3>
                                {item.description && (
                                    <p className="plist-card-desc">{item.description}</p>
                                )}
                                <div className="plist-card-footer">
                                    <span className="plist-card-price">₹{Number(item.price).toLocaleString()}</span>
                                    <button 
                                        className="plist-card-btn"
                                        onClick={() => navigate('/AdminProduct')}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="plist-list-view">
                    {filteredItems.map((item, index) => (
                        <div key={index} className="plist-list-item" style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className="plist-list-img">
                                <img
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23333"><rect width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="14" fill="%23666">N/A</text></svg>'
                                    }}
                                />
                            </div>
                            <div className="plist-list-info">
                                <div>
                                    <h3>{item.name}</h3>
                                    <span className="plist-list-meta">
                                        {item.category && `${item.category} • `}
                                        {item.badge && `${item.badge} • `}
                                        ID: {index + 1}
                                    </span>
                                </div>
                            </div>
                            <div className="plist-list-price">₹{Number(item.price).toLocaleString()}</div>
                            <button 
                                className="plist-list-action"
                                onClick={() => navigate('/AdminProduct')}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer Info */}
            {!loading && filteredItems.length > 0 && (
                <div className="plist-footer">
                    <p>Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> products</p>
                </div>
            )}
        </div>
    )
}

export default P_List
import React, { useState, useEffect } from 'react'
import './UserProduct.css'

function UserProduct() {
    const [product, setProduct] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [activeCategory, setActiveCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    const [wishlist, setWishlist] = useState([])
    const [addedToCart, setAddedToCart] = useState({})
    const [hoveredProduct, setHoveredProduct] = useState(null)

    const categories = ['All', 'Audio', 'Wearables', 'Gaming', 'Accessories', 'Computers']

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('Products'))

        if (!data || data.length === 0) {
            const defaultProducts = [
                {
                    id: 1,
                    name: "Smart Watch Pro",
                    price: 1799,
                    image: "/26c7e76d05c9a6a92fe63898f3a72dc0.jpg",
                    category: "Wearables",
                    rating: 4.8,
                    reviews: 234,
                    badge: "Hot",
                    description: "Advanced fitness tracking with AMOLED display"
                },
                {
                    id: 2,
                    name: "Premium Headphones",
                    price: 1220,
                    image: "/0d8c0b01a9cc6cb914035d9f1ad4206c.jpg",
                    category: "Audio",
                    rating: 4.6,
                    reviews: 189,
                    badge: "Best Seller",
                    description: "Noise cancelling with Hi-Res audio"
                },
                {
                    id: 3,
                    name: "Mechanical Keyboard",
                    price: 1099,
                    image: "/59d27209abef2f51779cd8e4d56b2bc0.jpg",
                    category: "Gaming",
                    rating: 4.7,
                    reviews: 312,
                    badge: "New",
                    description: "RGB backlit with Cherry MX switches"
                },
                {
                    id: 4,
                    name: "Studio Amplifier",
                    price: 2120,
                    image: "/0afdaedd901ba200ba2bc743826fe39b.jpg",
                    category: "Audio",
                    rating: 4.9,
                    reviews: 156,
                    badge: "Premium",
                    description: "Professional grade sound amplification"
                },
                {
                    id: 5,
                    name: "Pro Microphone",
                    price: 1200,
                    image: "/493b0ef3cc78b862833466a8dcee9177.jpg",
                    category: "Audio",
                    rating: 4.5,
                    reviews: 198,
                    badge: "",
                    description: "Crystal clear recording for creators"
                },
                {
                    id: 6,
                    name: "Bluetooth Speaker",
                    price: 1020,
                    image: "/680c7c50b31eb8c696353913499727bf.jpg",
                    category: "Audio",
                    rating: 4.4,
                    reviews: 267,
                    badge: "Sale",
                    description: "360° surround sound with deep bass"
                },
                {
                    id: 7,
                    name: "Curved Monitor",
                    price: 1000,
                    image: "/dd28a7f9625c4aed8bd404292eefb993.jpg",
                    category: "Computers",
                    rating: 4.3,
                    reviews: 145,
                    badge: "",
                    description: "Ultra-wide curved display for productivity"
                },
                {
                    id: 8,
                    name: "Noise Earbuds",
                    price: 2220,
                    image: "/e171759e7d467cdfb6d71dab95bc717d.jpg",
                    category: "Audio",
                    rating: 4.8,
                    reviews: 423,
                    badge: "Trending",
                    description: "Active noise cancellation with crystal clarity"
                },
                
            ]

            localStorage.setItem('Products', JSON.stringify(defaultProducts))
            setProduct(defaultProducts)
            setFilteredProducts(defaultProducts)
        } else {
            setProduct(data)
            setFilteredProducts(data)
        }

        // Load wishlist
        const savedWishlist = JSON.parse(localStorage.getItem('Wishlist')) || []
        setWishlist(savedWishlist)

        // Simulate loading
        setTimeout(() => setLoading(false), 800)
    }, [])

    // Filter and sort products
    useEffect(() => {
        let result = [...product]

        // Category filter
        if (activeCategory !== 'All') {
            result = result.filter(item => item.category === activeCategory)
        }

        // Search filter
        if (searchTerm) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                result.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
                break
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            default:
                break
        }

        setFilteredProducts(result)
    }, [activeCategory, searchTerm, sortBy, product])

    const addtocart = (products) => {
        let user = JSON.parse(localStorage.getItem('loggeduser'))
        let cart = JSON.parse(localStorage.getItem('Cart')) || []

        let existing = cart.find(
            item => item.name === products.name && item.user === user.Email
        )

        if (existing) {
            alert('Product already in cart')
            return
        }

        let newitem = {
            ...products,
            user: user.Email
        }

        cart.push(newitem)
        localStorage.setItem('Cart', JSON.stringify(cart))

        // Show success animation
        setAddedToCart({ ...addedToCart, [products.id || products.name]: true })
        setTimeout(() => {
            setAddedToCart({ ...addedToCart, [products.id || products.name]: false })
        }, 2000)
    }

    const toggleWishlist = (product) => {
        let updatedWishlist = [...wishlist]
        const index = updatedWishlist.findIndex(item => item.name === product.name)

        if (index > -1) {
            updatedWishlist.splice(index, 1)
        } else {
            updatedWishlist.push(product)
        }

        setWishlist(updatedWishlist)
        localStorage.setItem('Wishlist', JSON.stringify(updatedWishlist))
    }

    const isInWishlist = (product) => {
        return wishlist.some(item => item.name === product.name)
    }

    return (
        <div className="premium-products-page">
            {/* Hero Banner */}
            {/* <div className="products-hero">
                <div className="products-hero-content">
                    <span className="hero-label">Our Collection</span>
                    <h1>Premium Products</h1>
                    <p>Discover excellence in every detail</p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">{product.length}+</span>
                            <span className="stat-label">Products</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">4.8</span>
                            <span className="stat-label">Avg Rating</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>
                <div className="hero-decoration">
                    <div className="decor-shape shape1"></div>
                    <div className="decor-shape shape2"></div>
                    <div className="decor-shape shape3"></div>
                </div>
            </div> */}

            {/* Filters Section */}
            <div className="filters-section">
                <div className="filters-container">
                    {/* Search Bar */}
                    <div className="search-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button className="clear-search" onClick={() => setSearchTerm('')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="sort-wrapper">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="default">Sort By: Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Rating</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="category-filters">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                            {activeCategory === cat && <span className="active-indicator"></span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="products-container">
                {loading ? (
                    <div className="loading-grid">
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <div key={index} className="skeleton-card">
                                <div className="skeleton-image"></div>
                                <div className="skeleton-text skeleton-title"></div>
                                <div className="skeleton-text skeleton-price"></div>
                                <div className="skeleton-button"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3>No Products Found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                        <button onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map((item, index) => (
                            <div
                                key={index}
                                className="product-card"
                                onMouseEnter={() => setHoveredProduct(index)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Product Image */}
                                <div className="product-image-wrapper">
                                    <img src={item.image} alt={item.name} />
                                    {item.badge && (
                                        <span className={`product-badge ${item.badge.toLowerCase().replace(' ', '-')}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <div className={`product-overlay ${hoveredProduct === index ? 'visible' : ''}`}>
                                        <button 
                                            className="overlay-btn quick-view"
                                            onClick={() => addtocart(item)}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                            </svg>
                                        </button>
                                        <button 
                                            className={`overlay-btn wishlist ${isInWishlist(item) ? 'active' : ''}`}
                                            onClick={() => toggleWishlist(item)}
                                        >
                                            <svg viewBox="0 0 24 24" fill={isInWishlist(item) ? "currentColor" : "none"} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="product-info">
                                    <span className="product-category">{item.category}</span>
                                    <h3>{item.name}</h3>
                                    {item.description && (
                                        <p className="product-description">{item.description}</p>
                                    )}
                                    <div className="product-rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`star ${i < Math.floor(item.rating || 0) ? 'filled' : ''}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="rating-number">{item.rating || '4.0'}</span>
                                        <span className="reviews-count">({item.reviews || 0})</span>
                                    </div>
                                    <div className="product-footer">
                                        <span className="product-price">₹{item.price.toLocaleString()}</span>
                                        <button
                                            className={`add-to-cart-btn ${addedToCart[item.id || item.name] ? 'added' : ''}`}
                                            onClick={() => addtocart(item)}
                                        >
                                            {addedToCart[item.id || item.name] ? (
                                                <>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Added
                                                </>
                                            ) : (
                                                <>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                                    </svg>
                                                    Add to Cart
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Count */}
            {!loading && filteredProducts.length > 0 && (
                <div className="results-info">
                    <p>Showing <strong>{filteredProducts.length}</strong> of <strong>{product.length}</strong> products</p>
                </div>
            )}
        </div>
    )
}

export default UserProduct
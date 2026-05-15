import React, { useState, useEffect } from 'react'
import './AdminProduct.css'

function AdminProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        description: '',
        badge: ''
    })

    const [products, setProducts] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        let productsD = JSON.parse(localStorage.getItem('Products')) || []
        setProducts(productsD)
    }

    const handleproduct = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
        
        if (name === 'image') {
            setPreviewImage(value)
        }
    }

    const handlesubmit = () => {
        if (!product.name || !product.price) {
            showMessage('All fields are required', 'error')
            return
        }

        let productsD = JSON.parse(localStorage.getItem('Products')) || []

        if (editingIndex !== null) {
            // Update existing product
            productsD[editingIndex] = { ...product }
            localStorage.setItem('Products', JSON.stringify(productsD))
            showMessage('Product updated successfully!', 'success')
        } else {
            // Add new product
            const exist = productsD.find(i => i.name.toLowerCase() === product.name.toLowerCase())
            if (exist) {
                showMessage('Product already exists!', 'error')
                return
            }
            productsD.push({ ...product })
            localStorage.setItem('Products', JSON.stringify(productsD))
            showMessage('Product added successfully!', 'success')
        }

        resetForm()
        loadProducts()
    }

    const handleEdit = (index) => {
        setProduct({ ...products[index] })
        setEditingIndex(index)
        setShowForm(true)
        setPreviewImage(products[index].image)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = (index) => {
        let productsD = JSON.parse(localStorage.getItem('Products')) || []
        productsD.splice(index, 1)
        localStorage.setItem('Products', JSON.stringify(productsD))
        loadProducts()
        setDeleteConfirm(null)
        showMessage('Product deleted successfully!', 'success')
    }

    const resetForm = () => {
        setProduct({
            name: '',
            price: '',
            image: '',
            category: '',
            description: '',
            badge: ''
        })
        setEditingIndex(null)
        setPreviewImage('')
        setShowForm(false)
    }

    const showMessage = (msg, type) => {
        setSuccessMessage(msg)
        setTimeout(() => setSuccessMessage(''), 3000)
    }

    const filteredProducts = products.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const categories = ['Audio', 'Wearables', 'Gaming', 'Accessories', 'Computers', 'Mobile']
    const badges = ['New', 'Hot', 'Sale', 'Best Seller', 'Premium', 'Trending', 'Limited']

    return (
        <div className="premium-admin-product">
            {/* Success Message Toast */}
            {successMessage && (
                <div className={`toast-message ${successMessage.includes('success') ? 'success' : 'error'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        {successMessage.includes('success') ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                    </svg>
                    {successMessage}
                </div>
            )}

            {/* Header */}
            <div className="ap-header">
                <div className="ap-header-content">
                    <h1>Product Management</h1>
                    <p>Add, edit, and manage your product inventory</p>
                </div>
                <button 
                    className="ap-add-btn"
                    onClick={() => {
                        resetForm()
                        setShowForm(true)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Product
                </button>
            </div>

            {/* Stats */}
            <div className="ap-stats">
                <div className="ap-stat-card">
                    <span className="ap-stat-value">{products.length}</span>
                    <span className="ap-stat-label">Total Products</span>
                </div>
                <div className="ap-stat-card">
                    <span className="ap-stat-value">
                        {[...new Set(products.map(p => p.category).filter(Boolean))].length}
                    </span>
                    <span className="ap-stat-label">Categories</span>
                </div>
                <div className="ap-stat-card">
                    <span className="ap-stat-value">
                        ₹{products.reduce((sum, p) => sum + (Number(p.price) || 0), 0).toLocaleString()}
                    </span>
                    <span className="ap-stat-label">Total Value</span>
                </div>
            </div>

            {/* Product Form */}
            {showForm && (
                <div className="ap-form-section">
                    <div className="ap-form-card">
                        <div className="ap-form-header">
                            <h2>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</h2>
                            <button className="ap-close-btn" onClick={resetForm}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="ap-form-grid">
                            {/* Left Column - Form Fields */}
                            <div className="ap-form-fields">
                                <div className="ap-form-group">
                                    <label>Product Name *</label>
                                    <input 
                                        type='text' 
                                        name='name' 
                                        placeholder='Enter product name' 
                                        value={product.name}
                                        onChange={handleproduct}
                                    />
                                </div>

                                <div className="ap-form-row">
                                    <div className="ap-form-group">
                                        <label>Price (₹) *</label>
                                        <input 
                                            type='number' 
                                            name='price' 
                                            placeholder='Enter price' 
                                            value={product.price}
                                            onChange={handleproduct}
                                        />
                                    </div>

                                    <div className="ap-form-group">
                                        <label>Category</label>
                                        <select 
                                            name='category' 
                                            value={product.category}
                                            onChange={handleproduct}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat, idx) => (
                                                <option key={idx} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="ap-form-group">
                                    <label>Badge</label>
                                    <div className="badge-selector">
                                        {badges.map((badge, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                className={`badge-option ${product.badge === badge ? 'selected' : ''}`}
                                                onClick={() => setProduct({ ...product, badge })}
                                            >
                                                {badge}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="ap-form-group">
                                    <label>Description</label>
                                    <textarea 
                                        name='description' 
                                        placeholder='Enter product description' 
                                        value={product.description}
                                        onChange={handleproduct}
                                        rows="3"
                                    />
                                </div>

                                <div className="ap-form-group">
                                    <label>Image URL</label>
                                    <input 
                                        type='text' 
                                        name='image' 
                                        placeholder='Enter image URL' 
                                        value={product.image}
                                        onChange={handleproduct}
                                    />
                                </div>

                                <div className="ap-form-actions">
                                    <button onClick={handlesubmit} className='ap-submit-btn'>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {editingIndex !== null ? 'Update Product' : 'Add Product'}
                                    </button>
                                    <button onClick={resetForm} className='ap-cancel-btn'>
                                        Cancel
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Preview */}
                            <div className="ap-form-preview">
                                <h3>Product Preview</h3>
                                <div className="preview-card">
                                    <div className="preview-image">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" onError={(e) => { e.target.src = 'data:image/svg+xml,...' }} />
                                        ) : (
                                            <div className="preview-placeholder">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Image Preview</span>
                                            </div>
                                        )}
                                        {product.badge && (
                                            <span className="preview-badge">{product.badge}</span>
                                        )}
                                    </div>
                                    <div className="preview-info">
                                        <span className="preview-category">{product.category || 'Category'}</span>
                                        <h4>{product.name || 'Product Name'}</h4>
                                        <p>{product.description || 'Product description will appear here'}</p>
                                        <span className="preview-price">₹{Number(product.price || 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Products List */}
            <div className="ap-products-section">
                <div className="ap-products-header">
                    <h2>Product List</h2>
                    <div className="ap-search-wrapper">
                        <svg className="ap-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="ap-search-input"
                        />
                    </div>
                </div>

                <div className="ap-products-grid">
                    {filteredProducts.length === 0 ? (
                        <div className="ap-empty">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h3>No Products Found</h3>
                            <p>Start by adding your first product</p>
                        </div>
                    ) : (
                        filteredProducts.map((item, index) => (
                            <div key={index} className="ap-product-card">
                                <div className="ap-product-image">
                                    <img 
                                        src={item.image || 'data:image/svg+xml,...'} 
                                        alt={item.name}
                                        onError={(e) => { e.target.style.display = 'none' }}
                                    />
                                    {item.badge && (
                                        <span className="ap-product-badge">{item.badge}</span>
                                    )}
                                    <div className="ap-product-overlay">
                                        <button onClick={() => handleEdit(products.indexOf(item))} className="ap-edit-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => setDeleteConfirm(products.indexOf(item))} className="ap-delete-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="ap-product-info">
                                    <span className="ap-product-category">{item.category || 'Uncategorized'}</span>
                                    <h3>{item.name}</h3>
                                    <p className="ap-product-price">₹{Number(item.price).toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm !== null && (
                <div className="ap-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="ap-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="ap-modal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3>Delete Product?</h3>
                        <p>Are you sure you want to delete "{products[deleteConfirm]?.name}"? This action cannot be undone.</p>
                        <div className="ap-modal-actions">
                            <button className="ap-modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="ap-modal-delete" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProduct
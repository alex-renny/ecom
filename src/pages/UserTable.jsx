import React, { useState, useEffect } from 'react'
import './UserTable.css'

function UserTable() {
    const [user, setUser] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(8)
    const [selectedRole, setSelectedRole] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            let data = JSON.parse(localStorage.getItem('User')) || []
            setUser(data)
            setLoading(false)
        }, 800)
    }, [])

    // Filter by role
    const filteredByRole = selectedRole === 'all' 
        ? user 
        : user.filter(u => u.role === selectedRole)

    // Search filter
    const filteredUsers = filteredByRole.filter(item =>
        (item.UserName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Phone?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.UserCode?.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    // Sort
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig.key) return 0
        const aVal = (a[sortConfig.key] || '').toLowerCase()
        const bVal = (b[sortConfig.key] || '').toLowerCase()
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
    })

    // Pagination
    const totalPages = Math.ceil(sortedUsers.length / rowsPerPage)
    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
    }

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return '↕'
        return sortConfig.direction === 'asc' ? '↑' : '↓'
    }

    return (
        <div className="premium-table-page">
            {/* Header */}
            <div className="table-header">
                <div className="table-header-content">
                    <h1>User Management</h1>
                    <p>Manage and view all registered users</p>
                </div>
                <div className="table-header-stats">
                    <div className="header-stat">
                        <span className="header-stat-value">{user.length}</span>
                        <span className="header-stat-label">Total Users</span>
                    </div>
                    <div className="header-stat">
                        <span className="header-stat-value">
                            {user.filter(u => u.role === 'admin').length}
                        </span>
                        <span className="header-stat-label">Admins</span>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="table-toolbar">
                <div className="toolbar-left">
                    <div className="search-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
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
                    <div className="filter-pills">
                        {[
                            { label: 'All', value: 'all' },
                            { label: 'Admins', value: 'admin' },
                            { label: 'Users', value: 'user' },
                        ].map((filter, idx) => (
                            <button
                                key={idx}
                                className={`filter-pill ${selectedRole === filter.value ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedRole(filter.value)
                                    setCurrentPage(1)
                                }}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="toolbar-right">
                    <span className="showing-text">
                        Showing {paginatedUsers.length} of {filteredUsers.length} users
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                {loading ? (
                    <div className="table-loading">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="skeleton-row" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="skeleton-cell"></div>
                                <div className="skeleton-cell"></div>
                                <div className="skeleton-cell"></div>
                                <div className="skeleton-cell"></div>
                                <div className="skeleton-cell"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('UserName')} className="sortable">
                                        <div className="th-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Name
                                            <span className="sort-icon">{getSortIcon('UserName')}</span>
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('Email')} className="sortable">
                                        <div className="th-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email
                                            <span className="sort-icon">{getSortIcon('Email')}</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Password
                                        </div>
                                    </th>
                                    <th onClick={() => handleSort('Phone')} className="sortable">
                                        <div className="th-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Phone
                                            <span className="sort-icon">{getSortIcon('Phone')}</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                                            </svg>
                                            User Code
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="th-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Role
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="no-data">
                                            <div className="empty-state">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <h3>No Users Found</h3>
                                                <p>Try adjusting your search or filter criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedUsers.map((item, index) => (
                                        <tr key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                                            <td data-label="Name">
                                                <div className="user-name-cell">
                                                    <div className="user-avatar">
                                                        {(item.UserName?.charAt(0) || 'U').toUpperCase()}
                                                    </div>
                                                    <span>{item.UserName}</span>
                                                </div>
                                            </td>
                                            <td data-label="Email">{item.Email}</td>
                                            <td data-label="Password">
                                                <span className="password-masked">{item.Password}</span>
                                            </td>
                                            <td data-label="Phone">{item.Phone || 'N/A'}</td>
                                            <td data-label="User Code">
                                                <span className="user-code">{item.UserCode}</span>
                                            </td>
                                            <td data-label="Role">
                                                <span className={`role-badge ${item.role === 'admin' ? 'admin' : 'user'}`}>
                                                    {item.role === 'admin' ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                    
                    <div className="page-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={`page-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserTable
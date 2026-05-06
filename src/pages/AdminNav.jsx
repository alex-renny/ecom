import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminNav.css'

import AdminProduct from './AdminProduct'


function AdminNav() {
    const navigate=useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem('Role')
        navigate('/Login')
        window.location.reload()

    }
  return (
    <div>
        <nav className='demo'>
            
            <div className="nav-links" style={{alignItems:'center'}}>
                <a href='/Admin'>Dashboard</a>
                <a href='/UserTable'>Users</a>
                <a href='/AdminProduct'>Products</a>
                <a href='/P-List'>P_List</a>
                <a href='/AdminOrder'>Orders</a>
                <button className='logout-btn' onClick={handleLogout}> LogOut</button>
            </div>

        </nav>
    </div>
  )
}

export default AdminNav
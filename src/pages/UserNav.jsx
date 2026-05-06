import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Reg.css'

function UserNav() {
    const navigate=useNavigate()

    const handlelogout=()=>{
    localStorage.removeItem('Role')
    localStorage.removeItem('loggeduser')
    navigate('/Login')
    window.location.reload()

    }
  return (
    <div>
        <nav className='demo'>
            <a href='/UserIndex'>Home</a>
            <a href='/UserProduct'>Products</a>
            <a href='/Cart'>Cart</a>
            <a href='/MyOrder'>MyOrders</a>
            <button className='logout-btn' onClick={handlelogout}> LogOut</button>

        </nav>
    </div>
  )
}

export default UserNav
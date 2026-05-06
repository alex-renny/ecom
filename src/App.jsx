import React from 'react'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import UserIndex from './pages/UserIndex'
import Admin from './pages/Admin'

import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Protect from './pages/Protect'

import UserNav from './pages/UserNav'
import AdminNav from './pages/AdminNav'
import Nav from './pages/Nav'
import AdminProduct from './pages/AdminProduct'
import UserTable from './pages/UserTable'
import P_List from './pages/P-List'
import UserProduct from './pages/UserProduct'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyOrder from './pages/MyOrder'
import AdminOrder from './pages/AdminOrder'

function App() {
  let role=localStorage.getItem('Role')
  return (
    <div>
      
      <BrowserRouter>

      {
        role==='Admin' ? <AdminNav/> : role==='User' ? <UserNav/> : <Nav/>
      }
      

            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/Register' element={<Register/>}/>
              <Route path='/Login' element={<Login/>}/>

              <Route path='/UserIndex' element={<Protect> <UserIndex/> </Protect>}/>
              <Route path='/Admin' element={<Admin/>}/>
              <Route path='/AdminProduct' element={<AdminProduct/>} />
              <Route path='/UserTable' element={<UserTable/>} />
              <Route path='/P-List' element={<P_List/>}/>
              <Route path='/UserProduct' element={<UserProduct/>}/>
              <Route path='/Cart' element={<Cart/>}/>
              <Route path='/Checkout' element={<Checkout/>}/>
              <Route path='/MyOrder' element={<MyOrder/>}/>
              <Route path='/AdminOrder' element={<AdminOrder/>}/>
            </Routes>
        
      </BrowserRouter>

    </div>
    
  )
}

export default App
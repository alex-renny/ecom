import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import './Reg.css'

function Register() {
  const[user,setUser]=useState({UserName:'',Email:'',Password:'',Phone:'',UserCode:''})

  const navigate=useNavigate()

  const handlechange=(e)=>{
    setUser({
      ...user,[e.target.name]:e.target.value
    })
  }

  const handlesubmit=()=>{
    if(!user.Email && !user.Password && !user.Phone && !user.UserCode && !user.UserName){
      alert('All Fields Are Required')
      return
    }
    

    let userD=JSON.parse(localStorage.getItem('User'))||[]

    const exist=userD.find(i=>i.Email===user.Email && i.UserCode===user.UserCode)

    if(exist){
      alert('User Already Exist with Same Email or UserCode')
      return
    }
    userD.push(user)
    localStorage.setItem('User',JSON.stringify(userD))
    alert('Registration Complete')
    navigate('/Login')

  }
  return (
  <div className="register-page">
    
    <img className="bg-image" src="/Gemini_Generated_Image_ltl3d6ltl3d6ltl3-Photoroom-Photoroom-Photoroom.png" alt="bg"/>

    <div className="overlay"></div>

    <div className="register-container">
      <h2 className='Hed'>Register Page</h2>

      <div className="form-group">
        <label>UserName:</label>
        <input className='Reg' type='text' placeholder='Enter UserName' name='UserName' onChange={handlechange}/>
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input className='Reg' type='email' placeholder='Enter Email' name='Email' onChange={handlechange}/>
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input className='Reg' type='password' placeholder='Enter Password' name='Password' onChange={handlechange}/>
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input className='Reg' type='number' placeholder='Enter Phone' name='Phone' onChange={handlechange}/>
      </div>

      <div className="form-group">
        <label>UserCode:</label>
        <input className='Reg' type='text' placeholder='Enter UserCode' name='UserCode' onChange={handlechange}/>
      </div>

      <button onClick={handlesubmit} className='btn'>Submit</button>
    </div>

  </div>
)
}

export default Register




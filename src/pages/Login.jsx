import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

function Login() {

    const navigate=useNavigate(localStorage.getItem('User'))

    const[user,setUser]=useState({Email:'',Password:''})

    const handledata=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        })

    }
    const Handlelogin=()=>{
        const AdminMail='admin@gmail.com'
        const AdminPw='1234'

            if(!user.Email && !user.Password){
                alert('Both fields required')
                return
            }

            if (user.Email===AdminMail && user.Password===AdminPw){
                localStorage.setItem('Role','Admin')
                alert('Admin Login Successful')
                    navigate('/Admin')
                window.location.reload()

                    return
            }

            let userD=JSON.parse(localStorage.getItem('User'))

            const exist=userD.find(i=>i.Email===user.Email && i.Password===user.Password)

            if(exist){

                localStorage.setItem('loggeduser',JSON.stringify(user))
                localStorage.setItem('Role','User')

                alert('Login Successful')
                navigate('/UserIndex')
                window.location.reload()


                return
            }else{
                alert('Account not found')
                navigate('/Register')
            }

        }
  return (
  <div className="register-page">

    <img className="bg-image" src="/Gemini_Generated_Image_ltl3d6ltl3d6ltl3-Photoroom-Photoroom-Photoroom.png" alt="Login Background"/>

    <div className="overlay"></div>

    <div className="register-container">

      <h2 className='Hed'>Login</h2>

      <div className='form-group'>

        <label>E-mail:</label>
        <input className='Reg' type='email' placeholder='Enter Your E-mail' name='Email' onChange={handledata}/>

      </div>

      <div className='form-group'>

        <label>Password:</label>
        <input className='Reg' type='password' placeholder='Enter Password' name='Password' onChange={handledata}/>

      </div>

      <button className='btn' onClick={Handlelogin}>
        Login
      </button>

    </div>

  </div>
)
}

export default Login
import React,{useState,useEffect} from 'react'

function Admins() {
    const[user,setUser]=useState([])
    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('User'))||[]
        setUser(data)
    },[])
  return (
    <div>
        <h2>Admins Home</h2>
    </div>
    
  )
}

export default Admins

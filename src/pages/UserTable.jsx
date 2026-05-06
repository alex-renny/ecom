import React,{useState,useEffect} from 'react'
import './UserTable.css'

function UserTable() {
    const[user,setUser]=useState([])
        useEffect(()=>{
            let data=JSON.parse(localStorage.getItem('User'))||[];
            setUser(data)
        },[])
    
 return (
  <div className="user-table-container">
    <h2 className="table-title">User Details</h2>

    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>User Code</th>
          </tr>
        </thead>

        <tbody>
          {user.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No Users Found</td>
            </tr>
          ) : (
            user.map((item, index) => (
              <tr key={index}>
                <td data-label="Name">{item.UserName}</td>
                <td data-label="Email">{item.Email}</td>
                <td data-label="Password">{item.Password}</td>
                <td data-label="Phone">{item.Phone}</td>
                <td data-label="User Code">{item.UserCode}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)
}

export default UserTable
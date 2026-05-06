import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'



function Home() {

  const navigate = useNavigate()

  const pageredirect  = ()=>{
    navigate('/Login')
  }
  
  return (
    <div className="home-container">
      
      <div className="home-card">
        
        <div className="home-text">
          <h2>Welcome to <span>FACINOVA</span></h2>

          <p>A refined shopping experience where quality meets style.</p>

          <button onClick={pageredirect} className="home-btn">Shop</button>
        </div>

        <div className="home-image">
          <img src="/4bc5a864bc7cb0cffbee7b40e28f7c02.png" alt="Registration" />
        </div>

      </div>

    </div>
  )
}

export default Home
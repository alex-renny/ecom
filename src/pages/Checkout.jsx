import React,{useState,useEffect} from 'react'
import './Checkout.css'

function Checkout() {
    const[cartitems,setCartitems]=useState([])

        const user  = JSON.parse(localStorage.getItem('loggeduser'))

        useEffect(()=>{
            const storedproducts=JSON.parse(localStorage.getItem('Cart')) || []
            setCartitems(storedproducts)
        },[])

        const mycart=cartitems.filter(item=>item.user===user.Email)

        const total=mycart.reduce((sum,item)=>{
            return sum+Number(item.price)
        },0)

        const handlepayment = () => {
            let allcarts = JSON.parse(localStorage.getItem('Cart')) || []
            let allorders = JSON.parse(localStorage.getItem('Orders')) || []

            const usercart = allcarts.filter(item => item.user === user.Email)
            const balancecart = allcarts.filter(item => item.user !== user.Email)

            const updatedOrders = [...allorders, ...usercart]
            localStorage.setItem('Orders', JSON.stringify(updatedOrders))

            localStorage.setItem('Cart', JSON.stringify(balancecart))

            alert('Payment Successful')
            setCartitems([])
        }
    
  return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            {mycart.length === 0 ? (
                <p className="checkout-empty">NO PRODUCTS FOUND</p>
            ) : (
                <div className="checkout-list">
                    {mycart.map((item, index) => (
                        <div className="checkout-item" key={index}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="checkout-summary">
                <p className="checkout-total">Total: ${total.toFixed(2)}</p>
                    <button className="pay-btn" onClick={handlepayment}>
                        Pay Now
                    </button>
            </div>
        </div>
  )
}

export default Checkout
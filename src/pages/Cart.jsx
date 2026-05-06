import React,{useState,useEffect} from 'react'
import './Cart.css'
import { Link, Navigate } from 'react-router-dom'

function Cart() {
    
    const[cart,setCart]=useState([])
    
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('loggeduser'))
        let data=JSON.parse(localStorage.getItem('Cart')) || []
        
        let userCart = data.filter(item => item.user === user?.Email)

        setCart(userCart)
    },[])

const removeItem=(index)=>{
    let updatedcart=[...cart]
    updatedcart.splice(index,1)

    setCart(updatedcart)
    localStorage.setItem('Cart',JSON.stringify(updatedcart))
    alert('Product Removed')

}

const total=cart.reduce((sum,item)=>{
    return sum+Number(item.price)
},0)

  return (
    <div className="cart-container">
        <h2 className='cart-heading'>My Cart</h2>
        <h3>Total Amount: ${total}</h3>
        <p>Save 40% on your purchase!</p>


    <div className="product-grid">
        {cart.map((item, index) => (

        <div className="product-card" key={index}>

            <img src={item.image} alt="Product" />

            <h3>{item.name}</h3>

            <p className="price">${item.price}</p>

            <button onClick={() => removeItem(index)}>Remove Item</button>
        </div>
        ))}
    </div>

    {/* Bottom Section */}
    <div className="cart-footer">

        <h3>Total: ${total}</h3>

        <Link to="/Checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
  </div>
</div>
  )
}

export default Cart
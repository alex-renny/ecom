import React,{useState,useEffect} from 'react'
import './UserProduct.css'

function UserProduct() {
    const[product,setProduct]=useState([])

    useEffect(() => {
    let data = JSON.parse(localStorage.getItem('Products'))

    if (!data || data.length === 0) {
        // Default products (built-in)
        const defaultProducts = [
    {
        name: "Smart Watch",
        price: 1799,
        image: "/26c7e76d05c9a6a92fe63898f3a72dc0.jpg"
    },
    {
        name: "Headphones",
        price: 1220,
        image: "/0d8c0b01a9cc6cb914035d9f1ad4206c.jpg"
    },
    {
        name: "Keyboard",
        price: 1099,
        image: "/59d27209abef2f51779cd8e4d56b2bc0.jpg"
    },
    {
        name: "Amplifier",
        price: 2120,
        image: "/0afdaedd901ba200ba2bc743826fe39b.jpg"
    },
    {
        name: "Microphone",
        price: 1200,
        image: "/493b0ef3cc78b862833466a8dcee9177.jpg"
    },
    {
        name: "Speaker",
        price: 1020,
        image: "/680c7c50b31eb8c696353913499727bf.jpg"
    },
    {
        name: "Monitor",
        price: 1000,
        image: "/dd28a7f9625c4aed8bd404292eefb993.jpg"
    },
    {
        name: "Noise EarBuds",
        price: 2220,
        image: "/e171759e7d467cdfb6d71dab95bc717d.jpg"
    },
]

        // Save to localStorage
        localStorage.setItem('Products', JSON.stringify(defaultProducts))

        // Set state
        setProduct(defaultProducts)
    } else {
        setProduct(data)
    }
}, [])

    const addtocart = (products) => {
    let user = JSON.parse(localStorage.getItem('loggeduser'))
    let cart = JSON.parse(localStorage.getItem('Cart')) || []

    let existing = cart.find(
        item => item.name === products.name && item.user === user.Email
    )

    if (existing) {
        alert('Product already in cart')
        return
    }

    let newitem = {
        ...products,
        user: user.Email
    }

    cart.push(newitem)
    localStorage.setItem('Cart', JSON.stringify(cart))
    alert('Product Added To Cart')
}
  return (
    <div className="product-grid">
        {
            product.length===0 ?(
                <p>No Product Found</p>
            ):(
                product.map((item,index)=>(

                    <div key={index} className="product-card">

                        <img src={item.image} alt="product image" />
                        
                        <h3>
                            {item.name}
                        </h3>

                        <p className="price">
                            ${item.price}
                            </p>
                        
                        <button onClick={()=>addtocart(item)}>Add to Cart</button>
                    </div>
                ))
            )
        }

    </div>
  )
}

export default UserProduct
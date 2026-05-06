import React,{useState,useEffect} from 'react'
import './AdminProduct.css'

function AdminProduct() {


    const[product,setProduct]=useState({
        name:'',
        price:'',
        image:''
    })
    const handleproduct=(e)=>{
        setProduct({
            ...product,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=()=>{
    if(!product.name && !product.price){
      alert('All Fields Are Required')
      return
    }
    

    let productsD=JSON.parse(localStorage.getItem('Products'))||[]

    const exist=productsD.find(i=>i.name===product.name)

    if(exist){
      alert('Product Already in the Cart')
      return
    }
    productsD.push(product)
    localStorage.setItem('Products',JSON.stringify(productsD))
    alert('Product Added')
    window.location.reload()

  }


  return (
    <>
        <div className="admin-product-container">
            <h2>Add Product</h2>
            <div className="admin-form-group">
                <label>Product: </label>
                <input type='text' name='name' placeholder='Enter the Product' onChange={handleproduct}/>
            </div>

            <div className="admin-form-group">
                <label>Price: </label>
                <input type='text' name='price' placeholder='Enter the Price' onChange={handleproduct}/>
            </div>
            
            <div className="admin-form-group">
                <label>Image: </label>
                <input type='text' name='image' placeholder='Enter the link of Image' onChange={handleproduct}/>
            </div>

            <button onClick={handlesubmit} className='admin-submit-btn'>Add Product</button>
        </div>
    </>
  )
}

export default AdminProduct
import React,{useState,useEffect} from 'react'
import './P-List.css'

function P_List() {

    const[items,setItems]=useState([])
          useEffect(()=>{
              let data=JSON.parse(localStorage.getItem('Products'))||[];
              setItems(data)
          },[])

    return (
  <div className="plist-container">
    <h2 className="plist-title">Product Details</h2>

    <div className="table-wrapper">
      <table className="plist-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="2" className="no-data">No Products Found</td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="price">₹{item.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)
}

export default P_List
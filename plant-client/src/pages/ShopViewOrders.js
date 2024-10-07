import React, { useEffect, useState } from 'react'
import './shopViewOrders.css'
import NavBar from '../components/Nav'
import axios from 'axios'
import Footer from '../components/Footer'

export default function ShopViewOrders() {
  const [order, setOrder] = useState([])
  console.log("state==>", order);

  try {
    useEffect(() => {
      const shopId = JSON.parse(localStorage.getItem("loginId"))
      axios.get(`http://localhost:5000/api/shop/shopView-productOrder/${shopId}`).then((res) => {
        console.log(res.data.data);
        setOrder(res.data.data)

      }).catch((error) => {
        console.log(error);

      })
    }, [])
  } catch (error) {
    console.log(error);

  }
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <NavBar /><br></br>

      <div className="order-list">
        {order.map((value,index) => (
          <div className="order-card" key={index} >
            <div className="user-details">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> {value.Name}</p>
              <p><strong>Email:</strong> {value.email}</p>
              <p><strong>Phone Number:</strong> {value.Mobile}</p>
              <p><strong>Address:</strong> {value.Address}</p>
            </div>

            <div className="product-details">
              <h3>Ordered Products</h3>

              <div className="product-card" >
                <img src={value.product_img} alt="product.name" className="product-image" />
                <div className="product-info">
                  <p><strong>Product:</strong>{ value.productName}</p>
                  <p><strong>Price:</strong> Rs:{value.price}</p>
                  <p><strong>Quantity:</strong> {value.quantity}</p>
                </div>
              </div>

              <div className="total-amount">
                <p><strong>Total Amount:</strong>Rs:{value.price*value.quantity}</p>
              </div>
            </div>
          </div>
        ))}




      </div>
      <Footer/>
    </div>
  )
}

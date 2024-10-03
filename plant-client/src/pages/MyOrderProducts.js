import React, { useEffect, useState } from 'react'
import './MyOrderProducts.css'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default function MyOrderProducts() {
  const[MyOrder,setMyOrder]=useState([])
  useEffect(()=>{
    const logid=JSON.parse(localStorage.getItem('loginId'))
    axios.get(`http://localhost:5000/api/order/myorder/${logid}`).then((res)=>{

      console.log(res);
      setMyOrder(res.data.data);

    })
  },[])
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
      <title>plant</title>
      <Nav/><br></br>
      <div className="my-orders-container text-center">
      <h1 className="my-orders-heading">My Orders</h1>
    </div><br></br>



    <div style={{ display: "grid", gap: "40px" }}>
        {MyOrder.map((value,index)=>(
          <div className="ordercards">
          <div className="ordercard red">
            <div >
              <Container>
                <Row>
                  <Col ><b><u>Product</u></b><br></br><br></br><img src={value.product_img} height={'150px'} ></img><b>Product Name:{value.productName}</b></Col>
                  <Col><b><u>Price</u></b> <br></br><br></br>{value.price}</Col>
                  <Col><b><u>category</u></b> <br></br><br></br> {value.category}</Col>
                  {/* <Col><b>status</b> <br></br><br></br>3 of 3 sdfguhi </Col> */}
                  <Col><b><u>Quantity</u></b> <br></br><br></br>  {value.quantity} </Col>
                  <Col><b><u>Total Price</u></b> <br></br><br></br>  {value.price*value.quantity} </Col>
                
                </Row>


              </Container>


            </div>
          </div>

        </div>

        ))}
         

        
        
      </div><br></br>


      



      <Footer/>
    </div>
  )
}

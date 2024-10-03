import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import './cart.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate=useNavigate()
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [ViewCart, setViewCart] = useState([])
  useEffect(() => {
    const logid=JSON.parse(localStorage.getItem('loginId'))
 
    
    axios.get(`http://localhost:5000/api/cart/view_cart/${logid}`).then((res) => {
      console.log(res.data.data);
      setViewCart(res.data.data)

    })
  }, [])
  useEffect(() => {
    console.log('ViewCart==>',ViewCart);
    
    const subTotalCalc = ViewCart.filter((data)=>{return data.status==='In Cart'}).reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountCalc = subTotalCalc > 1000 ? 100 : 50; // Example: If subtotal > 1000, discount is 100, else 50
    const totalCalc = subTotalCalc - discountCalc;

    setSubtotal(subTotalCalc);
    setDiscount(discountCalc);
    setCartTotal(totalCalc);
    localStorage.setItem('totalCart',cartTotal)
  }, [ViewCart]);
  const decrement = (_id) => {
    axios.post(`http://localhost:5000/api/cart/quantity-decrement/${_id}`, ViewCart).then((res) => {
      console.log(res.data.message);
      const decrementFilter = ViewCart.filter((value) => {
        if (value._id == _id) {
          value.quantity = value.quantity - 1
        }
        return value
      })
      setViewCart(decrementFilter)

    })
  }
  const increment = (_id) => {
    axios.post(`http://localhost:5000/api/cart/quantity-increment/${_id}`, ViewCart).then((res) => {
      console.log(res.data.message);
      const dataFilter = ViewCart.filter((value) => {
        if (value._id == _id) {
          value.quantity = value.quantity + 1
        }
        return value
      })
      setViewCart(dataFilter)
    })
  }
  const cartDelete = (_id) => {
    axios.post(`http://localhost:5000/api/cart/delete-cart/${_id}`, ViewCart).then((res) => {
      console.log(res.data.message);
      toast.success(res.data.message)
      const deleteCart = ViewCart.filter((value) => {
        return value._id != _id// check alreday ulla  data is equal or not reject button click chyumbol nadakkunnath


      })
      setViewCart(deleteCart)

    })
  }
  const checkOut=()=>{
    // const _id=JSON.parse(localStorage.getItem('loginId'))
    // axios.post(`http://localhost:5000/api/cart/status-update/${_id}`,ViewCart).then((res)=>{
    //   console.log(res.data.message);
    //   const dataFilter=ViewCart.filter((value)=>{
    //     return value.user_loginId!=_id
    //   })
    //   setViewCart(dataFilter)
    //   toast.success(res.data.message)
      
    // })
    navigate('/payment');  
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
      <title>plant</title>
      <Nav /><br></br><br></br>
      {/* <div style={{backgroundColor:"gray",boxShadow:"1px 1px 1px black",width:"80%",textAlign:"center",marginLeft:"150px",justifyContent:"space-between",display:"flex",gap:"10px"}}>
      <Container>
        <Row>
        <Col><h6><b>Product </b></h6></Col>
        <Col ><h6><b>Price</b></h6> </Col>
        <Col><h6><b>Quantity</b></h6> </Col>
        <Col><h6><b>Total Price</b></h6></Col>
      </Row>
      </Container>
      </div><br></br>
      <div  className='cart1' style={{backgroundColor:"rgb(173, 173, 189)",height:"500%",width:"80%",textAlign:"center",marginLeft:"150px"}}>
     
      
      </div> */}
      <Toaster />
      <h3 style={{ textAlign: "center", fontFamily: "cursive" }}><b>Shopping Cart</b></h3>
      <br></br>
      <div style={{ display: "grid", gap: "40px" }}>
        {ViewCart.filter((data)=>{return data.status==='In Cart'}).map((value, index) => (
          <div className="cards">
            <div className="card red">
              <div >
                <Container>
                  <Row>
                    <Col ><b><u>Product</u></b><br></br><br></br><img src={value.product_img} height={'150px'} ></img><b>Product Name:{value.productName}</b></Col>
                    <Col><b><u>Price</u></b> <br></br><br></br>{value.price}</Col>
                    <Col><b><u>category</u></b> <br></br><br></br>{value.category} </Col>
                    {/* <Col><b>status</b> <br></br><br></br>3 of 3 sdfguhi </Col> */}
                    <Col><b><u>Quantity</u></b> <br></br><br></br>  <ButtonGroup aria-label="Basic example">
                      <Button variant="secondary" onClick={() => {
                        decrement(value._id)
                      }}><i class="fa-solid fa-minus"></i></Button>
                      <Button variant="secondary">{value.quantity}</Button>
                      <Button variant="secondary" onClick={() => {
                        increment(value._id)
                      }}><i class="fa-solid fa-plus"></i></Button>
                    </ButtonGroup> </Col>
                    <Col><b><u>Total price</u></b> <br></br><br></br><p>Rs.{value.price * value.quantity}</p> </Col>
                    <Col>
                      <br></br><br />
                      <button class="buttonDelete" onClick={() => {
                        cartDelete(value._id)
                      }}>
                        <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                      </button></Col>
                  </Row>


                </Container>


              </div>
            </div>

          </div>

        ))}
        
      </div><br></br>
      <div class="card-cart">
          <div class="card-details">
            <p class="text-title">Cart Total</p>
            <p class="text-body"><b>SubTotal:</b><b>Rs.{subtotal}</b></p>
            <p class="text-body"><b>Discount:</b><b>Rs.{discount}</b></p>
            <p class="text-body"><b>Cart Total:</b><b>Rs.{cartTotal}</b></p>
          </div>
          <button class="cart-button" onClick={checkOut} >CheckOut</button>
        </div>
    </div>
  )
}

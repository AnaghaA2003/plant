import React from 'react'
import './shopViewOrders.css'
import NavBar from '../components/Nav'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ShopViewOrders() {
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
      <NavBar/><br></br>

      <div className='orderView' >
      <Container >
{/* <Row>
<Col>1 of 2</Col>

</Row><br></br> */}
      <Row>
      <Col className='orderbg'> <img src='/img/outbg.avif' height={"50%"}></img>

      <span>productName</span><br></br>
      <span>description</span><br></br>
      <span>price</span><br></br>
      <span>quantity</span>
      </Col>
      
        <Col>
        <span>UserName</span><br></br>
        <span>Address</span><br></br>
        <span>Mobile</span><br></br>
        </Col>
      </Row>
     
      </Container>


      </div>
    </div>
  )
}

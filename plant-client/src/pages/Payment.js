import React from 'react'

import './payment.css'

// import CreditCard from '../components/CreditCard';
import UpiPayment from '../components/UpiPayment';


export default function Payment() {
  const total=localStorage.getItem('totalCart')
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
      <div className='buy'>
      <div className='payment'>
            <div className="paymentCard">
              <div className="paymentTitle">
                <p className="paymentHead"><b>PAYING</b> <span style={{ color: "green" }}><b>PLANT</b></span></p>
                <p className="desc"><b>Amount <br></br><span style={{ fontSize: "20px", color: "brown" }}>Rs.{total}</span></b></p>
              </div>
              <div className="wrapper">
                <div className="color black">
                  <b style={{ textAlign: "center" }}> Payment Options</b>
                  {/* <span className="hex">#000000</span> */}
                </div>
                <div className="color eerie-black">
                  <i class="fa-solid fa-credit-card"  ></i>Cards
                  <span className="hex"></span>
                </div>

                <div className="color night-rider">
                  <i class="fa-brands fa-google-pay"></i> UPI
                  <span className="hex"></span>
                </div>
                <div className="color chinese-black">
                  <img height={"20px"}></img>Cash On Delivery
                  <span className="hex"></span>
                </div>

              </div>
            </div>


         
          
          </div>

       <div className='payment'> 
          <UpiPayment />
       </div>
         
         {/* <Col>
        <CreditCard />
       </Col> */}
      
     
     
    </div>
     





      {/* upi */ }








    </div >
  )
}

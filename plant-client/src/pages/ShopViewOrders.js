import React from 'react'
import './shopViewOrders.css'
import NavBar from '../components/Nav'

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
      <NavBar/>
      <div className='order'>
 
  <div className="orderCard">
   
    <div className="orderCard__image"> <img src='/img/bg-3.jpg'></img></div>
    <div className="orderCard__content">
      <p className="orderCard__title">Card Title</p>
      <p className="orderCard__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <a className="orderCard__button" href="#">
        Read More
      </a>
    </div>
  </div>
</div>


    </div>
  )
}

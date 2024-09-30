import React, { useState } from 'react'
import './creditCard.css'

export default function CreditCard() {
  const[input,setInput]=useState({
    cardNumber:'',
    name:'',
    month:'',
    year:'',
    cw:'',
  })
  const [error,setError]=useState({})
  const inputChange=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setInput({...input,[name]:value})
  }
  // const submit=(event)=>{
  //   event.preventDefault()

  // }

  // const validationError=()=>{
  //   const errorMessage={};
  //   if(!input.cardNumber.trim()){
  //     errorMessage.
  //   }
  // }
  return (
    <div>
        
      <>

 
  <form className="paymentform">
    <header>
      Credit card information
      <span className="message">Fill the form to continue.</span>
    </header>
    <label>
      <span>Card Number</span>
      <input
        placeholder="Type your card number"
        className="input"
        type="number"
        required=""
      />
    </label>
    <label>
      <span>Name on card</span>
      <input
        placeholder="Type your name as appear on card"
        className="input"
        type="text"
        required=""
      />
    </label>
    <fieldset>
      <label className="sm">
        <span>Exp. Month</span>
        <div className="custom-select">
          <select className="input" type="select" required="">
            <option />
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>Dicember</option>
          </select>
        </div>
      </label>
      <label className="sm">
        <span>Exp. Year </span>
        <div className="custom-select">
          <select className="input" type="select" required="">
            <option />
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </div>
      </label>
      <label className="sm">
        <span>CW </span>
        <input
          className="input"
          placeholder={1234}
          size={4}
          maxLength={4}
          type="text"
          required=""
        />
      </label>
    </fieldset>
    <div className="submitCard">
      <button>Complete payment</button>
    </div>
  </form>
</>

    </div>
  )
}

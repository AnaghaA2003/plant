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
  console.log("input==>",input);

  const [error,setError]=useState({})
  const inputChange=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setInput({...input,[name]:value})
  }
  const submit=(event)=>{
    event.preventDefault()
    if (!validationError()) {
      console.log('error');
      return;

    }
    const data = new FormData();
    data.append('cardName', input.cardName)
    data.append('name', input.name)
    data.append('month', input.month)
    data.append('year', input.year)
    data.append('cw', input.cw)

  
   
    
  }

  const validationError=()=>{
    const errorMessage={};
    if(!input.cardNumber.trim()){
      errorMessage.cardNumber='card number is required'
    }
    else if(input.cardNumber.trim()<=16){
      errorMessage.cardNumber='card number must be 16 digits'

    }
    if(!input.name.trim()){
      errorMessage.name='Name is required'
    }
    if(!input.year.trim()){
      errorMessage.year='year is required'
    }
    if(!input.month.trim()){
      errorMessage.month='month is required'
    }
    if(!input.cw.trim()){
      errorMessage.cw='cw is required'
    }
    setError(errorMessage);//push error message into error state
    return Object.keys(errorMessage).length === 0;
  }
  return (
    <div>
        
      <>

 
  <form className="paymentform">
    <header>
      Credit card information
      <span className="message">Fill the form to continue.</span>
    </header>
    <label>
      <span style={{color:"red"}}>{error.cardNumber}</span>
    
      <span>Card Number</span>
      <input
        placeholder="Type your card number"
        className="input"
        type="number"
        required=""
        onChange={inputChange}
        name='cardNumber'
        
      />
    </label>
    <label>
    <span style={{color:"red"}}>{error.name}</span>
      <span>Name on card</span>
      <input
        placeholder="Type your name as appear on card"
        className="input"
        type="text"
        required=""
        onChange={inputChange}
        name='name'
      />
    </label>
    <fieldset>
      <label className="sm">
      <span style={{color:"red"}}>{error.month}</span>
        <span>Exp. Month</span>
        <div className="custom-select">
          <select className="input" type="select" required="" onChange={inputChange} name='month'>
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
      <span style={{color:"red"}}>{error.year}</span>
        <span>Exp. Year </span>
        <div className="custom-select">
          <select className="input" type="select" required="" onChange={inputChange} name='year'>
            <option />
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </div>
      </label>
      <label className="sm">
      <span style={{color:"red"}}>{error.cw}</span>
        <span>CW </span>
        <input
          className="input"
          placeholder={1234}
          size={4}
          maxLength={4}
          type="text"
          required=""
          onChange={inputChange}
          name='cw'
        />
      </label>
    </fieldset>
    <div className="submitCard">
      <button  onClick={submit}>Complete payment</button>
    </div>
  </form>
</>

    </div>
  )
}

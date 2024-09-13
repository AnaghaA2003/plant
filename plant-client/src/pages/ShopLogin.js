import React, { useState } from 'react'
import './shopLogin.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function ShopLogin() {
  const [input, setInput] = useState({
    shopName: '',
    password: '',
    email: '',
    Address: '',
    Mobile: '',
    shop_img: ''

  })
  console.log("input==>",input);
  
  const [error, setError] = useState({})
  // console.log("error", error);
  const inputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInput({ ...input, [name]: value })

  }
  const submit = (event) => {
    event.preventDefault()

    if (!validationError()) {
      console.log('error');
      return;

    }

    const data = new FormData();
    data.append('shopName', input.shopName)
    data.append('password', input.password)
    data.append('email', input.email)
    data.append('Address', input.Address)
    data.append('Mobile', input.Mobile)
    data.append('shop_img', input.shop_img)
    axios.post('http://localhost:5000/api/auth/shop-registration', data).then((res) => {
      console.log(res.data.message);
      toast.success(res.data.message)

    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message)

    })
  }
  const validationError = () => {
    const errorMessage = {}
    const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
    const emailRegex = /^\S+@\S+\.\S+$/

    if (!input.shopName.trim()) {
      errorMessage.shopName = "ShopName is required"
    }
    if (!input.email.trim()) {
      errorMessage.email = 'Email is required'
    }
    else if (!emailRegex.test(input.email)) {
      errorMessage.email = "Invalid email Address"
    }
    if (!input.password.trim()) {
      errorMessage.password = "Password is required"
    }
    if (!input.shop_img) {
      errorMessage.shop_img = "shop_img is required"
    }
    if (!input.Address.trim()) {
      errorMessage.Address = "Address is required"
    }
    if (!input.Mobile.trim()) {
      errorMessage.Mobile = "Phone number is required"
    }
    else if (!phoneRegex.test(input.Mobile)) {
      errorMessage.Mobile = "Invalid Phone number"
    }
    else if (+input.Mobile.length < 10 || +input.Mobile.length > 10) {
      errorMessage.Mobile = "Phone number must have 10 digits"
    }


    setError(errorMessage);//push error message into error state
    return Object.keys(errorMessage).length === 0;
  }

  return (
    <div>
      <div className='shop'>
        <h3 className='hd'>REGISTRATION FORM</h3><br></br><br></br>
        <div className='reg'>
          <Toaster />
          <div className='span'><span>{error.shop_img}</span></div>

          <input class="form-control" 
          type="file" 
          name='shop_img' 
          id="formFileMultiple" 
          multiple style={{ width: "99.9%", borderRadius: "10px" }} 
          onChange={(e) => { console.log(e.target.files); 
          setInput({ ...input, shop_img: e.target.files[0] }) }} /><br></br>
          {/* </div> */}
          <div className='span'><span>{error.shopName}</span></div><br />
          <input type='text' name='shopName' placeholder='Shop Name' className='shopName' onChange={inputChange} /><br /><br />
          <div className='span'><span>{error.email}</span></div><br />
          <input type='email' name='email' placeholder='Email Address' className='emailAddress' onChange={inputChange} /><br /><br />
          <div className='span'> <span>{error.password}</span></div><br />
          <input type='password' name='password' placeholder='Password' className='pass1' onChange={inputChange} /><br /><br />
          <div className='span'> <span>{error.Address}</span></div><br />
          <input type='text area' name='Address' placeholder='Address' className='address' onChange={inputChange} /><br /><br />
          <div className='span'> <span>{error.Mobile}</span></div><br />
          <input type='text' name='Mobile' placeholder='Phone Number' className='phone' onChange={inputChange} /><br /><br />
          <button className='buttn' onClick={submit}>Submit</button><br /><br />
          <div className='hr'>
            <b> Alreday have an account?<a href='/login'>Sign In</a></b>
          </div>

        </div>
      </div>
    </div>
  )
}

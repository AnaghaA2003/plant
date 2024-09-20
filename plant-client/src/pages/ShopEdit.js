import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function ShopEdit() {
  const [input, setInput] = useState({
    shopName: '',
    password: '',
    email: '',
    Address: '',
    Mobile: '',
    shop_img: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [error, setError] = useState({});
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/shop/single-shopView/${id}`)
      .then((res) => {
        setInput(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to load shop data.');
      });
  }, [id]);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };
  console.log("input==>",input);

  const submit = (event) => {
    event.preventDefault();
    
    if (!validationError()) {
      console.log('Validation errors found');
      return;
    }

    
    const data = new FormData();
    data.append('shopName', input.shopName);
    data.append('password', input.password);
    data.append('email', input.email);
    data.append('Address', input.Address);
    data.append('Mobile', input.Mobile);
    data.append('shop_img', input.shop_img);

    axios.post(`http://localhost:5000/api/shop/profile-edit/${id}`, data)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/');
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || 'Failed to update shop data.');
      });
  };

  const validationError = () => {
    const errorMessage = {};
    const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!input.shopName?.trim()) {
      errorMessage.shopName = "Shop Name is required";
    }
    if (!input.loginId.email?.trim()) {
      errorMessage.email = 'Email is required';
    } else if (!emailRegex.test(input.loginId.email)) {
      errorMessage.email = "Invalid email address";
    }
    if (!input.loginId.password?.trim()) {
      errorMessage.password = "Password is required";
    }
    if (!input.shop_img) {
      errorMessage.shop_img = "Shop image is required";
    }
    if (!input.Address?.trim()) {
      errorMessage.Address = "Address is required";
    }
    if (!input.Mobile?.trim()) {
      errorMessage.Mobile = "Phone number is required";
    } else if (!phoneRegex.test(input.Mobile)) {
      errorMessage.Mobile = "Invalid phone number";
    } else if (input.Mobile.length !== 10) {
      errorMessage.Mobile = "Phone number must have 10 digits";
    }

    setError(errorMessage);
    return Object.keys(errorMessage).length === 0;
  };

  return (
    <div>
      <div className='shop'>
        <h3 className='hd'>REGISTRATION FORM</h3>
        <div className='reg'>
          <Toaster />
          
          <div className='span'><span>{error.shop_img}</span></div>
          <img src={input.shop_img} alt="Shop" width={"90px"} height={"70px"} style={{ paddingBottom: "20px" }} />
          
          <input 
            className="form-control" 
            type="file" 
            name="shop_img" 
            id="formFileMultiple" 
            style={{ width: "99.9%", borderRadius: "10px" }} 
            onChange={(e) => setInput({ ...input, shop_img: e.target.files[0] })} 
          /><br/>
          
          <div className='span'><span>{error.shopName}</span></div><br/>
          <input 
            type="text" 
            name="shopName" 
            placeholder="Shop Name" 
            className="shopName" 
            value={input.shopName} 
            onChange={inputChange} 
          /><br/><br/>
          
          <div className='span'><span>{error.email}</span></div><br/>
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            className="emailAddress" 
            value={input.loginId?.email} 
            onChange={inputChange} 
          /><br/><br/>
          
          <div className='span'><span>{error.password}</span></div><br/>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="pass1" 
            value={input.loginId?.password} 
            onChange={inputChange} 
          /><br/><br/>
          
          <div className='span'><span>{error.Address}</span></div><br/>
          <input 
            type="text" 
            name="Address" 
            placeholder="Address" 
            className="address" 
            value={input.Address} 
            onChange={inputChange} 
          /><br/><br/>
          
          <div className='span'><span>{error.Mobile}</span></div><br/>
          <input 
            type="text" 
            name="Mobile" 
            placeholder="Phone Number" 
            className="phone" 
            value={input.Mobile} 
            onChange={inputChange} 
          /><br/><br/>
          
          <button className="buttn" onClick={submit}>Submit</button><br/><br/>
        </div>
      </div>
    </div>
  );
}

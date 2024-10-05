import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


export default function UserEdit() {
    const [input, setInput] = useState({
        Name: '',
        Age: '',
        Mobile: '',
        email: '',
        password: '',
        Address: '',
        user_img: ''

    })
  const { id } = useParams();
const navigate=useNavigate()

   
    const [error, setError] = useState({})
    useEffect(()=>{
        const token=localStorage.getItem('token')
        axios.get(`http://localhost:5000/api/user/profile-view/`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res) => {
          setInput(res.data.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Failed to load shop data.');
        });
    },[])
    const inputChange = (event) => {
        event.preventDefault()

        const name = event.target.name
        const value = event.target.value
        setInput({ ...input, [name]: value })
    }
    const submit = (event) => {
        if (!validationError()) {
            console.log('error');
            return;

        }
    

        const data = new FormData();
        data.append('Name', input.Name)
        data.append('password', input.password)
        data.append('email', input.email)
        data.append('Age', input.Age)
        data.append('Mobile', input.Mobile)
        data.append('Address', input.Address)
        data.append('user_img', input.user_img)

        axios.post(`http://localhost:5000/api/user/profile-edit/${id}`, data).then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/userOwnprofile');
              }, 2000);

        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.message)



        })
    }
    const validationError = () => {
        const errorMessage = {}
        const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
        const emailRegex = /^\S+@\S+\.\S+$/
        if (!input.Name) {
            errorMessage.Name = "User name is required"
        }
        if (!input.user_img) {
            errorMessage.user_img = "User image is required"
        }
        if (!input.Age) {
            errorMessage.Age = "Age is required"
        }
        if (!input.Mobile) {
            errorMessage.Mobile = "Phone number is required"
        }
        else if (!phoneRegex.test(input.Mobile)) {
            errorMessage.Mobile = 'Invalid phone number'
        }
        else if (+input.Mobile.length < 10 || +input.Mobile.length > 10) {
            errorMessage.Mobile = "Phone number must have 10 digits"
        }
        if (!input?.loginId?.email) {
            errorMessage.email = "Email is required"
        }
        else if (!emailRegex.test(input.loginId.email)) {
            errorMessage.email = "Invalid email address"
        }
        if (!input.loginId.password) {
            errorMessage.password = "password is required"
        }
        if (!input.Address) {
            errorMessage.Address = "Address is required"
        }
        setError(errorMessage);
        return Object.keys(errorMessage).length === 0
    }
    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                crossOrigin="anonymous"
            />
            <Toaster/>
            <div className="container">
                <div className="row register-row">

                    <div className="col-lg-6 col-md-6 col-sm-12 col-one"></div> {/* Responsive column */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-two">
                        <h3 className='head'>REGISTRATION FORM</h3>
                        <form>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className='span'><span>{error.Name}</span></div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                                        name="Name"
                                        value={input.Name}
                                        onChange={inputChange}
                                    />
                                </div><br></br>
                                <div className="col-md-6 col-sm-12">
                                    <div className='span'><span>{error.Age}</span></div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Age"
                                        name="Age"
                                        value={input.Age}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className='span'><span>{error.Mobile}</span></div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        name="Mobile"
                                        value={input.Mobile}
                                        onChange={inputChange}
                                    />
                                </div><br></br>
                                <div className="col-md-12">
                                    <div className='span'><span>{error.user_img}</span></div>
          <img src={input.user_img} alt="Shop" width={"90px"} height={"70px"} style={{ paddingBottom: "20px" }} />

                                    <input
                                        className="form-control"
                                        type="file"
                                        name="shop_img"
                                        
                                        multiple
                                        onChange={(e) => setInput({ ...input, user_img: e.target.files[0] })}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className='span'><span>{error.email}</span></div>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email Address"
                                        name="email"
                                        value={input?.loginId?.email}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className='span'><span>{error.password}</span></div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={input?.loginId?.password}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className='span'><span>{error.Address}</span></div>
                                    <textarea
                                        className="form-control"
                                        placeholder="Address"
                                        name="Address"
                                        value={input.Address}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="col-md-12 text-center">
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={submit}
                                        style={{ width: "100%", maxWidth: "200px" }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* <div className='para'>
                            <p>Already have an account? <a href='/login'>Sign In</a></p>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

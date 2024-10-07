import React, { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [input, setInput] = useState({
        email: '',
        password: '',
    })//enthano check chyendath ath kodukkan
    // console.log(Object.keys(input).length===0);


    const [error, setError] = useState({})
    const navigate = useNavigate()

    console.log(error);

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
        axios.post('http://localhost:5000/api/auth/login-check', input).then((res) => {
            console.log(res.data);
            toast.success(res.data.message)
            localStorage.setItem('loginId', JSON.stringify(res.data.data._id))
            localStorage.setItem('emailId', JSON.stringify(res.data.data.email))
            localStorage.setItem('password', JSON.stringify(res.data.data.password))
            localStorage.setItem('role', JSON.stringify(res.data.data.role))
            localStorage.setItem('token',(res.data.token))

            navigate('/')
        }).catch((error) => {
            console.log(error.response.data.message);
            // console.log(error.res.data.message);
            toast.error(error.response.data.message)

        })
    }
    const validationError = () => {
        const errorMessage = {};
        if (!input.email.trim()) {//trim use chynnath white space ozhivakkan ann
            errorMessage.email = "Email is required"

        } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {//reqular expression test chyaa
            errorMessage.email = "Invalid email address"

        }
        if (!input.password.trim()) {
            errorMessage.password = "Password is required"
        }
        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                crossOrigin="anonymous"
            />
            <Toaster />

            <div className='border'>
                <div className="form login-form">
                    <h1 style={{ color: "white" }}>Login In</h1>
                    <div className='span'><span>{error.email}</span></div>

                    <input type="text" className="input" placeholder="Enter your email" name='email' onChange={inputChange} />
                    <div className='span'><span>{error.password}</span></div>

                    <input type="password" className="input" placeholder="*********" name='password' onChange={inputChange} /><br />
                    <button className='login-butn' onClick={submit}>Submit</button><br></br>
                    <div className="foot-lnk" style={{ display: "flex", justifyContent: "space-around" }}>
                        <div><a href="/forgotPassword" className='forget'>Forgot Password?</a></div>
                        <div style={{ display: "grid" }}> Don't have an account yet?
                            <Link to="/userRegistration" className='forget' >
                                Create User Account
                            </Link>
                            <Link to="/shopRegistration"  className='forget'>
                                Create Shop Account
                            </Link>
                        </div>

                        {/* <div className="foot-lnk">
                       
                    </div> */}
                    </div>



                </div>
            </div>
        </div>

    )
}

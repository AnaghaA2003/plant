import React, { useState } from 'react'
import './newPassword.css'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';


export default function SetNewPassword() {
  const [input, setInput] = useState({
    Newpassword: '',
    Confirmpassword: ''
  })

  console.log("state==>", input);

  const [error, setError] = useState({})
  const navigate = useNavigate()
  const inputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInput({ ...input, [name]: value })
}

const validationError = () => {
  const errorMessage = {};


  if (!input.Newpassword.trim()) {
    errorMessage.Newpassword = "Password is required"
  } else if (input.Newpassword.length < 8) {
    errorMessage.Newpassword = 'Password must be at least 8 characters'
  }
  if (!input.Confirmpassword.trim()) {
    errorMessage.Confirmpassword = 'Confirm Password is required'
  } else if (input.Confirmpassword.length < 8) {
    errorMessage.Confirmpassword = 'Password must be at least 8 characters'
  }
  setError(errorMessage);
  return Object.keys(errorMessage).length === 0;
}


  const submit = (event) => {
    event.preventDefault()
   
    if (!validationError()) {
      console.log('error');
      return;
    }
    

  if (input.Newpassword == input.Confirmpassword) {
    console.log("success");
    
    const data={
      email:localStorage.getItem('email'),
      password:input.Confirmpassword
    }
    console.log("data==>",data);
    
    axios.post(`http://localhost:5000/api/auth/password-update/`,data).then((res)=>{
      console.log(res.data.message);
      toast.success(res.data.message)
      localStorage.removeItem('email')
      localStorage.removeItem('OTP')
      
    })
    
  }else{
    console.log("failed");
    
  }
}

  const back = () => {
    navigate('/login')
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      />
      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <Navbar.Brand href="/">
        <i className="fa fa-pagelines fa-2x" style={{ color: "#1ebe96" }}> plant </i>
      </Navbar.Brand>
      <Toaster/>
      <div className="form-gap" />
      <div className="container-forgot">
        <div className="row-forgot">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3>
                    <i className="fa fa-lock fa-4x" />
                  </h3>
                  <h2 className="text-center">Set new password</h2>
                  <p>Must be at least 8 characters.</p>
                  <div className="panel-body">
                    <form
                      id="register-form"
                      role="form"
                      autoComplete="off"
                      className="form"
                      method="post"
                    >
                      <div className='span'><span>{error.Newpassword}</span></div>

                      <div className="form-group">
                        <div className="input-group">

                          <span className="input-group-addon">
                          <i class="fa fa-lock"></i>
                          </span>

                          <input
                            id="email"
                            name="Newpassword"
                            placeholder="password"
                            className="form-control"
                            type="password"
                            onChange={inputChange}
                          />
                        </div><br />
                        <div className='span'><span>{error.Confirmpassword}</span></div>

                        <div className="input-group">

                          <span className="input-group-addon">
                          <i class="fa fa-lock"></i>
                          </span>
                          <input
                            id="email"
                            name="Confirmpassword"
                            placeholder="confirm password"
                            className="form-control"
                            type="password"
                            onChange={inputChange}

                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/* <input
                        name="recover-submit"
                        className="btn btn-lg btn-primary btn-block"
                        defaultValue="Reset Password"
                        type="Reset Password"
                        placeholder='Reset Password'
                        onClick={submit}
                       
                      /> */}
                        <Button className="btn btn-lg btn-primary btn-block" onClick={submit} type="submit">Reset Password</Button>
                      </div>

                      <div onClick={back}>Back to login<br></br><i class="fa fa-arrow-left" ></i></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

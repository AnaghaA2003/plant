import React, { useState } from 'react'
import './verification.css'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


export default function Verification() {
  
  const [otp, setOtp] = useState('')
  console.log("opt==>", otp);

  const navigate = useNavigate()
  const back = () => {
    navigate('/login')
  }

  const email = (localStorage.getItem('email'))
  const OTP = (localStorage.getItem('OTP'))

  const inputChange = (event) => {
    // const name=event.target.name
    const value = event.target.value
    // setOtp({otp,[name]:value})
    setOtp(otp + value)
  }
  const submit = (event) => {
    event.preventDefault()
    console.log("state==>", otp);
    console.log("OTP==>", OTP);

    if (otp == OTP) {
      navigate('/newPassword')
      console.log('set');

    }
    else {
      console.log("OTP verification failed");
      toast.error("OTP verification failed")
    }

  }

  const resend = (event) => {
    event.preventDefault()
    const data ={
      email:localStorage.getItem('email')
    }
    axios.post(`http://localhost:5000/api/auth/email-verification`, data).then((res) => {
      console.log(res.data.message);
      toast.success(res.data.message)
      console.log("res.data.email==>", res);

    
      localStorage.setItem('OTP', (res.data.otp))
     
        navigate('/verification')

    

    }).catch((error) => {
      console.log(error.response.data.message);
      // console.log(error.res.data.message);
      toast.error(error.response.data.message)

    })
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
      <Toaster />
      <div className="form-gap" />
      <div className="container-forgot">
        <div className="row-forgot">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3>

                    <i class="fa fa-envelope fa-4x"></i>
                  </h3>
                  <h2 className="text-center">Password Reset</h2>
                  <p>Enter the code we just send on your email address<br></br>
                    <b className="text-danger">{email}</b>
                  </p>
                  <div className="panel-body">
                    <div className="d-flex flex-row mt-5" style={{ display: "flex", textAlign: "center", justifyContent: "center", flexWrap: "wrap" }}>
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} autofocus="" onChange={inputChange} />
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} onChange={inputChange} />
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} onChange={inputChange} />
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} onChange={inputChange} />
                    </div>
                    <form
                      id="register-form"
                      role="form"
                      autoComplete="off"
                      className="form"
                      method="post"
                    >
                      <br />
                      <div className="text-center mt-5">
                        <span className="d-block mobile-text">Don't receive the code?</span>
                        <span className="font-weight-bold text-danger cursor" onClick={resend}>Resend</span>
                      </div><br />
                      <div className="form-group">
                        {/* <input
                          name="recover-submit"
                          className="btn btn-lg btn-primary btn-block"
                          defaultValue="Reset Password"
                          type="submit"
                          onClick={submit}

                        /> */}
                        <Button className="btn btn-lg btn-primary btn-block" type="submit" onClick={submit}>Submit</Button>
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

    // {/* <div className="d-flex justify-content-center align-items-center container-pay">
    //   <div className="card-pay py-5 px-3">
    //     <h5 className="m-0">Mobile phone verification</h5>
    //     <span className="mobile-text">
    //       Enter the code we just send on your mobile phone{" "}
    //       <b className="text-danger">+91 86684833</b>
    //     </span>
    //     <div className="d-flex flex-row mt-5" >
    //       <input type="text" className="form-control" style={{height:"50px",width:"80px"}} autofocus="" />
    //       <input type="text" className="form-control"   style={{height:"50px",width:"80px"}} />
    //       <input type="text" className="form-control"  style={{height:"50px",width:"80px"}} />
    //       <input type="text" className="form-control"   style={{height:"50px",width:"80px"}}/>
    //     </div>
    //     <div className="text-center mt-5">
    //       <span className="d-block mobile-text">Don't receive the code?</span>
    //       <span className="font-weight-bold text-danger cursor">Resend</span>
    //     </div>
    //   </div>
    // </div> */}





  )
}

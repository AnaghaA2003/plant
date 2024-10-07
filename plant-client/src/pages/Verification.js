import React from 'react'
import './verification.css'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';


export default function Verification() {
  const navigate=useNavigate()
  const back=()=>{
    navigate('/login')
}
const submit=()=>{
  navigate('/newPassword')
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
                    <b className="text-danger">anagha@gmail.com</b>
                  </p>
                  <div className="panel-body">
                    <div className="d-flex flex-row mt-5" style={{ display: "flex", textAlign: "center", justifyContent:"center",flexWrap:"wrap"}}>
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} autofocus="" />
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} />
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} />
                      <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} />
                    </div>
                    <form
                      id="register-form"
                      role="form"
                      autoComplete="off"
                      className="form"
                      method="post"
                    >
                      <br/>
                      <div className="text-center mt-5">
                        <span className="d-block mobile-text">Don't receive the code?</span>
                        <span className="font-weight-bold text-danger cursor">Resend</span>
                      </div><br/>
                      <div className="form-group">
                        <input
                          name="recover-submit"
                          className="btn btn-lg btn-primary btn-block"
                          defaultValue="Reset Password"
                          type="submit"
                          onClick={submit}

                        />
                      </div>
                      <input
                        type="hidden"
                        className="hide"
                        name="token"
                        id="token"
                        defaultValue=""
                      />
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

import React from 'react'
import Nav from '../components/Nav'
import IndoorBenefit from '../components/IndoorBenefit'
import './homepage.css'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import OutdoorBenefits from '../components/OutdoorBenefits';
import Footer from '../components/Footer';


export default function Home() {
  const navigate = useNavigate()
  const loginRole = JSON.parse(localStorage.getItem('role'))
  const indoor = () => {
    if (loginRole == null) {
      return navigate('/login')
    } else {
      return navigate('/indoor')
    }
  }
  const outdoor = () => {
    if (loginRole == null) {
      return navigate('/login')
    } else {
      return navigate('/outdoor')
    }
  }
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
      <title>plant</title>

      <div className='home'>
        <Nav />

        <AwesomeSlider className="custom-slider">
        <div className='slider-section'>
          <div className='s-content'>
            <h1 className='hello'><b>Design Your Home <br /> Your Way</b></h1>
          </div>
          <div className='s-content2'>
            <h1>Provide Your Home & Office Space <br /> With The Right Plants And <br /> Let Our Plant Care Team Keep Them Flourishing</h1>
          </div>
          <img className='bg1' src='/img/homebg5.jpeg' alt="Background 1" />
        </div>

        <div className='slider-section'>
          <div className='s-content'>
            <h1 className='hello' style={{color: "gainsboro"}}><b>Turning Over a <br /> New Leaf</b></h1>
          </div>
          <div className='s-content2'>
            <h1>Plants are the best therapy. They require attention, patience, and nurture, and in return, they provide beauty and tranquility.</h1>
          </div>
          <img className='bg2' src='/img/homebg6.jpg' alt="Background 2" />
        </div>

        <div className='slider-section'>
          <div className='s-content'>
            <h1 className='hello' style={{color: "bisque", fontFamily: "cursive"}}><b>Love is the Flower <br /> You’ve Got to Let Grow</b></h1>
          </div>
          <div className='s-content2'>
            <h1>A garden is a way of showing that you believe in tomorrow</h1>
          </div>
          <img className='bg2' src='/img/homebg7.jpg' alt="Background 3" />
        </div>

        <div className='slider-section'>
          <div className='s-content'>
            <h1 className='hello' style={{color: "white"}}><b>The Garden is a Mirror of the Heart</b></h1>
          </div>
          <div className='s-content2'>
            <h1>Plants add life to our world, rooting us in peace and beauty</h1>
          </div>
          <img className='bg2' src='/img/homebg8.jpeg' alt="Background 4" />
        </div>
      </AwesomeSlider>

      </div><br></br>

      {/* //indoor// */}


      <h1 style={{ textAlign: "center", color: "black" }} className='col-head'>
  <b>Why we should be greening <br />our home with plants</b>
</h1>
<p style={{ textAlign: "center", fontSize: "16px" }}>
  Improved Air Quality | Enhanced Mental Health | Aesthetic Appeal | Connection to Nature | Health Benefits
</p>
<br />

<div className="container text-center card">
  <div className="row">
    <div className="col-12 col-md-4 mb-4">
      <img src='/img/webp.jpg' alt="Indoor Plant 1" className='img-fluid col-img' />
    </div>

    <div className="col-12 col-md-4 mb-4">
      <img src='/img/h2.jpg' alt="Indoor Plant 2" className='img-fluid col-img' />
    </div>

    <div className="col-12 col-md-4 mb-4">
      <img src='/img/h3.jpg' alt="Indoor Plant 3" className='img-fluid col-img' />
    </div>
  </div>

  <IndoorBenefit />
  
  <br />
  <button type="button" onClick={indoor} className="btn btn-dark mt-3 mx-auto d-block" style={{ width: "200px" }}>
    See More
  </button>
</div>




      <br></br><br></br><br></br>
      {/* //outdoor// */}




      <h1 style={{ textAlign: "center", color: "black" }} className='col-head'>
  <b>Why we should be greening <br />our home with plants</b>
</h1>
<p style={{ textAlign: "center", fontSize: "16px" }}>
  Improved Air Quality | Supports Local Wildlife | Aesthetic Appeal | Environmental Benefits | Physical Health Benefits
</p>
<br />

<div className="container text-center card">
  <div className="row">
    <div className="col-12 col-md-4 mb-4">
      <img src='/img/outdoor home.jpg' alt="Outdoor Plant 1" className='img-fluid col-img' />
    </div>

    <div className="col-12 col-md-4 mb-4">
      <img src='/img/outdoor-3.jpg' alt="Outdoor Plant 2" className='img-fluid col-img' />
    </div>

    <div className="col-12 col-md-4 mb-4">
      <img src='/img/outdoor home2.jpg' alt="Outdoor Plant 3" className='img-fluid col-img' />
    </div>
  </div>

  <OutdoorBenefits />
  
  <br />
  <button type="button" onClick={outdoor} className="btn btn-dark mt-3 mx-auto d-block" style={{ width: "200px" }}>
    See More
  </button>
</div>
<br />

<Footer/>
    </div>
  )
}

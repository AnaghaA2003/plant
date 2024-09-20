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
              <h1 className='hello'><b>Design Your Home <br></br> Your Way</b> </h1>
            </div>
            <div className='s-content2'>
              <h1 className=''>Provide Your Home & Office Space <br></br> With The Right Plants And  <br></br>Let Our Plant Care Team Keep Them 𝓯𝓵𝓸𝓾𝓻𝓲𝓼𝓱𝓲𝓷𝓰</h1>

            </div>
            <img className='bg1' src='/img/homebg5.jpeg'></img>
          </div>
          <div className='slider-section'>
            <div className='s-content'>
              <h1 className='hello' style={{color:"violet"}}><b>Turning Over a <br></br>new leaf </b> </h1>
            </div>
            <div className='s-content2'>
              <h1 className='' >Plants are the best therapy. They require attention, patience, and nurture, and in return, they provide beauty and tranquility.</h1>

            </div>
            <img className='bg2' src='/img/homebg6.jpg' ></img></div>
            
            <div className='slider-section'>
            <div className='s-content'>
              <h1 className='hello' style={{color:"white"}}><b>Love is the flower <br></br>you’ve got to let grow </b> </h1>
            </div>
            <div className='s-content2'>
              <h1 className='' >A garden is a way of showing that you believe in tomorrow</h1>

            </div>
            <img className='bg2' src='/img/homebg7.jpg' ></img></div>
            
          <div className='slider-section'>
            <div className='s-content'>
              <h1 className='hello' style={{color:"white"}}><b>Love is the flower <br></br>you’ve got to let grow </b> </h1>
            </div>
            <div className='s-content2'>
              <h1 className='' >A garden is a way of showing that you believe in tomorrow</h1>

            </div>
            <img className='bg2' src='/img/homebg8.jpeg' ></img></div>
        </AwesomeSlider>

      </div><br></br>

      {/* //indoor// */}


      <h1 style={{ textAlign: "center", color: "black" }} className='col-head'><b>Why we should be greening <br></br>our home with plants</b></h1>
      <p style={{ textAlign: "center", textSize: "10px" }}>
        Improved Air Quality|Enhanced Mental Health|Aesthetic Appeal|Connection to Nature|Health Benefits
      </p><br></br>
      <div class="container text-center card">
        <div class="row">
          <div class="col " >
            <img src='/img/webp.jpg' width={"90%"} className='col-img' ></img>
          </div>



          <div class="col" >

            <img src='/img/h2.jpg' width={"90%"} height={"88%"} className='col-img'></img>
          </div>
          <div class="col">


            <img src='/img/h3.jpg' width={"90%"} height={"88%"} className='col-img'></img>

          </div>
          <IndoorBenefit /><br></br><br></br>
          <button style={{ textAlign: "center", marginLeft: "40%", width: "20%" }} type="button" onClick={indoor} class="btn btn-dark">
            See More</button>

        </div>
      </div>



      <br></br><br></br><br></br>
      {/* //outdoor// */}




      <h1 style={{ textAlign: "center", color: "black" }} className='col-head'><b>Why we should be greening <br></br>our home with plants</b></h1>
      <p style={{ textAlign: "center", textSize: "10px" }}>
        Improved Air Quality|Supports Local Wildlife|Aesthetic Appeal|Environmental Benefits|Physical Health Benefits
      </p><br></br>
      <div class="container text-center card">
        <div class="row">
          <div class="col " >
            <img src='/img/outdoor home.jpg' width={"90%"} height={"88%"}  className='col-img' ></img>
          </div>



          <div class="col" >

            <img src='/img/outdoor-3.jpg' width={"90%"} height={"88%"} className='col-img'></img>
          </div>
          <div class="col">


            <img src='/img/outdoor home2.jpg' width={"90%"} height={"88%"} className='col-img'></img>

          </div>
          <OutdoorBenefits /><br></br><br></br>
          <button style={{ textAlign: "center", marginLeft: "40%", width: "20%" }} type="button" onClick={outdoor} class="btn btn-dark">
            See More</button>

        </div>
      </div><br></br>
<Footer/>
    </div>
  )
}

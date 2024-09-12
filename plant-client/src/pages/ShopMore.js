import React from 'react'
import './shopMore.css'
import NavBar from '../components/Nav'

export default function ShopMore() {
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
     <NavBar/><br></br>
    {/* <img src='/img/shopMore2.jpg' height={"500px"} width={"1400px"}></img> */}
    <h4>PlantOrbit</h4>
    <h1 style={{textAlign:"center",fontFamily:"sans-serif",fontWeight:"bold"}}>OUR PRODUCTS</h1>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
              <div className='image-card' >

                <div className=" shop-card">
                  <img src='/img/outdoor-2.jpg'></img>
                  <div className="card__content">
                    <p className="card__title">plant</p>

                    <p className="card__description">
                     good
                    </p><br></br>
                  

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>100</div>
                      <div> 2</div>
                    </p>
                    <br></br><br></br><br></br>
                    
                  </div>
                </div>
              </div>
              <div className='image-card'>

                <div className=" shop-card">
                  <img src='/img/outdoor-2.jpg'></img>
                  <div className="card__content">
                    <p className="card__title">plant</p>

                    <p className="card__description">
                     good
                    </p><br></br>
                  

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>100</div>
                      <div> 2</div>
                    </p>
                    <br></br><br></br><br></br>
                    
                  </div>
                </div>
              </div>
              <div className='image-card'>

                <div className=" shop-card">
                  <img src='/img/outdoor-2.jpg'></img>
                  <div className="card__content">
                    <p className="card__title">plant</p>

                    <p className="card__description">
                     good
                    </p><br></br>
                  

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>100</div>
                      <div> 2</div>
                    </p>
                    <br></br><br></br><br></br>
                    
                  </div>
                </div>
              </div>
              <div className='image-card'>

                <div className=" shop-card">
                  <img src='/img/outdoor-2.jpg'></img>
                  <div className="card__content">
                    <p className="card__title">plant</p>

                    <p className="card__description">
                     good
                    </p><br></br>
                  

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>100</div>
                      <div> 2</div>
                    </p>
                    <br></br><br></br><br></br>
                    
                  </div>
                </div>
              </div>
              <div className='image-card'>

                <div className=" shop-card">
                  <img src='/img/outdoor-2.jpg'></img>
                  <div className="card__content">
                    <p className="card__title">plant</p>

                    <p className="card__description">
                     good
                    </p><br></br>
                  

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>100</div>
                      <div> 2</div>
                    </p>
                    <br></br><br></br><br></br>
                    
                  </div>
                </div>
              </div>
              <div className='image-card'>

                <div className=" shop-card">
                  <img src='/img/outdoor-2.jpg'></img>
                  <div className="card__content">
                    <p className="card__title">plant</p>

                    <p className="card__description">
                     good
                    </p><br></br>
                  

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>100</div>
                      <div> 2</div>
                    </p>
                    <br></br><br></br><br></br>
                    
                  </div>
                </div>
              </div>

            </div>
    </div>
  )
}

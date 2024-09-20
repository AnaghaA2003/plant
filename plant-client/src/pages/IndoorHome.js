import React, { useEffect, useState } from 'react'
import './indoorHome.css'
import Nav from '../components/Nav'
import CareTips from '../components/CareTips'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'
import Footer from '../components/Footer'

export default function IndoorHome() {
  const [role, setRole] = useState('');

  useEffect(() => {
      const loginRole = JSON.parse(localStorage.getItem('role'));
      setRole(loginRole);
  }, []);
  const [product, setProduct] = useState([])
  console.log(product);
  const navigate=useNavigate()
  useEffect(() => {
    axios.get("http://localhost:5000/api/product/product-view").then((res) => {
      console.log(res.data.data);
      
      const filterData=res.data.data.filter((value)=>{
        return value.category === 'indoor plants'
    })
      setProduct(filterData)//state update chyan function use chyunnu
    })
  }, [])
  const productDelete = (product_Id) => {
    axios.post(`http://localhost:5000/api/product/product-delete/${product_Id}`,product)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message)
        

      }).catch((error) => {
        console.log(error);
        // toast.error()
       

    })
  }
  const productEdit=(product_Id)=>{
    // axios.post(`http://localhost:5000/api/product/product-edit/${product_Id}`,product).then((res)=>{
    //   console.log(res);
      
    // })
    navigate(`/EditIndoorProduct/${product_Id}`)
    
  }
  const productApprove=(product_Id)=>{
    axios.post(`http://localhost:5000/api/admin/product-approve/${product_Id}`, product).then((res) => {
      console.log(res);
      toast.success(res.data.message)


    }).catch((error) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message); 

    })
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
      <Nav />
      <div className="nav1">
        <h1 style={{ textAlign: "center", color: "darkkhaki"  }}>
          <b className='indoor'>INDOOR PLANTS</b>
        </h1>
        <br />
        <h3 style={{ textAlign: "center", color: "darkkhaki" }}>
          <b>
            <i>
              To Create An Ambiance &amp; Freshness <br /> In Your Home
            </i>
          </b>
        </h3>
      </div>
      <br />
      {/* <div> */}
      <p style={{ textAlign: "center" }}>
        <h3>PLANTS</h3>
        <b>
          "Plants make for the best house companions, suitable for all your moods
          and every aesthetic".
        </b>
      </p>
      <br />
      <Toaster/>
      
      <div className="container text-center">
        {product.map((value,index)=>(
          role === 'user'?(
            <div className='image-card'>

            <div className=" shop-card">
              <img src={value.product_img}></img>
              <div className="card__content">
                <p className="card__title">{value.productName}</p>
  
                <p className="card__description">
                 {value.description}
                </p><br></br>
                <div className='icon'>
                  <i className="fa-regular fa-heart" />
                  <i class="fa-solid fa-cart-shopping"></i>
  
                </div>
                <br></br><br></br><br></br>
  
                <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                  <div><i class="fa-solid fa-indian-rupee-sign"></i>{value.price}</div>
                  <div> {value.quantity}</div>
                </p>
                {/* <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px" ,gap:"10px"}}>
                  <button type="submit" className="btn bttn-success" onClick={() => {
                    productDelete(value._id)
                  }}><b>Delete</b></button>
                  <button type="button" className="btn bttn-success" onClick={() => {
                    productEdit(value._id)
                  }}><b>Edit</b>  </button>
                </div> */}
              </div>
            </div>
          </div>
          ):role === 'admin'?(
            <div className='image-card'>

            <div className=" shop-card">
              <img src={value.product_img}></img>
              <div className="card__content">
                <p className="card__title">{value.productName}</p>
  
                <p className="card__description">
                 {value.description}
                </p><br></br>
                <div className='icon'>
                  <i className="fa-regular fa-heart" />
                  <i class="fa-solid fa-cart-shopping"></i>
  
                </div>
                <br></br><br></br><br></br>
  
                <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                  <div><i class="fa-solid fa-indian-rupee-sign"></i>{value.price}</div>
                  <div> {value.quantity}</div>
                </p>
              {value.status == 'Approved'?
               <button type="submit" className="btn bttn-success" onClick={() => {
                productDelete(value._id)
              }}><b>Delete</b></button>
              :
              <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px" ,gap:"10px"}}>
              <button type="button" className="btn bttn-success" onClick={() => {
                  productApprove(value._id)
                }}><b>Approve</b>  </button>
                <button type="submit" className="btn bttn-success" onClick={() => {
                  productDelete(value._id)
                }}><b>Delete</b></button>
               
              </div>
            }
               
              </div>
            </div>
          </div>
          ):role === 'shop'?(
            <div className='image-card'>

            <div className=" shop-card">
              <img src={value.product_img}></img>
              <div className="card__content">
                <p className="card__title">{value.productName}</p>
  
                <p className="card__description">
                 {value.description}
                </p><br></br>
                <div className='icon'>
                  <i className="fa-regular fa-heart" />
                  <i class="fa-solid fa-cart-shopping"></i>
  
                </div>
                <br></br><br></br><br></br>
  
                <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                  <div><i class="fa-solid fa-indian-rupee-sign"></i>{value.price}</div>
                  <div> {value.quantity}</div>
                </p>
                {/* <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px" ,gap:"10px"}}>
                  <button type="submit" className="btn bttn-success" onClick={() => {
                    productDelete(value._id)
                  }}><b>Delete</b></button>
                  <button type="button" className="btn bttn-success" onClick={() => {
                    productEdit(value._id)
                  }}><b>Edit</b>  </button>
                </div> */}
              </div>
            </div>
          </div>
          ):null
        
         
        ))}
       
        

      </div>
     
      <br></br>

      {/* <h2><i>INDOOR PLANTS</i></h2> */}
      <CareTips/>
      <br></br>
      <Footer/>
      
    </div>
  )
}

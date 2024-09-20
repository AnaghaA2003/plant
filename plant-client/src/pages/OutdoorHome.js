import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import './outdoor.css'
import axios from 'axios'
// import AddProduct from './AddProduct'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CareTips from '../components/CareTips'
import Footer from '../components/Footer'


export default function OutdoorHome() {
  const cartProduct=(id)=>{
    const data={
      user_login_id:JSON.parse(localStorage.getItem('loginId')),
      product_Id:id
    }
    axios.post(`http://localhost:5000/api/cart/add_to_cart/`,data).then((res)=>{
      console.log(res.data.message);
      toast.success(res.data.message)
      
    }).catch((error) => {
      console.log(error);
      // toast.error()
      


    })
  }
  const [role, setRole] = useState('');

  useEffect(() => {
      const loginRole = JSON.parse(localStorage.getItem('role'));
      setRole(loginRole);
  }, []);


  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  console.log(product);
  useEffect(() => {
    axios.get("http://localhost:5000/api/product/product-view").then((res) => {
      console.log(res.data.data);
      const filterData = res.data.data.filter((value) => {
        return value.category === 'outdoor plants'
      })
      setProduct(filterData)//state update chyan function use chyunnu

    })
  }, [])
  const productDelete = (product_Id) => {
    axios.post(`http://localhost:5000/api/product/product-delete/${product_Id}`, product)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message)

      }).catch((error) => {
        console.log(error);
        // toast.error()


      })
  }
  const productEdit = (product_Id) => {
    // axios.post(`http://localhost:5000/api/product/product-edit/${product_Id}`,product).then((res)=>{
    //   console.log(res);

    // })
    navigate(`/EditIndoorProduct/${product_Id}`)

  }
  // const value = setInput([...input])
  // console.log(value);
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
      <title>outdoor plants</title>
      <Nav />
      {/* {input.map((value,index)=>(
        <AddProduct data={value}/>
      ))} */}
      <div className='outdoor'>
        {/* <img src='/img/bg-5.jpg' className='bg'></img> */}
        <h1 className='Head'><b>OUTDOOR PLANTS</b></h1>
        <div className='paragraph'><p>"The earth laughs in flowers."</p>
        </div>
      </div><br></br>
      <div>
        <p style={{ textAlign: "center" }}>
          <h3>OUTDOOR PLANTS</h3><br></br>
          <b>
            "Flowering plants bring vibrant colors and natural beauty into your home".
          </b>
        </p>
        <div className='grid'>
          {/* <div  > */}
          {/* {input.map((input)=>(
            
          ))} */}
          <Toaster />
          {product.map((value, index) => (
            role ==='user'?(
              <div>
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
                      <i class="fa-solid fa-cart-shopping" onClick={()=>{
                        cartProduct(value._id)
                      }}></i>

                    </div>

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>{value.price}</div>
                      <div> {value.quantity}</div>
                    </p>
                    <br></br><br></br><br></br>
                    {/* <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px",gap:"10px" }}>
                      <button type="submit" className="btn bttn-success"  onClick={() => {
                        productDelete(value._id)
                      }}><b>Delete</b></button>
                      <button type="button" className="btn bttn-success" onClick={() => {
                        productEdit(value._id)
                      }}><b>Edit</b>  </button>
                    </div> */}
                  </div>
                </div>
              </div>

            </div>
           ) : role === 'admin'?(
              <div>
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

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>{value.price}</div>
                      <div> {value.quantity}</div>
                    </p>
                    <br></br><br></br><br></br>
                    {value.status=='Approved' ?
                     <button type="submit" className="btn bttn-success"  onClick={() => {
                      productDelete(value._id)
                    }}><b>Delete</b></button>
                    :
                    <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px",gap:"10px" }}>
                    <button type="button" className="btn bttn-success" onClick={() => {
                        productApprove(value._id)
                      }}><b>Approve</b>  </button>
                      <button type="submit" className="btn bttn-success"  onClick={() => {
                        productDelete(value._id)
                      }}><b>Delete</b></button>
                     
                    </div>
                  }
                   
                  </div>
                </div>
              </div>

            </div>
            ):role === 'shop' ?(
              <div>
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

                    <p style={{ color: "rgb(122, 35, 35)", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
                      <div><i class="fa-solid fa-indian-rupee-sign"></i>{value.price}</div>
                      <div> {value.quantity}</div>
                    </p>
                    <br></br><br></br><br></br>
                    {/* <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px",gap:"10px" }}>
                      <button type="submit" className="btn bttn-success"  onClick={() => {
                        productDelete(value._id)
                      }}><b>Delete</b></button>
                      <button type="button" className="btn bttn-success" onClick={() => {
                        productEdit(value._id)
                      }}><b>Edit</b>  </button>
                    </div> */}
                  </div>
                </div>
              </div>

            </div>
            ):null
            
          
          ))}
        </div>
      </div>
      <br></br><br></br>


      
      <CareTips /><br></br>
      <Footer/>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import './indoorHome.css'
import Nav from '../components/Nav'
import CareTips from '../components/CareTips'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'

export default function IndoorHome() {
  const [checkwishlist, setCheckWishlist] = useState(false)
  const [wishlist, setWishlist] = useState([])

  
  useEffect(() => {
    const loginId = JSON.parse(localStorage.getItem('loginId'))
    axios.get(`http://localhost:5000/api/wishlist/view_wishlist/${loginId}`).then((res) => {
      console.log(res.data.data);
      setWishlist(res.data.data)
    })
  }, [checkwishlist])
  const cartProduct = (id) => {
    const data = {
      user_login_id: JSON.parse(localStorage.getItem('loginId')),
      product_Id: id
    }
    axios.post(`http://localhost:5000/api/cart/add_to_cart/`, data).then((res) => {
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
  const [product, setProduct] = useState([])
  console.log(product);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:5000/api/product/product-view").then((res) => {
      console.log(res.data.data);

      const filterData = res.data.data.filter((value) => {
        return value.category === 'indoor plants'
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
  const WishListProduct = (id) => {
    const wishlistData = {
      user_loginId: JSON.parse(localStorage.getItem('loginId')),
      product_Id: id
    }
    axios.post(`http://localhost:5000/api/wishlist/add_to_wishlist/`, wishlistData).then((res) => {
      console.log(res.data.message);
      setCheckWishlist(!checkwishlist)
      toast.success(res.data.message)

    }).catch((error) => {
      console.log(error);

    })
  }
  const productEdit = (product_Id) => {
    // axios.post(`http://localhost:5000/api/product/product-edit/${product_Id}`,product).then((res)=>{
    //   console.log(res);

    // })
    navigate(`/EditIndoorProduct/${product_Id}`)

  }
  const productApprove = (product_Id) => {
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
        <h1 style={{ textAlign: "center", color: "darkkhaki" }}>
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
      <Toaster />

      <div className="container text-center">
        {product.map((value, index) => (
          role === 'user' ? (
            <div className='image-card'>

              <div className=" shop-card">
                <img src={value.product_img}></img>
                <div className="card__content">
                  <p className="card__title">{value.productName}</p>

                  <p className="card__description">
                    {value.description}
                  </p><br></br>
                  <div className='icon'>

                    {wishlist.filter((data) => {
                      return data.product_Id === value._id
                    })[0] ? <i className="fa-solid fa-heart" style={{ color: "#ff0000" }} onClick={() => {
                      WishListProduct(value._id)
                    }} /> : <i className="fa-regular fa-heart" onClick={() => {
                      WishListProduct(value._id)
                    }} />}


                    <i class="fa-solid fa-cart-shopping" onClick={() => {
                      cartProduct(value._id)
                    }}></i>

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
          ) : role === 'admin' ? (
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
                  {value.status == 'Approved' ?
                    <button type="submit" className="btn bttn-success" onClick={() => {
                      productDelete(value._id)
                    }}><b>Delete</b></button>
                    :
                    <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px", gap: "10px" }}>
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
          ) : role === 'shop' ? (
            <div className='image-card'>

              <div className=" shop-card">
                <img src={value.product_img}></img>
                <div className="card__content">
                  <p className="card__title">{value.productName}</p>

                  <p className="card__description">
                    {value.description}
                  </p><br></br>
                  {/* <div className='icon'>
                    <i className="fa-regular fa-heart" />
                    <i class="fa-solid fa-cart-shopping"></i>

                  </div> */}
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
          ) : null


        ))}



      </div>

      <br></br>

      {/* <h2><i>INDOOR PLANTS</i></h2> */}
      <CareTips />
      <br></br>
      <Footer />

    </div>
  )
}

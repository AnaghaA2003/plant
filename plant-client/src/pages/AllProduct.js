import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './allProduct.css'
import Footer from '../components/Footer';


export default function AllProduct() {

  const [role, setRole] = useState('');
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

  const [checkwishlist, setCheckWishlist] = useState(false)
  const [wishlist, setWishlist] = useState([])
  console.log(wishlist);

  useEffect(() => {
    const loginId = JSON.parse(localStorage.getItem('loginId'))
    axios.get(`http://localhost:5000/api/wishlist/view_wishlist/${loginId}`).then((res) => {
      console.log(res.data.data);

      setWishlist(res.data.data)

    })
  }, [checkwishlist])


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

  useEffect(() => {
    const loginRole = JSON.parse(localStorage.getItem('role'));
    setRole(loginRole);
  }, []);


  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  const [filterProduct, setFilterProduct] = useState([])
  console.log("filter=>", filterProduct);


  console.log(product);
  useEffect(() => {
    axios.get("http://localhost:5000/api/product/product-view").then((res) => {
      console.log(res.data.data);
      setProduct(res.data.data)//state update chyan function use chyunnu

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
  const Category = (name) => {
    console.log("category=>", name);
    const filterData = product.filter((value) => {
      return value.category === name
    })
    setFilterProduct(filterData)

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

      <div>

        <h1 style={{ textAlign: "center" }}>All products</h1><br></br>
        <div style={{ textAlign: "center" }}>
          <h3>Category</h3>
          <button className="button type1">
            <span className="btn-txt" onClick={() => { Category('') }}>All</span>
          </button>
          <button className="button type1">
            <span className="btn-txt" onClick={() => { Category('indoor plants') }}>Indoor Plants</span>
          </button>
          <button className="button type1">
            <span className="btn-txt" onClick={() => { Category('outdoor plants') }}>Outdoor Plants</span>
          </button>
          {/* <button type="button" class="btn"  onClick={()=>{Category('')}}>All</button>
        <button type="button" class="btn" onClick={()=>{Category('indoor plants')}}>Indoor Plants</button>
        <button type="button" class="btn"  onClick={()=>{Category('outdoor plants')}}>Outdoor Plants</button> */}
        </div><br></br>
        <div className='grid'>

          <Toaster />
          {filterProduct[0] ?
            filterProduct.map((value, index) => (
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
                    <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px", gap: "10px" }}>
                      <button type="submit" className="btn bttn-success" onClick={() => {
                        productDelete(value._id)
                      }}><b>Delete</b></button>
                      <button type="button" className="btn bttn-success" onClick={() => {
                        productEdit(value._id)
                      }}><b>Edit</b>  </button>
                    </div>
                  </div>
                </div>
              </div>
            )) :
            product.map((value, index) => (
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
                    <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px", gap: "10px" }}>
                      <button type="submit" className="btn bttn-success" onClick={() => {
                        productDelete(value._id)
                      }}><b>Delete</b></button>
                      <button type="button" className="btn bttn-success" onClick={() => {
                        productEdit(value._id)
                      }}><b>Edit</b>  </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <br></br><br></br>


      {/* <h2><i>INDOOR PLANTS</i></h2> */}
      {/* <CareTips/> */}
      <Footer/>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import NavBar from '../components/Nav'
import './ownProducts.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'
import Footer from '../components/Footer'
export default function OwnProductsView() {

  const [view , setView] =useState([])
  console.log("view==>",view);
  const [filterProduct, setFilterProduct] = useState([])
  const navigate=useNavigate()


  
  useEffect(()=>{
    const shop_login_id = JSON.parse(localStorage.getItem('loginId'));
    const token=localStorage.getItem('token');
    console.log("token==>",token);
    
    console.log("id==>",shop_login_id);
    
    axios.get(`http://localhost:5000/api/shop/shopAdd-productView/`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log("data==>",res.data.data);
      setView(res.data.data)
    }) .catch((error) => {
      console.error("Error fetching data:", error);
      // Optional: Show an error message to the user
    });
    
  },[])
  const Category = (name) => {
    console.log("category=>", name);
    const filterData = view.filter((value) => {
      return value.category === name
    })
    setFilterProduct(filterData)

  }
  const productDelete = (product_Id) => {
    axios.post(`http://localhost:5000/api/product/product-delete/${product_Id}`, view)
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
      <NavBar/>
      <Toaster/>
      <h1 className='viewHead'><b>MY PRODUCTS</b></h1>
      <div style={{ textAlign: "center"}}>
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
        
      <div className="container text-center">


      {filterProduct[0]?
      filterProduct.map((value,index)=>(
       
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
             <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px" ,gap:"10px"}}>
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
      )):
      view.map((value, index) => (
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
              <div style={{ display: "grid", justifyContent: "space-evenly", borderRadius: "15px" ,gap:"10px"}}>
                <button type="submit" className="btn bttn-success"  onClick={() => {
                  productDelete(value._id)
                }}><b>Delete</b></button>
                <button type="button" className="btn bttn-success"  onClick={() => {
                  productEdit(value._id)
                }}><b>Edit</b>  </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      

    </div>
    <br></br>
    <Footer/>
    </div>
  )
}

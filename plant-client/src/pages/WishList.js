import React, { useEffect, useState } from 'react'
import './wishlist.css'
import Nav from '../components/Nav'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'


export default function WishList() {

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
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        const loginId = JSON.parse(localStorage.getItem('loginId'))
        axios.get(`http://localhost:5000/api/wishlist/view_wishlist/${loginId}`).then((res) => {
            console.log(res.data.data);
            setWishlist(res.data.data)

        })
    },[])
    const removeWishlist=(_id)=>{
        axios.post(`http://localhost:5000/api/wishlist/remove_wishlist/${_id}`).then((res)=>{
            console.log(res.data.message);
            toast.success(res.data.message)

            const deleteWishlist= wishlist.filter((value)=>{
                return value._id!=_id
            })
            setWishlist(deleteWishlist)
            
        }).catch((error)=>{
            console.log(error);
            
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
            <>
                <div className='wishlist-container'>

                    <i class="fa-regular fa-heart  " style={{ fontSize: "40px" }}></i><br></br>
                    <h3 style={{ fontSize: "40px", fontFamily: "fantasy " }}>My WishList</h3>
                </div>
                <Toaster/>
                <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
                {wishlist.map((value, index) => (
                    
                    <div className="main">
                        <div className="wishlist-card">
                    <i class="fa-solid fa-heart  " style={{ marginLeft: "10px",fontSize:"20px",color:"#ff0000" }} onClick={ ()=>{
                        removeWishlist(value._id)
                    }}></i><br></br>

                            <div className="wishlist-heading">{value.productName}</div>
                            <div className="wishlist-details">
                               {value.description}
                                {/* <br />
                                Flex it up as you wish,
                                <br /> but you can't break it. */}
                            </div>
                            <div className="price">Rs.{value.price}</div>
                            {/* <button className="wishlist-btn1">Buy</button> */}
                            <button className="wishlist-btn2" onClick={() => {
                        cartProduct(value._id)
                      }}>Add to Cart</button>
                        </div>
                        <svg
                            className="glasses"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="100px"
                            height="100px"
                            viewBox="0 0 100 100" 
                            xmlSpace="preserve"
                        >
                            {" "}
                            <image
                                id="image0"
                                width={100}
                                height={100}
                                x={0}
                                y={0}
                                href={value.product_img}
                               
                            />
                        </svg>
                    </div>
                ))}
</div>
            </>

        </div>
    )
}

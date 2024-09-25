import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/Nav';
import './shopown.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ShopOwnProfileView() {
    const navigate = useNavigate()
    const [shopProfile, setshopProfile] = useState({})
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('loginId'));
        console.log("log==>", id);

        axios.get(`http://localhost:5000/api/shop/single-shopView/${id}`).then((res) => {
            console.log("res==>", res.data.data);
            setshopProfile(res.data.data)

        }).catch((error) => {
            console.log("error==>", error);

        })
    }, [])
    const shopEdit = (shop_Id) => {
        console.log("shopId==>", shop_Id);

        navigate(`/shopEdit/${shop_Id}`)
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
            <NavBar /><br></br>
            <h2 className='profile' ><i>My profile</i></h2>


            

            



            <div className="shop-profile-container">
                <div className="shop-banner">
                    <img
                        src="/img/shopbg2.jpg"
                        alt="Shop Banner"
                        className="banner-img"
                    />
                </div>

                <div className="shop-details">
                    <div className="shop-image">
                        <img
                            src={shopProfile.shop_img}
                            alt="Shop Logo"
                            className="shop-logo"
                        />
                    </div>

                    <div className="shop-info">
                        <h1>{shopProfile.shopName}</h1>
                        <p className="shop-description">
                            {shopProfile.Address}
                        </p>
                        <p className="shop-description">
                            {shopProfile.email}
                        </p>
                        <p className="shop-location">{shopProfile.Mobile}</p>
                        <button className="shop-button" onClick={() => {
                            shopEdit(shopProfile.loginId._id)
                        }}>Edit</button>
                    </div>
                </div>
            </div>



            <Footer />
        </div>
    )
}

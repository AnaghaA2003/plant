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
    const navigate=useNavigate()
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
    const shopEdit=(shop_Id)=>{
        console.log("shopId==>",shop_Id);
        
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
            <h2 className='profile'><i>My profile</i></h2><br></br>


            <Container>
                <Row>
                    <Col className='profilecol2'><img className='shopimg2' src={shopProfile.shop_img}  ></img>
                        {/* <Col className='profilecol'> */}
                        <div className='detailsShop'>
                            <h1>{shopProfile.shopName}</h1>
                            <p>{shopProfile.Mobile}</p>
                            <p>{shopProfile.Address}</p>
                            <p>{shopProfile.email}</p>
                            <button className='shopEditbtn' onClick={() => {
                                                        shopEdit(shopProfile.loginId._id)}}> Edit
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>

<br></br>
<Footer/>
        </div>
    )
}

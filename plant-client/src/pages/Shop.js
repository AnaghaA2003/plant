import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios';
import './shop.css'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShopMore from './ShopMore';
import Footer from '../components/Footer';

export default function Shop() {

    const [role, setRole] = useState('');
    const loginRole = JSON.parse(localStorage.getItem('role'))
    useEffect(() => {
        const loginRole = JSON.parse(localStorage.getItem('role'));
        setRole(loginRole);
    }, []);

    const [shop, setShop] = useState([]);
    const navigate = useNavigate();
    console.log("shop=>", shop);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/adminShop-view").then((res) => {
            console.log(res.data.data);
            setShop(res.data.data);
        });
    }, []);

    const shopDelete = (shop_Id) => {
        axios.post(`http://localhost:5000/api/shop/profile-delete/${shop_Id}`, shop)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                const dataFilter = shop.filter((value) => {
                    return value.shop_Id._id != shop_Id// check alreday ulla  data is equal or not reject button click chyumbol nadakkunnath


                })
                setShop(dataFilter)//state update chyan function use chyunnu
                console.log("dataFilter==>", dataFilter);



            }).catch((error) => {
                console.log(error);
                // toast.error()
            });
    }

    const shopEdit = (shop_Id) => {
        
        navigate(`/ShopEdit/${shop_Id}`);
    }

    const shopApprove = (loginId) => {
        console.log("id==>", loginId);

        axios.post(`http://localhost:5000/api/admin/approve-shop/${loginId._id}`, shop).then((res) => {
            console.log(res);
            toast.success(res.data.message)


        }).catch((error) => {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);

        })
    }
    const shopMore = (shop_login_id) => {
        console.log(shop_login_id);
        if (loginRole == null) {
            return navigate('/login')
          } else {
            return  navigate(`/shopMore/${shop_login_id}`)
        
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
            <title>Plant</title>
            <Nav />

            <div className='shop-1'></div><br /><br />
            <div style={{ backgroundColor: "#EEE2DC" }}>
                <h1 className='shopHead'><b>Nature's Best Picks</b></h1><br />

                <Toaster />

                {shop.map((value, index) => (
                    role === 'user' ? (
                        <div key={index} style={{ display: "grid" }} className='container text-center'>
                            <div className="card1" style={{ width: "740px" }}>
                                <div className="border1" />
                                <div className="content">
                                    <div className="logo">
                                        <div className="logo1">
                                            <span><b>{value.shopName}</b></span>
                                        </div>
                                        <span className="trail" />
                                    </div>
                                    <span className="logo-bottom-text "><b>{value.shopName}</b></span>
                                </div>
                                <span className="bottom-text"><b>{value.shopName}</b></span>
                            </div>
                            <div>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div  >
                                                <img src={value.shop_img} height={"200px"} alt="Shop" className='shopImage' />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <p><b>{value.shopName}</b></p>
                                                <p>
                                                    <b>{value.Address}</b><br />
                                                    <b>{value.Mobile}</b><br />
                                                </p><br />
                                                {/* <div style={{ display: "flex", justifyContent: "space-evenly", borderRadius: "15px" }}>

                                                    <button type="button" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                        shopEdit(value.loginId._id);
                                                    }}>Approve</button>
                                                    <button type="submit" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                        shopDelete(value._id);
                                                    }}>Delete</button>
                                                </div> */}
                                            </div>

                                        </Col>
                                    </Row>
                                    <>
                                        <div
                                            tabIndex={0}
                                            className="plusButton"
                                            onClick={() => shopMore(value.loginId._id)}
                                        >
                                            <svg
                                                className="plusIcon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 30 30"
                                            >
                                                <g>
                                                    <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
                                                </g>
                                            </svg>
                                        </div>
                                    </>
                                </Container>
                            </div>
                        </div>
                    ) : role === 'shop' ? (
                        <div key={index} style={{ display: "grid" }} className='container text-center'>
                            <div className="card1" style={{ width: "740px" }}>
                                <div className="border1" />
                                <div className="content">
                                    <div className="logo">
                                        <div className="logo1">
                                            <span><b>{value.shopName}</b></span>
                                        </div>
                                        <span className="trail" />
                                    </div>
                                    <span className="logo-bottom-text"><b>{value.shopName}</b></span>
                                </div>
                                <span className="bottom-text"><b>{value.shopName}</b></span>
                            </div>
                            <div>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div style={{ display: "grid" }}>
                                                <img src={value.shop_img} height={"200px"} alt="Shop" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <p><b>{value.shopName}</b></p>
                                                <p>
                                                    <b>{value.Address}</b><br />
                                                    <b>{value.Mobile}</b><br />
                                                </p><br />
                                                <div style={{ display: "flex", justifyContent: "space-evenly", borderRadius: "15px" }}>
                                                    <button type="submit" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                        shopDelete(value._id);
                                                    }}>Delete</button>
                                                    <button type="button" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                        shopEdit(value._id);
                                                    }}>Edit</button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <>
                                        <div
                                            tabIndex={0}
                                            className="plusButton"
                                            onClick={() => shopMore(value.loginId._id)}
                                        >
                                            <svg
                                                className="plusIcon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 30 30"
                                            >
                                                <g>
                                                    <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
                                                </g>
                                            </svg>
                                        </div>
                                    </>
                                </Container>
                            </div>
                        </div>
                    ) : role === 'admin' ? (
                        <div key={index} style={{ display: "grid" }} className='container text-center'>
                            <div className="card1" style={{ width: "740px" }}>
                                <div className="border1" />
                                <div className="content">
                                    <div className="logo">
                                        <div className="logo1">
                                            <span><b>{value.shopName}</b></span>
                                        </div>
                                        <span className="trail" />
                                    </div>
                                    <span className="logo-bottom-text"><b>{value.shopName}</b></span>
                                </div>
                                <span className="bottom-text"><b>{value.shopName}</b></span>
                            </div>
                            <div>
                                <Container>

                                    <Row>

                                        <Col >
                                            <div className='colShop' >
                                                <img src={value.shop_img} height={"200px"} alt="Shop" className='shopImage'/>
                                            </div>
                                        </Col>
                                        <Col >
                                            <div>
                                                <p><b>{value.shopName}</b></p>
                                                <p>
                                                    <b>{value.Address}</b><br />
                                                    <b>{value.Mobile}</b><br />
                                                </p><br />
                                                {value.loginId.status == 'Approved' ?
                                                    <button type="submit" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                        shopDelete(value._id);
                                                    }}>Delete</button>
                                                    :
                                                    <div style={{ display: "flex", justifyContent: "space-evenly", borderRadius: "15px" }}>

                                                        <button type="button" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                            shopApprove(value.loginId);
                                                        }}>Approve</button>
                                                        <button type="submit" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                            shopDelete(value._id);
                                                        }}>Delete</button>
                                                    </div>
                                                }


                                            </div>
                                        </Col>
                                    </Row>
                                    <>
                                        <div
                                            tabIndex={0}
                                            className="plusButton"
                                            onClick={() => shopMore(value.loginId._id)}
                                        >
                                            <svg
                                                className="plusIcon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 30 30"
                                            >
                                                <g>
                                                    <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
                                                </g>
                                            </svg>
                                        </div>
                                    </>

                                </Container>
                            </div>
                        </div>
                    ) :    <div key={index} style={{ display: "grid" }} className='container text-center'>
                    <div className="card1" style={{ width: "740px" }}>
                        <div className="border1" />
                        <div className="content">
                            <div className="logo">
                                <div className="logo1">
                                    <span><b>{value.shopName}</b></span>
                                </div>
                                <span className="trail" />
                            </div>
                            <span className="logo-bottom-text "><b>{value.shopName}</b></span>
                        </div>
                        <span className="bottom-text"><b>{value.shopName}</b></span>
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <div  >
                                        <img src={value.shop_img} height={"200px"} alt="Shop" className='shopImage' />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <p><b>{value.shopName}</b></p>
                                        <p>
                                            <b>{value.Address}</b><br />
                                            <b>{value.Mobile}</b><br />
                                        </p><br />
                                        {/* <div style={{ display: "flex", justifyContent: "space-evenly", borderRadius: "15px" }}>

                                            <button type="button" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                shopEdit(value.loginId._id);
                                            }}>Approve</button>
                                            <button type="submit" className="btn bttn-success" style={{ borderRadius: "15px", width: "160px" }} onClick={() => {
                                                shopDelete(value._id);
                                            }}>Delete</button>
                                        </div> */}
                                    </div>

                                </Col>
                            </Row>
                            <>
                                <div
                                    tabIndex={0}
                                    className="plusButton"
                                    onClick={() => shopMore(value.loginId._id)}
                                >
                                    <svg
                                        className="plusIcon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 30"
                                    >
                                        <g>
                                            <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
                                        </g>
                                    </svg>
                                </div>
                            </>
                        </Container>
                    </div>
                </div>
                ))}
            </div>
            <br></br>
            <Footer/>
        </div>
    )
}

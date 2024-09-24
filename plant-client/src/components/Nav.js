import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavBar() {
  const [role, setRole] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const loginRole = JSON.parse(localStorage.getItem('role'));
    setRole(loginRole);
  }, []);
 

  console.log("LoginRole==>", role);
  const logout=()=>{
    localStorage.removeItem('loginId');
    localStorage.removeItem('emailId');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
   
    // console.log(localStorage.getItem('loginId'));
    navigate('/');
    window.location.reload()//reload chyan vendi ullath
  }

  return (
    <Navbar expand="lg" bg="light" variant="light" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <i className="fa-brands fa-pagelines" style={{ color: "#1ebe96" }}> plant </i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {role === 'user' ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: "rgb(51, 153, 11)" }}>Home</Nav.Link>
                <NavDropdown title="Plants" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/indoor">Indoor Plants</NavDropdown.Item>
                  <NavDropdown.Item href="/outdoor">Outdoor Plants</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/shop" style={{ color: "rgb(51, 153, 11)" }}>Shops</Nav.Link>
                <Nav.Link href="/allProducts" style={{ color: "rgb(51, 153, 11)" }}>All Products</Nav.Link>
                <Nav.Link href="/myOrder" style={{ color: "rgb(51, 153, 11)" }}>My Orders</Nav.Link>
              </Nav>
              <div className="d-flex gap-2">
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-magnifying-glass"></i> Search</Nav.Link>
                <Nav.Link href="/cart" className="text-success"><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                <Nav.Link href="/wishlist" className="text-success"><i className="fa-solid fa-heart"></i> WishList</Nav.Link>
                <Button variant="secondary" onClick={logout} ><i className="fa-solid fa-arrow-right-from-bracket"></i> LogOut</Button>
              </div>
            </>
          ) : role === 'shop' ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: "rgb(51, 153, 11)" }}>Home</Nav.Link>
                <NavDropdown title="Plants" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/indoor">Indoor Plants</NavDropdown.Item>
                  <NavDropdown.Item href="/outdoor">Outdoor Plants</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/add" style={{ color: "rgb(51, 153, 11)" }}>Add Product</Nav.Link>
                <Nav.Link href="/ownProduct" style={{ color: "rgb(51, 153, 11)" }}>View Products</Nav.Link>
                <Nav.Link href="/shopownProfile" style={{ color: "rgb(51, 153, 11)" }}>Profile</Nav.Link>
              </Nav>
              <div className="d-flex gap-2">
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-magnifying-glass"></i> Search</Nav.Link>
                {/* <Nav.Link href="#" className="text-success"><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-heart"></i> WishList</Nav.Link> */}
                <Button variant="secondary" onClick={logout} ><i className="fa-solid fa-arrow-right-from-bracket"></i> LogOut</Button>
              </div>
            </>
          ) : role === 'admin' ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: "rgb(51, 153, 11)" }}>Home</Nav.Link>
                <NavDropdown title="Plants" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/indoor">Indoor Plants</NavDropdown.Item>
                  <NavDropdown.Item href="/outdoor">Outdoor Plants</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/shop" style={{ color: "rgb(51, 153, 11)" }}>Shops</Nav.Link>
                <Nav.Link href="/userProfile" style={{ color: "rgb(51, 153, 11)" }}>View Users</Nav.Link>
                {/* <Nav.Link href="/allProducts" style={{ color: "rgb(51, 153, 11)" }}>All Products</Nav.Link> */}
              </Nav>
              <div className="d-flex gap-2">
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-magnifying-glass"></i> Search</Nav.Link>
                {/* <Nav.Link href="#" className="text-success"><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-heart"></i> WishList</Nav.Link> */}
                <Button variant="secondary" onClick={logout} ><i className="fa-solid fa-arrow-right-from-bracket"></i> LogOut</Button>
              </div>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ color: "rgb(51, 153, 11)" }}>Home</Nav.Link>
                <Nav.Link href="/shop" style={{ color: "rgb(51, 153, 11)" }}>Shops</Nav.Link>
              </Nav>
              <div className="d-flex gap-2">
                <Nav.Link href="/login" className="text-success"><i className="fa-regular fa-user"></i> Login</Nav.Link>
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-magnifying-glass"></i> Search</Nav.Link>
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                <Nav.Link href="#" className="text-success"><i className="fa-solid fa-heart"></i> WishList</Nav.Link>
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

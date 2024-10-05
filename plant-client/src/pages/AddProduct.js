import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import './add.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';

export default function AddProduct() {
    const [input, setInput] = useState({
        productName: '',
        description: '',
        price: '',
        quantity: '',
        product_img: '',
        category: '',
        shop_login_id: localStorage.getItem('loginId')
    });

    const [error, setError] = useState({});

    const inputChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const click = (event) => {
        event.preventDefault();
        if (!validationError()) {
            return;
        }
        
        const data = new FormData();
        data.append('productName', input.productName);
        data.append('description', input.description);
        data.append('price', input.price);
        data.append('quantity', input.quantity);
        data.append('product_img', input.product_img);
        data.append('category', input.category);
        data.append('shop_login_id', JSON.parse(localStorage.getItem('loginId')));

        axios.post("http://localhost:5000/api/product/product-add", data)
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const validationError = () => {
        const errorMessage = {};
        if (!input.productName.trim()) errorMessage.productName = "Product name is required";
        if (!input.description.trim()) errorMessage.description = "Description is required";
        if (!input.price.trim()) errorMessage.price = 'Price is required';
        if (!input.category.trim()) errorMessage.category = 'Category is required';
        if (!input.product_img) errorMessage.product_img = 'Product image is required';
        if (!input.quantity.trim()) errorMessage.quantity = "Quantity is required";

        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    };

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
            />
            <title>Add plants</title>
            <Nav /><br />
            <div className='add'>
                <h1 className='addHead'>PLANTS</h1>
            </div><br />
            <div className='addProduct'>
                <Toaster />
                <form className='form-product'>
                    <div className='span'><span>{error.category}</span></div>
                    <select
                        className="form-select form-select-sm category"
                        name='category'
                        onChange={inputChange}
                        style={{ borderRadius: "10px" }}
                    >
                        <option selected>Choose a category</option>
                        <option value="indoor plants">Indoor plants</option>
                        <option value="outdoor plants">Outdoor plants</option>
                    </select><br />
                    <div className='span'><span>{error.product_img}</span></div>
                    <input
                        className="form-control"
                        type="file"
                        name='product_img'
                        id="formFileMultiple"
                        multiple
                        onChange={(e) => setInput({ ...input, product_img: e.target.files[0] })}
                        style={{ width: "99.9%", borderRadius: "10px" }}
                    /><br />
                    <div className='span'><span>{error.productName}</span></div>
                    <input
                        type='text'
                        placeholder='Product name'
                        name="productName"
                        onChange={inputChange}
                        style={{ width: "99%", borderRadius: "10px" }}
                    /><br /><br />
                    <div className='span'><span>{error.description}</span></div>
                    <input
                        type='text'
                        placeholder='Description'
                        name="description"
                        onChange={inputChange}
                        style={{ width: "99%", borderRadius: "10px" }}
                    /><br /><br />
                    <div className='span'><span>{error.price}</span></div>
                    <input
                        type='text'
                        placeholder='Price'
                        name="price"
                        onChange={inputChange}
                        style={{ width: "99%", borderRadius: "10px" }}
                    /><br /><br />
                    <div className='span'><span>{error.quantity}</span></div>
                    <input
                        type='number'
                        placeholder='Quantity'
                        name="quantity"
                        onChange={inputChange}
                        style={{ width: "99%", borderRadius: "10px" }}
                    /><br /><br />
                    <button className='button-btn' onClick={click}>
                        <span className="circle1"></span>
                        <span className="circle2"></span>
                        <span className="circle3"></span>
                        <span className="circle4"></span>
                        <span className="circle5"></span>
                        <span className="text">Add Product</span>
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

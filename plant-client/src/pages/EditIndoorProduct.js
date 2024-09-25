import React, { useEffect, useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'
import Nav from '../components/Nav'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function EditIndoorProduct() {
    const [input, setInput] = useState({ 
        productName: '',
        description: '',
        price: '',
        quantity: '', 
        category:'',
        product_img:'',
    })
    console.log(input);
    const [error, setError] = useState({})

    const {id}=useParams()
    console.log(id);
    const navigate=useNavigate()
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/product/single-productView/${id}`).then((res)=>{
            console.log(res);
            setInput(res.data.data)
            
        }).catch((error)=>{
            console.log(error);
            
        })
    },[id])

    const inputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput({ ...input, [name]: value })

    }

    const click = (event) => {
        event.preventDefault()
        if (!validationError()) {
            console.log('error');
            return;

        }


        const data = new FormData();
        data.append('productName', input.productName)
        data.append('description', input.description)
        data.append('price', input.price)
        data.append('quantity', input.quantity)
        data.append('product_img', input.product_img)
        data.append('category', input.category)
        axios.post(`http://localhost:5000/api/product/product-edit/${id}`, data).then((res) => {
            console.log(res.data.message);
            toast(res.data.message)
            // navigate('/outdoor')
            const navigateTimer = setTimeout(() => {
                navigate('/allProducts');
              }, 4000)
            
            // setInput[{...input,data}]

        }).catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message)

        })
    }
    const validationError = () => {
        const errorMessage = {}
        if (!input.productName.trim()) {
            errorMessage.productName = "Product name is required"
        }
        if (!input.description.trim()) {
            errorMessage.description = "Description is required"
        }
        if (!input.price.trim()) {
            errorMessage.price = 'Price is required'
        }
        if (!input.category.trim()) {
            errorMessage.category = 'Category is required'
        }
        if (!input.product_img) {
            errorMessage.product_img = 'Product image is required'
        }
        if (!input.quantity.trim()) {
            errorMessage.quantity = "Quantity is required"
        }
        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
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
            <title>Add plants</title>
            <Nav /><br></br>
            <div className='add'>
                <h1 className='addHead'>PLANTS</h1>
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                
                <Toaster />
                
            </div>
            <div className='addProduct'><br></br>
                <form className='form-product'>
                <div className='span'><span>{error.category}</span></div>

                <select class="form-select form-select-sm category" style={{ borderRadius: "10px" }}  aria-label="Large  select example" name='category' onChange={inputChange}>
                        <option selected >Choose add category</option>
                        <option value="indoor plants">Indoor plants</option>
                        <option value="outdoor plants">Outdoor plants</option>

                    </select><br></br>


                    {/* <div class="mb-3" style={{ width: "85%", textAlign: "center", paddingLeft: "15%" }}> */}
                    {/* <label for="formFileMultiple" class="form-label">Multiple files input example</label> */}
                    <div className='span'><span>{error.product_img}</span></div>
                    <img src={input.product_img} width={"90px"} height={"70px"} style={{paddingBottom:"20px"}}></img>

                    <input class="form-control"  type="file" name='product_img' id="formFileMultiple" multiple style={{ width: "99.9%", borderRadius: "10px" }}  onChange={(e) => { console.log(e.target.files); setInput({ ...input, product_img: e.target.files[0] }) }} /><br></br>
                    {/* </div> */}
                    <div className='span'>
                        
                        <span>{error.productName}</span></div>

                    <input type='text' placeholder='Product name' name="productName" value={input.productName} style={{ width: "99%", borderRadius: "10px" }}onChange={inputChange}></input><br></br><br></br>
                    <div className='span'><span>{error.description}</span></div>

                    <input type='text' placeholder='Description' name="description" value={input.description}style={{ width: "99%", borderRadius: "10px" }} onChange={inputChange}></input><br></br><br></br>
                    <div className='span'><span>{error.price}</span></div>

                    <input type='text' placeholder='Price' name="price" value={input.price} style={{ width: "99%", borderRadius: "10px" }} onChange={inputChange}></input><br></br><br></br>
                    <div className='span'><span>{error.quantity}</span></div>

                    <input type='number' placeholder='Quantity' name="quantity" value={input.quantity} style={{ width: "99%", borderRadius: "10px" }} onChange={inputChange}></input><br></br><br></br>
                    <button  onClick={click}  style={{ color: "white", backgroundColor: "green", borderRadius: "10px" }}>Submit</button>
                </form>
            </div>
        </div>
  )
}

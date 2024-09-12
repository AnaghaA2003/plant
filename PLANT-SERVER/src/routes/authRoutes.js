const express = require('express')
const loginSchema = require('../models/loginSchema')
const shopSchema = require('../models/shopSchema')
const userSchema = require('../models/userSchema')
const cloudinary=require("cloudinary").v2
const {CloudinaryStorage}=require("multer-storage-cloudinary")
const multer=require("multer")
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})

const CloudStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"plant"
    }
})

const upload=multer({storage:CloudStorage})


const authRoutes = express.Router()

authRoutes.post('/shop-registration',upload.single("shop_img"), async (req, res) => {
    try {

        const loginData = {
            email: req.body.email,
            password: req.body.password,
            role: 'shop',
            status: 'pending'
        }
        console.log("logindata=>",req.body);
        
        
        const add = await loginSchema(loginData).save()
        console.log("add==>",add);
        
        if (add) {
            const data = {
                loginId: add._id,
                shopName: req.body.shopName,
                Mobile: req.body.Mobile,
                Address: req.body.Address,
                shop_img: req.file.path
            }
            console.log("data=>",data);
            
            const register = await shopSchema(data).save()
            console.log("register==>",register);
            
            if (register) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: "Data added successfully"
                })
            }

        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot added"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error ",
            errorMessage: error
        })
    }
})


authRoutes.post('/user-registration',upload.single("user_img"), async (req, res) => {
    try {
       
console.log(req.body);

        const loginData = {
            email: req.body.email,
            password: req.body.password,
            role: 'user',
            status: 'pending'
        }

        const add = await loginSchema(loginData).save()
        if (add) {
            const data = {
                loginId: add._id,
                Name: req.body.Name,
                Mobile: req.body.Mobile,
                Address: req.body.Address,
                Age: req.body.Age,
                user_img: req.file.path,
            }
            const register = await userSchema(data).save()
            if (register) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: "User added successfully"
                })
            }

        } else {
            return res.status(400).json({
                success: false, 
                error: false,
                message: "Data cannot added"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error ",
            errorMessage: error
        })
    }
})



authRoutes.post('/login-check', async (req, res) => {
    try {
        console.log('req==>',req.body);
        
        const oldData = await loginSchema.findOne({ email: req.body.email })
        if (!oldData) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }
        const password = req.body.password
        if (oldData.password == password) {
            if(oldData.status=='pending'){
                return res.status(400).json({
                    success:false,
                    error:true,
                    message:"Waiting for admin approvel"
                })
            }else if(oldData.status=='rejected'){
                return res.status(400).json({
                    success:false,
                    error:true,
                    message:"user has been blocked"
                })
            }else{
            
            return res.status(200).json({
                success: true,
                error: false,
                data: oldData,
                message:"User login successfully"

            })
         }
        }

        else {
            // console.log('req==>',req.body);
            return res.status(400).json({
                success: false,
                error: true,
                message: "Password not match"

            })

        }
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error ",
            errorMessage: error
        })
    }
})







module.exports = authRoutes
const express = require('express')
const loginSchema = require('../models/loginSchema')
const shopSchema = require('../models/shopSchema')
const userSchema = require('../models/userSchema')
const cloudinary=require("cloudinary").v2
const {CloudinaryStorage}=require("multer-storage-cloudinary")
const jwt=require('jsonwebtoken')
const nodemailer = require("nodemailer");
const multer=require("multer")
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "anaghadev1606@gmail.com",
      pass: "avmxpedgtokczbhp",
    },
  });

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

                const token=jwt.sign( //encode chyan vendi use chyna method
                    {
                        userLoginId:oldData._id,
                        email:oldData.email,
                        role:oldData.role,
                        status:oldData.status
                    },
                    "private-key",
                    {expiresIn:'1h'}
                )
            
            return res.status(200).json({
                success: true,
                error: false,
                data: oldData,
                token:token,
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

//email verification 

authRoutes.post('/email-verification',async(req,res)=>{
   try {
    const data=await loginSchema.findOne({email:req.body.email})
    if (!data) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "You are not registered with us"
        })
    }else{

        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);//creating random 4 digit number

        const mailOptions = {
            from: "plant@gmail.com",
            to: req.body.email,
            subject: "OTP-verification",
            text: (`Your One Time Password ${val}`),

          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
              return res.status(400).json({
                success:false,
                error:true,
                message:"Error sending email: ",
                errorMessage: error
              })
              
            } else {
              console.log("Email sent: ", info.response); 
              return res.status(200).json({
                success:true,
                error:false,
                message:'Email sent:',
                otp:val,
                email:req.body.email,
                response:info.response
              })
            }
          });

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

//password update

authRoutes.post('/password-update',async(req,res)=>{
    try {
        
        const data={
            password: req.body.password ,
        }
        console.log("data==>",data);
        
        const newdata=await loginSchema.updateOne({email:req.body.email},{$set:data})
        console.log("newdata==>",newdata);
        
        if(newdata){
            return res.status(200).json({
                success:true,
                error:false,
                data:newdata,
                message:'Password is updated'
            })
        }else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "password is not updated"
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
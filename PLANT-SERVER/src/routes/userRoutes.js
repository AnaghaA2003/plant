const express = require('express')
const userSchema = require('../models/userSchema')
const checkauth = require('../middleware/checkauth')

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


const userRoutes = express.Router()
// ### PROFILE VIEW  ####//
userRoutes.get('/profile-view', checkauth, async (req, res) => {
    try {
        const id = req.userData.userLoginId
        console.log("id==>", id);

        const viewData = await userSchema.findOne({ loginId: id }).populate('loginId')
        console.log("viewData==>", viewData);

        if (viewData) {
            return res.status(200).json({
                success: true,
                error: false,
                data: viewData,
                message: "Data viewed successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot viwed"
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
// ### PROFILE DELETE  ####//
userRoutes.post('/profile-delete/:id', async (req, res) => {
    try {

        const id = req.params.id
        const delData = await userSchema.deleteOne({ _id: id })
        if (delData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Data deleted successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot deleted"
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

// ### PROFILE UPDATE  ####//
userRoutes.post('/profile-edit/:id',upload.single("user_img"), async (req, res) => {
    try {
        const id = req.params.id
        console.log("id==>",id);
        
        const oldData = await userSchema.findOne({ _id: id })
        console.log("oldData==>",oldData);
        
        const data = {
            Name: req.body.Name ? req.body.Name : oldData.Name,
            Address: req.body.Address ? req.body.Address : oldData.Address,
            Mobile: req.body.Mobile ? req.body.Mobile : oldData.Mobile,
            Age: req.body.Age ? req.body.Age : oldData.Age,
            user_img: req.file ? req.file.path : oldData.user_img,
        }
        console.log("data==>",data);
        
        const newData = await userSchema.updateOne({ _id: id }, { $set: data })
        console.log("newData==>",newData);
        
        if (newData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Data updated successfully',
                data: newData
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "internal server error",
            errorMessage: error

        })

    }
})


















module.exports = userRoutes
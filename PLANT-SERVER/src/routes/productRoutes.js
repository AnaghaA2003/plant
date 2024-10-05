const express = require('express')


const productSchema = require('../models/productSchema')

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


const productRoutes = express.Router()
// ## PRODUCT ADD ## //
productRoutes.post('/product-add',upload.single("product_img"), async (req, res) => {
    try {
        const data = {
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category:req.body.category,
            product_img:req.file.path,
            shop_login_id:req.body.shop_login_id,
            status: 'pending'
        }
        console.log(data);
        
        const addData = await productSchema(data).save()
        if (addData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Data added successfully"
            })
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
            message: "Internal serever error",
            errorMessage: error
        })

    }
})
// ### PRODUCT VIEW ##//
productRoutes.get('/product-view', async (req, res) => {
    try {
        const viewData = await productSchema.find()
        if (viewData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Data viwed successfully",
                data: viewData
            })
        } else {
            return res.status(400).json({
                success: true,
                error: false,
                message: "Data cannot viwed ",

            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal serever error",
            errorMessage: error
        })

    }
})
// ### PRODUCT UPDATE ###//
productRoutes.post('/product-edit/:id',upload.single("product_img"), async (req, res) => {
    try {
        const id = req.params.id
        const oldData = await productSchema.findOne({ _id: id })
        const data = {
            productName: req.body.productName ? req.body.productName : oldData.productName,
            description: req.body.description ? req.body.description : oldData.description,
            price: req.body.price ? req.body.price : oldData.price,
            quantity: req.body.quantity ? req.body.quantity : oldData.quantity,
            product_img: req.file? req.file.path : oldData.product_img
        }
        const updateData = await productSchema.updateOne({ _id: id }, { $set: data })
        if (updateData.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Data updated successfully"
            })
        } else {
            return res.status(400).json({
                success: true,
                error: false,
                message: "Data cannot updated ",

            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error",
            errorMessage: error
        })
    }
})
productRoutes.post('/product-delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delData = await productSchema.deleteOne({ _id: id })
        if (delData.deletedCount == 1) {
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
            message: "Internal server error",
            errorMessage: error

        })
    }
})
productRoutes.get('/single-productView/:id', async (req, res) => {
    try {
        const id = req.params.id
        const viewData = await productSchema.findOne({ _id: id })
       
        console.log(viewData);
        
        if (viewData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Data viwed successfully",
                data: viewData
            })
        } else {
            return res.status(400).json({
                success: true,
                error: false,
                message: "Data cannot viwed ",

            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal serever error",
            errorMessage: error
        })
    }
})













module.exports = productRoutes
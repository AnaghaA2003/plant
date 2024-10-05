const express = require('express')
const shopSchema = require('../models/shopSchema')


const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
const productSchema = require('../models/productSchema')
const cartSchema = require('../models/cartSchema')
const { default: mongoose } = require('mongoose')
const checkauth = require('../middleware/checkauth')
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})

const CloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "plant"
    }
})

const upload = multer({ storage: CloudStorage })




const shopRoutes = express.Router()
// ### PROFILE VIEW  ####//
shopRoutes.get('/profile-view', async (req, res) => {
    try {


        const viewData = await shopSchema.find()
        console.log(viewData);
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
shopRoutes.post('/profile-delete/:id', async (req, res) => {
    try {

        const id = req.params.id
        const delData = await shopSchema.deleteOne({ _id: id })
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
            message: "Internal server error ",
            errorMessage: error
        })
    }
})

// ### PROFILE UPDATE  ####//
shopRoutes.post('/profile-edit/:id', upload.single("shop_img"), async (req, res) => {
    try {
        const id = req.params.id
        console.log("id==>", id);

        const oldData = await shopSchema.findOne({ loginId: id })

        console.log("oldDta==>", oldData);

        const data = {
            shopName: req.body.shopName ? req.body.shopName : oldData.shopName,
            Address: req.body.Address ? req.body.Address : oldData.Address,
            Mobile: req.body.Mobile ? req.body.Mobile : oldData.Mobile,
            shop_img: req.file ? req.file.path : oldData.shop_img,

        }
        console.log("data==>", data);

        const newData = await shopSchema.updateOne({ loginId: id }, { $set: data })
        if (newData.modifiedCount == 1) {
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
        console.log("error==>", error);

        return res.status(500).json({
            success: false,
            error: true,
            message: "internal server error",
            errorMessage: error

        })

    }
})



shopRoutes.get('/single-shopView/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log("id==>", id);

        const viewData = await shopSchema.findOne({ loginId: id }).populate('loginId')

        console.log("viewData==>", viewData);

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
shopRoutes.get('/shopAdd-productView/', checkauth, async (req, res) => {
    try {

       
        
        const id =req.userData.userLoginId //checkauth kodutha id pass chya
        console.log("id==>", id);

        const viewData = await productSchema.find({ shop_login_id: id })

        console.log("viewData=>", viewData);

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



//shop view their product order


shopRoutes.get('/shopView-productOrder/:id', async (req, res) => {
    try {
        const id = req.params.id
        const viewData = await cartSchema.aggregate([
            {
              '$lookup': {
                'from': 'users', 
                'localField': 'user_loginId', 
                'foreignField': 'loginId', 
                'as': 'user'
              }
            }, {
              '$lookup': {
                'from': 'products', 
                'localField': 'product_Id', 
                'foreignField': '_id', 
                'as': 'product'
              }
            }, {
              '$lookup': {
                'from': 'shops', 
                'localField': 'product.shop_login_id', 
                'foreignField': 'loginId', 
                'as': 'shop'
              }
            },
            {
                '$unwind':'$user'
            },
            {
                '$unwind':'$shop'
            },
            {
                '$unwind':'$product'
            },
            {
                '$match':{
                    'product.shop_login_id': new mongoose.Types.ObjectId(id)
                }
            },
            {
                '$match':{
                    'status' :'order placed'
                }
            },
            {
                '$group':{
                    '_id':'$_id',
                    'productName':{'$first':'$product.productName'},
                    'description':{'$first':'$product.description'},
                    'price':{'$first':'$product.price'},
                    'product_img':{'$first':'$product.product_img'},
                    'quantity':{'$first':'$product.quantity'},
                    'category':{'$first':'$product.category'},
                    'Name':{'$first':'$user.Name'},
                    'Address':{'$first':'$user.Address'},
                    'Mobile':{'$first':'$user.Mobile'},
                    'user_img':{'$first':'$user.user_img'},
                    'status':{'$first':'$status'},
                    


                }
            }
          ])
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















module.exports = shopRoutes
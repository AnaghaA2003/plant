const express = require('express')
const wishlistSchema = require('../models/wishlistSchema')
const mongoose = require('mongoose')



const wishlistRoutes = express.Router()

wishlistRoutes.post('/add_to_wishlist', async (req, res) => {
    try {
        console.log(req.body.user_loginId);

        const oldData = await wishlistSchema.findOne({
            user_loginId: req.body.user_loginId,
            product_Id: req.body.product_Id
        })
        console.log(oldData);


        if (oldData) {
            const delData = await wishlistSchema.deleteOne({ _id: oldData._id })
            // console.log(delData);

            if (delData) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: oldData,
                    message: "Item removed from wishlist"
                })
            } else {

                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Data cannot removed from wishlist"
                })
            }

        } else {
            const data = {
                user_loginId: req.body.user_loginId,
                product_Id: req.body.product_Id,
            }
            const addData = await wishlistSchema(data).save()
            if (addData) {
                return res.status(200).json({
                    sucess: true,
                    error: false,
                    message: "Product added to wishlist "
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Data cannot added"
                })
            }
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

//remove

wishlistRoutes.post('/remove_wishlist/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log("id==>",id);
        


        const delData = await wishlistSchema.deleteOne({ _id: id })
        console.log("delData=>",delData);

        if (delData.deletedCount==1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Item removed from wishlist"
            })
        } else {

            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot removed from wishlist"
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

//view

wishlistRoutes.get('/view_wishlist/:id', async (req, res) => {
    const id = req.params.id
    console.log("id==>", id);

    try {
        const viewData = await wishlistSchema.aggregate([{
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
        },
        {
            '$unwind': '$user'

        },
        {
            '$unwind': '$product'
        },
        {
            '$match': {
                'user_loginId': new mongoose.Types.ObjectId(id)
            }
        },
        {
            '$group': {
                '_id': '$_id',
                'Name': { '$first': '$user.Name' },
                'Mobile': { '$first': '$user.Mobile' },
                'productName': { '$first': '$product.productName' },
                'price': { '$first': '$product.price' },
                'product_img': { '$first': '$product.product_img' },
                'description': { '$first': '$product.description' },
                'category': { '$first': '$product.category' },
                'user_loginId': { '$first': '$user.loginId' },
                'product_Id': { '$first': '$product_Id' },

            }
        }
        ])
        console.log("viewdata==>", viewData);
        if (viewData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Wishlist Product viewed successfully',
                data: viewData


            })
        }

        else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product cannot viewed"
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







module.exports = wishlistRoutes
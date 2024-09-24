const express = require('express')
const cartSchema = require('../models/cartSchema')
const { default: mongoose } = require('mongoose')

const cartRoutes = express.Router()
// add to cart
cartRoutes.post('/add_to_cart', async (req, res) => {

    try {
        const cartData = {
            user_loginId: req.body.user_login_id,
            product_Id: req.body.product_Id,
            quantity: 1,
            status: 'In Cart'
        }
        console.log("cartData==>", cartData);

        const oldData = await cartSchema.findOne({
            user_loginId: req.body.user_login_id,
            product_Id: req.body.product_Id
        })
        console.log("oldData==>", oldData);

        if (oldData?.status==='In Cart') {
            const updateData = await cartSchema.updateOne({ _id: oldData._id }, { $set: { quantity: oldData.quantity + 1 } })
            console.log("updateData==>",updateData);
            
            if (updateData) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: "Quantity incremented successfully"
                })
            }
        } else {
            const data = {
                user_loginId: req.body.user_login_id,
                product_Id: req.body.product_Id,
                quantity: 1,
                status: 'In Cart'
            }
            const addData = await cartSchema(data).save()
            console.log(addData);

            if (addData) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: "Data added to cart successfully"
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Data cannot added "
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

// view cart

cartRoutes.get('/view_cart/:id', async (req, res) => {
    try {
    const id=req.params.id

        const viewData = await cartSchema.aggregate([//group chyan vendii
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_loginId',
                    'foreignField': 'loginId',
                    'as': 'user'
                }//databasel aggregate chytha code evide kond eda
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'product_Id',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }, {
                '$unwind': '$user'
                //array ozhivakkan vendi array annegil group chyan pattilaa
            }, {
                '$unwind': '$product'
            },
            {
                '$match':{
                    'user_loginId': new mongoose.Types.ObjectId(id)//match chyan vendi use chyaa match chyan onnum illengil direct group chyam
                }
            },
            // {
            //     '$match':{
            //         'status': 'In Cart'
            //     }
            // },
            {
                '$group': {
                    '_id': '$_id',
                    'quantity': { '$first': '$quantity' },
                    'status': { '$first': '$status' },
                    'Name': { '$first': '$user.Name' },
                    'Mobile': { '$first': '$user.Mobile' },
                    'productName': { '$first': '$product.productName' },
                    'price': { '$first': '$product.price' },
                    'product_img': { '$first': '$product.product_img' },
                    'category': { '$first': '$product.category' },
                    'user_loginId': { '$first': '$user.loginId' },

                    //venda field mathram group chyan vendii

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


// cart delete

cartRoutes.post('/delete-cart/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delData = await cartSchema.deleteOne({ _id: id })
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


//quantity increment

cartRoutes.post('/quantity-increment/:id', async (req, res) => {
    try {
        // const id='66ea6c3efcc0788504e8b830'
        const id = req.params.id
        console.log("id==>", id);
        const data = await cartSchema.findOne({ _id: id })
        const newquantity = data.quantity + 1
        const updateData = await cartSchema.updateOne({ _id: id }, { $set: { quantity: newquantity } })
        console.log("updateData==>", updateData);

        if (updateData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Quantity incremented successfully"

            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Quantity cannot incremented"
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
cartRoutes.post('/quantity-decrement/:id', async (req, res) => {
    try {
        // const id='66ea6c3efcc0788504e8b830'
        const id = req.params.id
        console.log("id==>", id);
        const data = await cartSchema.findOne({ _id: id })
        const newquantity = data.quantity - 1
        const updateData = await cartSchema.updateOne({ _id: id }, { $set: { quantity: newquantity } })
        console.log("updateData==>", updateData);

        if (updateData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Quantity decrement successfully"

            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Quantity cannot decremented"
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



//cart update

cartRoutes.post('/status-update/:id',async(req,res)=>{
    try {
        const id=req.params.id
       
        const updateData = await cartSchema.updateMany({  user_loginId: id }, { $set: {'status':'order placed'} })
        console.log("updatedata==>",updateData);
        
        if (updateData.modifiedCount>0) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Order placed successfully"
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












module.exports = cartRoutes
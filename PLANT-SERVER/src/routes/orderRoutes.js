const express=require('express')
const orderSchema = require('../models/orderSchema')
const cartSchema = require('../models/cartSchema')
const { default: mongoose } = require('mongoose')

const orderRoutes=express.Router()

orderRoutes.get('/cart-addproduct-order/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const orderData=await cartSchema.find({ user_loginId: id,status:'In Cart'})
        console.log("orderData==>",orderData);
      for(let i=0;i<orderData.length;i++){
        const arrayData={
            user_loginId:orderData[i].user_loginId,
            product_Id:orderData[i].product_Id,
            quantity:orderData[i].quantity,
            status:"Order Placed"
        }
        const addData = await orderSchema(arrayData).save()
        console.log("addData==>",addData);

      } 
      const deleteCart=await cartSchema.deleteMany({user_loginId: id})
      console.log("deleteCart==>",deleteCart);
      


      return res.status(200).json({
        success:true,
        error:false,
        message:"Order Placed Successfully"
        
      })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal serever error",
            errorMessage: error
        })
    }
})

orderRoutes.get('/myorder/:id',async(req,res)=>{
    try {
        const id=req.params.id
        console.log("id==>",id);
        
        const viewData=await orderSchema.aggregate([
            {
              '$lookup': {
                'from': 'products', 
                'localField': 'product_Id', 
                'foreignField': '_id', 
                'as': 'order'
              }
            },{
                '$unwind':'$order'
            }, {
                '$match':{
                'user_loginId': new mongoose.Types.ObjectId(id)//match chyan vendi use chyaa match chyan onnum illengil direct group chyam
            }
            },
            {
                '$group': {
                    '_id': '$_id',
                    'quantity': { '$first': '$order.quantity' },
                    'productName': { '$first': '$order.productName' },
                    'price': { '$first': '$order.price' },
                    'product_img': { '$first': '$order.product_img' },
                    'category': { '$first': '$order.category' },
                    

                    //venda field mathram group chyan vendii

                }
            }
          ])
        console.log("viewData==>",viewData);
        if(viewData){
            return res.status(200).json({
                success:true,
                error:false,
                data:viewData,
                message:"order product viewed successfully"
            })
        }else{
            return res.status(200).json({
                success:false,
                error:true,
                message:"data cannot viewed"
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

module.exports=orderRoutes
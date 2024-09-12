const express=require('express')
const userSchema = require('../models/userSchema')
const shopSchema = require('../models/shopSchema')
const productSchema = require('../models/productSchema')
const loginSchema = require('../models/loginSchema')




const adminRoutes=express.Router()

// ###USER PROFILE VIEW  ####//
adminRoutes.get('/adminUser-view',async(req,res)=>{
    try {
        const viewData=await userSchema.find().populate('loginId')
    if(viewData){
        return res.status(200).json({
            success:true,
            error:false,
            data:viewData,
            message:"Data viewed successfully"
        })
    }else{
        return res.status(400).json({
            success:false,
            error:true,
            message:"Data cannot viwed"
        })
    }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:"Internal server error ",
            errorMessage:error
        })
    }
})
// ### USER PROFILE DELETE  ####//
adminRoutes.post('/adminUser-delete/:id',async(req,res)=>{
   try {
    
    const id=req.params.id
    const delData=await userSchema.deleteOne({loginId:id})
    if(delData.deletedCount==1){
        const deleteLogin=await loginSchema.deleteOne({_id:id})
        if(deleteLogin.deletedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:"Data deleted successfully"
            })
        }
       
       
    }else{
        return res.status(400).json({
            success:false,
            error:true,
            message:"Data cannot deleted"
        })
    }
   } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:"Internal server error ",
            errorMessage:error
        })
   }
})

// ### USER PROFILE UPDATE  ####//
adminRoutes.put('/adminUser-edit/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const oldData=await userSchema.findOne({_id:id})
        const data={
            Name:req.body.Name?req.body.Name:oldData.Name,
            Address:req.body.Address?req.body.Address:oldData.Address,
            Mobile:req.body.Mobile?req.body.Mobile:oldData.Mobile,
            Age:req.body.Age?req.body.Age:oldData.Age
        }
        const newData=await userSchema.updateOne({_id:id},{$set:data})
        if(newData){
            return res.status(200).json({
                success:true,
                error:false,
                message:'Data updated successfully',
                data:newData
            })
        }else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"Data cannot updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:"internal server error",
            errorMessage:error

        })
        
    }
})



// ### SHOP PROFILE VIEW  ####//
adminRoutes.get('/adminShop-view',async(req,res)=>{
    try {
        const viewData=await shopSchema.find().populate('loginId')
    if(viewData){
        return res.status(200).json({
            success:true,
            error:false,
            data:viewData,
            message:"Data viewed successfully"
        })
    }else{
        return res.status(400).json({
            success:false,
            error:true,
            message:"Data cannot viwed"
        })
    }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:"Internal server error ",
            errorMessage:error
        })
    }
})
// ###SHOP PROFILE DELETE  ####//
adminRoutes.post('/adminShop-delete/:id',async(req,res)=>{
   try {
    
    const id=req.params.id
    const delData=await shopSchema.deleteOne({_id:id})
    if(delData.deletedCount==1){
        return res.status(200).json({
            success:true,
            error:false,
            message:"Data deleted successfully"
        })
    }else{
        return res.status(400).json({
            success:false,
            error:true,
            message:"Data cannot deleted"
        })
    }
   } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:"Internal server error ",
            errorMessage:error
        })
   }
})

// ###SHOP PROFILE UPDATE  ####//
adminRoutes.put('/adminShop-edit/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const oldData=await shopSchema.findOne({_id:id})
        const data={
            shopName:req.body.shopName?req.body.shopName:oldData.shopName,
            Address:req.body.Address?req.body.Address:oldData.Address,
            Mobile:req.body.Mobile?req.body.Mobile:oldData.Mobile,
           
        }
        const newData=await shopSchema.updateOne({_id:id},{$set:data})
        if(newData.modifiedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:'Data updated successfully',
                data:newData
            })
        }else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"Data cannot updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:"internal server error",
            errorMessage:error

        })
        
    }
})
//### PRODUCT ###//


// ### PRODUCT VIEW ##//
adminRoutes.get('/adminProduct-view', async (req, res) => {
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
adminRoutes.put('/adminProduct-edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const oldData = await productSchema.findOne({ _id: id })
        const data = {
            productName: req.body.productName ? req.body.productName : oldData.productName,
            description: req.body.description ? req.body.description : oldData.description,
            price: req.body.price ? req.body.price : oldData.price,
            quantity:req.body.quantity ? req.body.quantity : oldData.quantity
        }
        const updateData = await productSchema.updateOne({ _id: id }, { $set: data })
        if (updateData.modifiedCount==1) {
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
adminRoutes.post('/adminProduct-delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const delData = await productSchema.deleteOne({ _id: id })
        if (delData.deletedCount==1) {
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
// ##ADMIN USER APPROVEL##//
adminRoutes.post('/approve-user/:id',async(req,res)=>{
    try {
        const id=req.params.id
        console.log(id);

       const updatedData=await loginSchema.updateOne({_id:id},{$set:{status:'Approved'}})
       
       console.log(updatedData);
       
        if(updatedData.modifiedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:"user has been approved"
            })
        }
        
        
        else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"Error while updating "
                
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
// ##ADMIN USER REJECTED##//

adminRoutes.post('/reject-user/:id',async(req,res)=>{
    try {
        const id=req.params.id
       const updatedData=await loginSchema.updateOne({_id:id},{$set:{status:'rejected'}})
        if(updatedData.modifiedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:"user has been rejected  "
            })
        }else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"Error while updating "
                
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
// ##ADMIN SHOP APPROVEL##//

adminRoutes.post('/approve-shop/:id',async(req,res)=>{
    try {
        const id=req.params.id
        console.log("id===>",id);
       const updatedData=await loginSchema.updateOne({_id:id},{$set:{status:'Approved'}})
       
        if(updatedData.modifiedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:"shop has been approved"
            })
        }else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"Error while updating "
                
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
// ##ADMIN SHOP REJECTED##//

adminRoutes.post('/reject-shop/:id',async(req,res)=>{
    try {
        const id=req.params.id
       const updatedData=await loginSchema.updateOne({_id:id},{$set:{status:'Rejected'}})
        if(updatedData.modifiedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:"shop has been rejected"
            })
        }else{
            return res.status(400).json({
                success:false,
                error:true,
                message:"Error while updating "
                
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

// ### PRODUCT STATUS APPROVED ###//
adminRoutes.post('/product-approve/:id', async (req, res) => {
    try {
        const id=req.params.id
        const updateData = await productSchema.updateOne({ _id: id }, { $set: { status: "Approved" } })
        if (updateData.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "product has been approved"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Error while updating"
            })
        }
    } catch (error) {
        return res.status(500).json({

            success: false,
            error: true,
            errorMessage: error,
            message: "internal server error"
        })
    }
})
// ### PRODUCT STATUS REJECTED ###//
adminRoutes.post('/product-reject/:id', async (req, res) => {
    try {
        const id=req.params.id
        const updateData = await productSchema.updateOne({ _id: id }, { $set: { status: "Rejected" } })
        if (updateData.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "product has been rejected"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Error while updating"
            })
        }
    } catch (error) {
        return res.status(500).json({

            success: false,
            error: true,
            errorMessage: error,
            message: "internal server error"
        })
    }
})
















module.exports=adminRoutes
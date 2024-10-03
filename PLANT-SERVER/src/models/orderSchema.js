const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({

    user_loginId:{
        type:mongoose.Types.ObjectId,
        ref:'login',
        required:true
    },
    product_Id:{
        type:mongoose.Types.ObjectId,
        ref:'product',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('order',orderSchema)
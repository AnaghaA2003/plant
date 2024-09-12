const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    product_img:{
        type:String,
    },
    shop_login_id:{
        type:mongoose.Types.ObjectId,
        ref:'login'
    }

})








module.exports=mongoose.model('product',productSchema)
const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    shop_login_id:{
        // foreign key 
        type:mongoose.Types.ObjectId,
        ref:'login'
    },
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

})








module.exports=mongoose.model('product',productSchema)
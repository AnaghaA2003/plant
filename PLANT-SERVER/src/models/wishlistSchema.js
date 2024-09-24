const mongoose=require('mongoose')
const wishlistSchema=new mongoose.Schema({
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
})













module.exports=mongoose.model('wishlist',wishlistSchema)
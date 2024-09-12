const mongoose=require('mongoose')
const shopSchema=new mongoose.Schema({
    loginId:{
        type:mongoose.Types.ObjectId,
        ref:'login',
        required:true
    },
    shopName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Mobile:{
        type:String,
        required:true
    },
    shop_img:{
        type:String,
    }
    
 
 
})

module.exports=mongoose.model('shop',shopSchema)

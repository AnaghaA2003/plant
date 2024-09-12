const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    loginId:{
        type:mongoose.Types.ObjectId,
        ref:'login',
        required:true
    },
    Name:{
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
    Age:{
        type:String,
        required:true
    },
    user_img:{
        type:String,
    }

})

module.exports=mongoose.model('user',userSchema)

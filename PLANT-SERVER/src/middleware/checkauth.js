const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try {
        console.log(req.headers.authorization);
        const token=(req.headers.authorization).split(" ")[1];
        const decodedToken=jwt.verify(token,"private-key");
        console.log("decoded==>",decodedToken);
        
        req.userData={userLoginId:decodedToken.userLoginId,role:decodedToken.role,email:decodedToken.email,status:decodedToken.status}
        next();
    } catch (error) {
        res.status(401).json({
            message:'Auth failed! please login'
        })
    }
}
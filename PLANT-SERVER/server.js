const express=require('express')

const app=express()
const mongoose=require('mongoose');
const cors=require('cors')
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

require('dotenv').config();//contents of .env
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Database connected successfully');
}).catch((error)=>{
    console.log(error);
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)
app.use('/api/shop',shopRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/wishlist',wishlistRoutes)
app.use('/api/order',orderRoutes)

app.get('/',(req,res)=>{
    return res.send('Welcome')
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on http://localhost:5000");
})
const dotenv=require('dotenv').config();
const port = 4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer = require("multer");
const path=require("path");
const cors=require("cors");

app.use(express.json());
app.use(cors());

//db connection with mongodb
mongoose.connect(process.env.MONGODB_URI);

//api creation
app.get("/",(req,res)=>{
    res.send("Express app is running")
})

//image storage engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

//upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products

const Product= mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    }, 
})

//schema for user
const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
})

//signup endpoint
app.post('/signup', async (req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"user with this email already exists"})
    }
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

//login endpoint
app.post('/login', async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        //console.log(user.id);
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user._id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({
                success:false,
                error:"Wrong password"
            })
        }
    }
    else{
        res.json({success:false,errors:"Wrong email id"});
    }
})

//api for adding products to database
app.post("/addproduct",async (req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product=products[products.length-1];
        id=last_product.id+1;
    }
    else id=1;
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//api for removing products from db
app.post("/removeproduct", async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
}) 

//api for getting all products
app.get("/allproducts",async (req,res)=>{
    let products=await Product.find({});
    //console.log("All products fetched");
    res.send(products);
})

//api for new collections
app.get("/newcollections", async (req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    //console.log("New collection fetched");
    res.send(newcollection);
})

//api for popular in women
app.get("/popularinwomen", async (req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    //console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//middleware for identifying user from auth-token
const fetchUser = (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//endpoint for adding items to cart
app.post('/addtocart', fetchUser, async (req,res)=>{
    //console.log(typeof(req.user.id));
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})

//endpoint for removing item from cart
app.post('/removefromcart', fetchUser, async (req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

//endpoint for updating cart items in shopcontext
app.post('/cartitems', fetchUser, async (req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error) console.log("Server running on Port "+port);
    else console.log("Error :"+error);
});
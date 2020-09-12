var express = require("express");
const session  = require('express-session');
var bodyParser = require("body-parser");
var app = express()
var cors = require("cors")
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded(
    {extended:true}
))
app.use(session({secret:"ssshhhhsshhh",saveUninitialized:true,resave:true}));



app.set("view engine","ejs");








app.use("/signup",require("./routes/usersign"))
app.use("/login",require("./routes/userlog"))
app.use("/add",require("./routes/goodsadd"))
app.use("/update",require("./routes/updateitem"))
app.use("/sellerhistory",require("./routes/sellerhistory"))
app.use("/Wishlisted",require("./routes/wishlist"))
app.use("/AddedTOBag" , require("./routes/addbag"))
app.use("/graph",require("./routes/graph"))
app.use("/search",require("./routes/search"))
app.use("/profile",require("./routes/profile"))
app.use("/history",require("./routes/customerhistory"))
app.use("/home",require('./routes/home'))

app.get( "/" ,(req,res) => {
            
    res.redirect('index.html')
})
app.get("/logout" , function (req,res,next)  {
    if (req.session){
    req.session.destroy(function(err){
        if(err){
            return next(err);
        }else{
           return res.redirect("/")
        }
    })
}
    
})


app.listen(5000)
console.log("port is active on 5000")
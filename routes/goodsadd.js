var router = require("express").Router();
const db = require("../db")
const x = require("../routes/userlog");
const { collection } = require("../db");
const multer = require("multer");
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./public/uploads/');
    },
    filename : function(req,file,cb){
        cb(null,file.filename+"_"+Date.now()+file.originalname);
    }
});
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
var upload = multer({storage:storage,
limits:{
    fileSize: 1024 * 1024 * 6
},
fileFilter:fileFilter
}).single("photo");
global.globalVariable2 = { a:multer,b:storage,c:fileFilter ,d: upload} 


router.get("/", async (req,res) => {
    res.redirect("sellergoods.html")
})

router.post("/" ,upload ,async (req,res) =>{
    
    
    //let sellername =  name.username ;
    let item = {
        "itemname":req.body.itemname,
        "sellername": globalVariable.username,
        "cost":req.body.cost,
        "manufacturedetails":req.body.manufacturedetails,
        "discount":req.body.discount,
        "quantityavailable":req.body.Quantity,
        "Noofpurchase":0,
        "customername":[],
        "productImage":req.file.filename

    }
    db.collection("goods").insertOne(item,(err,collection) => {
        console.log("addded successfully")
       res.redirect("/home")
           
    })
    


})









module.exports = router;
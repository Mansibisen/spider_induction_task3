
var router = require("express").Router();
var x = {value:null}
const db = require("../db");
const { collection } = require("../db");

const multer = globalVariable2.a
const storage = globalVariable2.b
const fileFilter = globalVariable2.c
var upload = globalVariable2.d
router.post("/" ,upload,async (req,res) => {
    if(req.file){
        var data ={"itemname":req.body.itemname,
        "sellername": globalVariable.username,
        "cost":req.body.cost,
        "manufacturedetails":req.body.manufacturedetails,
        "discount":req.body.discount,
        "quantityavailable":req.body.Quantity,
        "productImage":req.file.filename
    }
    }else{
        var data ={"itemname":req.body.itemname,
    "sellername": globalVariable.username,
    "cost":req.body.cost,
    "manufacturedetails":req.body.manufacturedetails,
    "discount":req.body.discount,
    "quantityavailable":req.body.Quantity,
}
}
    x.value = req.body.itemname
    console.log(req.body.cost)
    res.render("updategoods",{data:data})
})
router.post("/item" ,upload,async (req,res) => {
    if(req.file){
        var data ={"itemname":req.body.itemname,
        "sellername": globalVariable.username,
        "cost":req.body.cost,
        "manufacturedetails":req.body.manufacturedetails,
        "discount":req.body.discount,
        "quantityavailable":req.body.Quantity,
        "productImage":req.file.filename
    }
    }else{
        var data ={"itemname":req.body.itemname,
    "sellername": globalVariable.username,
    "cost":req.body.cost,
    "manufacturedetails":req.body.manufacturedetails,
    "discount":req.body.discount,
    "quantityavailable":req.body.Quantity,
}
}
    
    db.collection("goods").updateOne({"itemname":x.value},{$set :data},(err,collection) =>{
        if (err) throw err ;
        console.log("updated value")
        res.redirect("/home")
        /*db.collection("goods").find({}).toArray((err,result) =>{
            
            let data ={value: result}
             res.render("sellerdashboard",{data:data})
        })*/
        

    })
})



module.exports = router;
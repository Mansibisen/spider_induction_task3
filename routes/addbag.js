var router = require("express").Router();

const db = require("../db")
const multer = globalVariable2.a
const storage = globalVariable2.b
const fileFilter = globalVariable2.c
var upload = globalVariable2.d
router.post("/",(req,res) => {
    let item2 = {
        "itemname":req.body.itemname,
    "sellername": req.body.name,
    "cost":req.body.cost,
    "manufacturedetails":req.body.manufacturedetails,
    "discount":req.body.discount,
    "quantity":req.body.Quantity

    }
    console.log(item2)
    db.collection("goods").find({"itemname":req.body.itemname ,"sellername": req.body.name,"cost":req.body.cost,"manufacturedetails":req.body.manufacturedetails,"discount":req.body.discount}).toArray((err,result) =>{
    /*let data ={
        "itemname":req.body.itemname,
        "sellername": req.body.name,
        "cost":req.body.cost,
        "manufacturedetails":req.body.manufacturedetails,
        "discount":req.body.discount,
        "quantity":req.body.Quantity,
        "productImage":req.file.filename
    }*/
    let data = result[0]
    data.quantity = req.body.Quantity
    
    db.collection("authcheck").find({"username" : globalVariable.username}).toArray((err,result) =>{
        let x = result[0].MYcart
        let y = result[0].history
        x.push(data)
        let data2 = data
        data2.status="on the way"
        y.push(data2)
        
    db.collection("authcheck").updateOne({"username":globalVariable.username},{$set : {"MYcart":x,"history":y}} , function(err,collection){
        console.log("added to bag")
        
        db.collection("goods").find({"itemname":req.body.itemname,"sellername":req.body.name}).toArray((err,result) => {
            console.log(result)
            let n = Number(result[0].Noofpurchase) + Number(req.body.Quantity)
            let a =  Number(result[0].quantityavailable) - Number(req.body.Quantity)
            let c = result[0].customername
            c.push(globalVariable.username)
            db.collection("goods").updateOne({"itemname":req.body.itemname,"sellername":req.body.name},{$set :{"Noofpurchase" : n,"customername":c,"quantityavailable":a}},function (err,collection){
                console.log("goods updated")
                db.collection("authcheck").find({"username":globalVariable.username}).toArray((err,result) => {
                    let data ={ value:result[0].MYcart}
                    return res.render("bag",{data:data})
                })
                
            })
        })
    })
})
    })
})
router.post("/check" , (req,res) => {
    db.collection("authcheck").find({"username" :globalVariable.username}).toArray((err,result) =>{
        let x = result[0].MYcart
        let data = {value :x}
        return res.render("bag",{data :data})
     })
})
router.post("/remove" ,(req,res) => {
    let i = req.body.count
    db.collection("authcheck").find({"username" :globalVariable.username}).toArray((err,result) => {
        let x = result[0].MYcart
        let y = result[0].history
        let d1 = y[i]
        d1.status="cancelled"
        let d = x[i]
        x.pop(i)
        console.log("from x",x)
       
        db.collection("authcheck").updateOne({"username":globalVariable.username},{$set : {"MYcart":x,"history":y}}, function (err,result){
            if (err) throw err ;
            console.log(result)
            // console.log("removed from bag")
             db.collection("authcheck").find({"username" :globalVariable.username}).toArray((err,result) =>{
             db.collection("goods").find({"itemname":d.itemname , "sellername" : d.sellername}).toArray( (err,result) =>{
                let a = Number( result[0].quantityavailable) + Number(d.quantity)
                let n = Number(result[0].Noofpurchase) - Number(d.quantity)
                let b = result[0].customername
                b.pop(globalVariable.username)
                db.collection("goods").updateOne({"itemname":d.itemname , "sellername" : d.sellername},{$set:{"Noofpurchase" : n,"customername":b,"quantityavailable":a}}, function (err,collection){
                    console.log("goods updated")
                })
             })
            // db.collection("authcheck").find({"username" :globalVariable.username}).toArray((err,result) =>{
                let y = result[0].MYcart
                console.log(result[0].MYcart)
               let data = {value :y}
               return res.render("bag",{data :data})
    })
        })
    })
})
module.exports = router;

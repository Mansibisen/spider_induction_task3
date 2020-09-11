var router = require("express").Router();

const db = require("../db")
router.post("/",async (req,res) => {
    let item2 = {
        "itemname":req.body.itemname,
    "sellername": req.body.name,
    "cost":req.body.cost,
    "manufacturedetails":req.body.manufacturedetails,
    "discount":req.body.discount,
    "quantity":req.body.Quantity

    }
    console.log(item2)
    db.collection("goods").find({"itemname":req.body.itemname,"sellername": req.body.name,"cost":req.body.cost,"manufacturedetails":req.body.manufacturedetails,"discount":req.body.discount}).toArray((err,result) =>{
    /*let item = {
        "itemname":req.body.itemname,
    "sellername": req.body.name,
    "cost":req.body.cost,
    "manufacturedetails":req.body.manufacturedetails,
    "discount":req.body.discount,
    "quantity":req.body.Quantity

    }*/
    if (err) throw err
    let item = result[0]
    console.log(item)
    item.quantity = req.body.Quantity
    let y = {"username":globalVariable.username}
     db.collection("authcheck").find(y).toArray((err,result) =>{
        
        let x = result[0].wishlist
        x.push(item)
        db.collection("authcheck").updateOne({"username":globalVariable.username},{$set : {"wishlist":x}} , function(err,collection){
            console.log("added to wishlist")
        })
        let data = {value :x}
        return res.render("wishlistpage",{data :data})



     })
    })
})
router.post("/bag" , async (req,res) => {
    let i = req.body.count
    db.collection("authcheck").find({"username" : globalVariable.username}).toArray((err,result) =>{
        let x = result[0].wishlist
        let d = x[i]
        let x1 = result[0].MYcart
        let y = result[0].history
        x1.push(d)
        
        let data2 = d
        data2.status="on the way"
        y.push(data2)
        db.collection("authcheck").updateOne({"username":globalVariable.username},{$set : {"MYcart":x1,"history":y}} , function(err,collection){
            console.log("added to bag")
            x.pop(i)
            db.collection("authcheck").updateOne({"username":globalVariable.username},{$set:{"wishlist":x}} , function(err,collection){
                console.log("wishlist updated")
            })
            db.collection("goods").find({"itemname":d.itemname,"sellername":d.sellername}).toArray((err,result) => {
                console.log(result[0].Noofpurchase)
                console.log(d.quantity)
                let n = Number(result[0].Noofpurchase) + d.quantity
                let a =  result[0].quantityavailable - d.quantity
                let c = result[0].customername
                c.push(globalVariable.username)
                db.collection("goods").updateOne({"itemname":d.itemname,"sellername":d.sellername},{$set :{"Noofpurchase" : n,"customername":c,"quantityavailable":a}},function (err,collection){
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
router.post("/check" , async (req,res) => {
    db.collection("authcheck").find({"username" :globalVariable.username}).toArray((err,result) =>{
        
        let x = result[0].wishlist
        
       
        let data = {value :x}
        return res.render("wishlistpage",{data :data})



     })

})
router.post("/remove",async(req,res) => {
    console.log(globalVariable.username)
    let i = req.body.count
    db.collection("authcheck").find({"username":globalVariable.username}).toArray((err,result) => {
        let x = result[0].wishlist
        x.pop(i)
        db.collection("authcheck").updateOne({"username":globalVariable.username},{$set:{"wishlist":x}},function (err,collection){
            console.log("removed from wishlist")
            db.collection("authcheck").find({"username" :globalVariable.username}).toArray((err,result) =>{
                 let y = result[0].wishlist
                let data = {value :y}
                return res.render("wishlistpage",{data :data})
     })
        })
    })
})
module.exports = router;
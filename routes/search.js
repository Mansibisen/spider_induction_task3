var router = require("express").Router();
const db = require("../db")


router.post("/" , async (req,res) => {
    db.collection("goods").find({"itemname":req.body.item}).toArray((err,result) =>{
        
        
        data ={value:result}
        res.render("searchresult",{data:data})
    })
})

module.exports = router;
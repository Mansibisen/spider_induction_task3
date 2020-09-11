var router = require("express").Router();

const db = require("../db")

router.post("/" , async (req,res) => {
    
    db.collection("goods").find({"sellername":globalVariable.username}).toArray((err,result) =>{
        console.log("found")
        console.log(result)
        data ={value:result}
        res.render("historypage",{data:data})
    })

})
   
module.exports = router;
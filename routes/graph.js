var router = require("express").Router();
const db = require("../db")


router.get("/" , async (req,res) => {
    db.collection("goods").find({"sellername":globalVariable.username}).toArray((err,result) =>{
        
        
        data ={value:result}
        console.log(result)
       
        res.render("graph",{data:data})}
    )
})

module.exports = router;
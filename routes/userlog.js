var router = require("express").Router();

var bcrypt = require('bcrypt');

const db = require("../db")

router.get("/", async (req,res) => {
    res.redirect("login.html")
})
router.post("/" , async (req,res) => {
    try{
     global.globalVariable = { username: req.body.username}   
    db.collection("authcheck").findOne({"username":req.body.username}).then(
        result => {
            
            if(result){
               if(  bcrypt.compare( req.body.password,result.password)){
                console.log("logged in successfully");
                
                if(result.role==="seller"){
                    db.collection("goods").find({"sellername":req.body.username}).toArray((err,result) =>{
                        
                        let data ={value:result}
                        return res.render("sellerdashboard",{data:data})
                    })
                   
                }else{
                    db.collection("goods").find({}).toArray((err,result) =>{
                        
                        
                        function compare(a,b){
                            if(a.itemname> b.itemname){
                                   return 1
                               }else{
                                   return -1 
                               }
                           }
                        
                        let data ={value:result.sort(compare)}
                        return res.render("customerdashboard",{data:data})
                    })
                    
                }
               
                
               }
                
            }else{
                console.log("user doesn't exist");
                return res.redirect('login.html')
            }
        }
    )}catch(err){
        console.log(err)
    }

})
router.get("/home", async (req,res) => {
     await db.collection("goods").find({"sellername":globalVariable.username}).then(result =>{
        console.log(result)
        let data ={value:result}
        return res.render("sellerdashboard",{data:data})
    })

})


module.exports = router;
var router = require("express").Router();
const db = require("../db")


router.get("/" , async (req,res) => {
    try{
    db.collection("authcheck").findOne({"username":globalVariable.username}).then(
        result => {
            
            if(result){
               
                
                if(result.role==="seller"){
                    db.collection("goods").find({"sellername":globalVariable.username}).toArray((err,result) =>{
                        
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
               
                
               
                
            }else{
                console.log("user doesn't exist");
                return res.redirect('login.html')
            }
        }
    )}catch(err){
        console.log(err)
    }


})

module.exports = router;
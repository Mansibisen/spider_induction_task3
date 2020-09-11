var router = require("express").Router();
const Post = require("../modles/post");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../db")
router.get("/",async (req,res) => {
    res.redirect("signup.html")
})
router.post("/" , async (req,res) => {
    //const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password,10)
   
    let data = {
        "username" :req.body.username,
        "phone" : req.body.phone,
        "email" : req.body.email,
        "role" : req.body.role,
        "password":hashedPassword
     }
    let saved = await db.collection("authcheck").findOne({"username" :req.body.username}).then( result => {
        if(result){
            console.log("user already exists")
            return res.redirect("signup.html")
        }else{
            db.collection("authcheck").findOne({"phone" : req.body.phone}).then( result => {
                if(result){
                    console.log("phone number  already exists")
                    return res.redirect("signup.html")
                }else{
                    db.collection("authcheck").findOne({"email" : req.body.email}).then( result => {
                        if(result){
                            console.log("email already exists")
                            return res.redirect("signup.html")
                        }else{
            try{
                
                
               
                let data2 = {
                    "username" :req.body.username,
                    "phone" : req.body.phone,
                    "email" : req.body.email,
                    "role" : req.body.role,
                    "history":[],
                    "wishlist":[],
                    "MYcart":[],
                    "password":hashedPassword
                 }
           db.collection('authcheck').insertOne(data2,function(err,collection){
                if(err) throw err ;
                console.log('record inserted successfully')
                return res.redirect('login.html')
            })
        
        }catch(e){
                console.log(e)
            }
        }
        })
        }
        })
        }
    
        
    })

}
)
module.exports = router;
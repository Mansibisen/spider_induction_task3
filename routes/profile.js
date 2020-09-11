var router = require("express").Router();
const db = require("../db")


router.post("/", async (req,res) => {
    db.collection('authcheck').find({"username":globalVariable.username}).toArray(function(err,result){
		
		var data = {value:result[0]}
		if (err) throw err ;
		res.render("profile",{data:data})
	
	})
     
})

module.exports = router;
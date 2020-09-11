const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);


    try{
        mongoose.connect("mongodb://localhost:27017/spider_inductions_task2")
        var db = mongoose.connection
       db.on("error",console.log.bind(console,"connection error"))
      db.once("open",function(callback){
        console.log("connection succeeded ");})

    }
    catch(e){
        console.log(e)
    }



module.exports = db ;
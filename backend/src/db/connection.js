let mongoose = require ("mongoose");

mongoose.connect("mongodb://localhost:27017/Registered_Users").then(()=>{
    console.log(`Database connected successfully`);
}).catch((error)=>{
    console.log("Conection failed !");
})
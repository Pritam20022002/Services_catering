const mongoose = require("mongoose");

//SCHEMA :-
const userSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    }
})

//Collection:-
const Register = new mongoose.model("Register", userSchema);
module.exports = Register;
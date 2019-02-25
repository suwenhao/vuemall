let mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    password:{type:String},
    username:{type:String},
    createat:{type:Date,default:Date.now()},
    lastloginat:{type:Date,default:Date.now()},
})


let User = mongoose.model('User', userSchema);

module.exports=User;
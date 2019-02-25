let mongoose = require('mongoose')

var cartSchema = new mongoose.Schema({
    GOODS_ID:{type:String},
    JOIN_TIME:{type:Date,default:Date.now()},
    QUANTITY:{type:Number},
    USERID:{type:String},
})


let Cart = mongoose.model('Cart', cartSchema);

module.exports=Cart;
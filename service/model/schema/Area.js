let mongoose = require('mongoose')

var areaSchema = new mongoose.Schema({
    NAME:{type:String},
    VALUE:{type:String},
    PARENT:{type:String},
})


let Area = mongoose.model('Area', areaSchema);

module.exports=Area;
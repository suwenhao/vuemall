const fs = require('fs')

let data = fs.readFileSync('./data_json/goods.json','utf8')
let newData = JSON.parse(data)
let pushData = []
newData.RECORDS.forEach((v,i)=>{
    if(v.IMAGE1!=null){
        pushData.push(v)
    }
})
console.log(pushData.length)
console.log(pushData)
fs.writeFileSync('./newGoods.json',JSON.stringify(pushData))
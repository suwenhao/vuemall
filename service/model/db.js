const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/vuemall"
const par = { useNewUrlParser: true }

exports.connect=()=>{
    //链接数据库
    mongoose.connect(db,par);
    let maxConnectTimes = 0
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',(err)=>{
            console.log('************数据库断开************')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db,par);
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为处理')
            }
        })
        mongoose.connection.on('error', ()=>{
            console.log('************数据库链接错误************')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db,par);
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为处理')
            }
        });
        mongoose.connection.once('open', ()=>{
            console.log('mongodb打开成功');
            resolve()
        });
    })
};
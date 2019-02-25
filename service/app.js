const Koa = require('koa'),
      Router = require('koa-router'),
      Static = require('koa-static'),
      Session = require('koa-session'),
      BodyParser = require('koa-bodyparser'),
      cors = require('koa-cors'),
      path = require('path'),
      {connect} = require('./model/db.js');
const app = new Koa();
const router = new Router();

;(async ()=>{
    await connect()
})()

// //配置session
app.keys = ['some secret hurr'];
app.use(Session({
    key: 'koa:sess',
    maxAge: 8640000,
    overwrite: true,
    httpOnly: true,
    signed: true, 
    rolling: true, 
    renew: false
},app))

//配置静态资源
app.use(Static(path.join(__dirname,'public')))
//配置post请求数据接收
app.use(BodyParser());
//跨域
app.use(cors())
//拦截404页面
app.use(async(ctx,next)=>{
    // ctx.compress = true
    await next();
    if(ctx.status===404){
        ctx.body = {
            msg:'404',
            code:1,
            status:404
        }
    }
})
//挂载接口
const api = require('./routes/api.js');
router.use('/api',api);

// //启动路由
app.use(router.routes());
app.use(router.allowedMethods());

//启动服务器
app.listen(3000,(err)=>console.log('http://localhost:3000'));

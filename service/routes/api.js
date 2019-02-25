const Router = require('koa-router');
const User = require('../model/schema/User')
const Goods = require('../model/schema/Goods')
const Category = require('../model/schema/Category')
const Categorysub = require('../model/schema/Category_sub')
const Cart = require('../model/schema/Cart')
const Area = require('../model/schema/Area')
const util = require('../common/util')
const fs = require('fs')
const path = require('path')

const router = new Router();

router.get('/',async(ctx)=>{
    ctx.session.user = {
        userId:'5c710675a16dd53fa0780368',
        username:'13229710047',
    }
    console.log(ctx.session.user)
    ctx.body = '已登录'
})
//注册验证
router.post('/register', async (ctx)=>{
    let {username,password} = ctx.request.body
    console.log(username,password)
    let findUser = await User.findOne({username:username})
    console.log(findUser)
    if(findUser){
        ctx.body={
            msg:'已存在该用户',
            code:1
        }
    }else{
        let res = await User.create({username,password:util.md5Pwd(password)})
        console.log(res)
        if(res){
            ctx.session.user = res
            ctx.body={
                msg:'注册成功',
                code:0
            }
        }else{
            ctx.body={
                msg:'注册失败',
                code:1
            }
        }
    }
})
//登录验证
router.post('/login', async (ctx)=>{
    if(ctx.session.user){
        ctx.body={
            msg:'已经登录',
            code:0
        }
    }
    let {username,password} = ctx.request.body
    let findUser = await User.findOne({username:username})
    if(findUser){
        if(util.md5Pwd(password)==findUser.password){
            ctx.session.user = findUser
            ctx.body={
                msg:'登录成功',
                code:0
            }
        }else{
            ctx.body={
                msg:'密码出错',
                code:1
            }
        }
    }else{
        ctx.body={
            msg:'没有该用户',
            code:1
        }
    }
})
//导入商品数据
router.get('/insertAllGoods',async(ctx)=>{
    let data = fs.readFileSync(path.join(__dirname,'../data_json/newGoods.json'),'utf8')
    data = JSON.parse(data);
    for(let i=0;i<data.length;i++){
        await Goods.create(data[i])
    }
    let res = await Goods.find({})   
    ctx.body = {
        msg:'导入成功',
        data:res,
        code:0
    }
})
//导入商品分类数据
router.get('/insertAllCategory',async(ctx)=>{
    let data = fs.readFileSync(path.join(__dirname,'../data_json/category.json'),'utf8')
    data = JSON.parse(data);
    for(let i=0;i<data.length;i++){
        await Category.create(data[i])
    }
    let res = await Category.find({})    
    ctx.body = {
        msg:'导入成功',
        data:res,
        code:0
    }
})
//导入商品子分类数据
router.get('/insertAllCategorysub',async(ctx)=>{
    let data = fs.readFileSync(path.join(__dirname,'../data_json/category_sub.json'),'utf8')
    data = JSON.parse(data);
    for(let i=0;i<data.length;i++){
        await Categorysub.create(data[i])
    }
    let res = await Categorysub.find({})
    ctx.body = {
        msg:'导入成功',
        data:res,
        code:0
    }
})
//导入省市区数据
router.get('/insertAllArea',async(ctx)=>{
    let data = fs.readFileSync(path.join(__dirname,'../data_json/china_address.json'),'utf8')
    data = JSON.parse(data);
    for(let i=0;i<data.length;i++){
        await Area.create(data[i])
    }
    let res = await Area.find({})
    ctx.body = {
        msg:'导入成功',
        data:res,
        code:0
    }
})
//查询商品
router.get('/getGoods',async(ctx)=>{
    let goodsId = ctx.query.goodsId
    console.log(goodsId)
    const goods = await Goods.findOne({'ID':goodsId})
    if(goods){
        ctx.body = {
            msg:'查找商品成功',
            data:goods,
            code:0
        }
    }else{
        ctx.body = {
            msg:'查无此商品',
            data:{},
            code:1
        }
    }
})

//获取大类别数据
router.get('/getCategory',async(ctx)=>{
    try {
        const category = await Category.find({})
        if(category){
            ctx.body = {
                msg:'获取类别成功',
                data:category,
                code:0
            }
        }else{
            ctx.body = {
                msg:'暂无类别',
                data:{},
                code:1
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
//获取小类别数据
router.get('/getCategorysub',async(ctx)=>{
    let {cid} = ctx.query
    try {
        const categorysub = await Categorysub.find({MALL_CATEGORY_ID:cid})
        if(categorysub){
            ctx.body = {
                msg:'获取小类别成功',
                data:categorysub,
                code:0
            }
        }else{
            ctx.body = {
                msg:'暂无类别',
                data:{},
                code:1
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
//根据类别获取商品列表
router.get('/getGoodsListByCategorySubId',async(ctx)=>{
    let {categorysubId,page,pagesize} = ctx.query
    if(!page){
        page=1;
    }
    if(!pagesize){
        pagesize=10;
    }
    let skip=(page-1)*pagesize;
    let limit=parseInt(pagesize);
    try {
        const goodsList = await Goods.find({SUB_ID:categorysubId}).skip(skip).limit(limit);
        const count = await Goods.find({SUB_ID:categorysubId}).countDocuments()
        if(goodsList){
            ctx.body = {
                msg:'获取商品列表成功',
                data:goodsList,
                count:count,
                page:page,
                code:0
            }
        }else{
            ctx.body = {
                msg:'获取商品列表失败',
                data:{},
                code:1
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
//加入购物车
router.post('/setCart',async(ctx)=>{
    let userId = '5c710675a16dd53fa0780368'
    console.log(userId)
    let {goodsId,quantity} = ctx.request.body
    try {
        let oldCart = await Cart.findOne({USERID:userId,GOODS_ID:goodsId})
        if(oldCart){
            let res = await Cart.updateOne({"_id":oldCart._id},{$set:{QUANTITY:oldCart.QUANTITY+1}})
            if(res){
                ctx.body = {
                    msg:'加入成功',
                    data:res,
                    code:0
                }
            }else{
                ctx.body = {
                    msg:'加入失败',
                    data:{},
                    code:1
                }
            }
        }else{
            let res = await Cart.create({
                GOODS_ID:goodsId,
                QUANTITY:quantity,
                USERID:userId,
            })
            if(res){
                ctx.body = {
                    msg:'加入成功',
                    data:res,
                    code:0
                }
            }else{
                ctx.body = {
                    msg:'加入失败',
                    data:{},
                    code:1
                }
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
//修改购物车数量
router.post('/changeCart',async(ctx)=>{
    let {cartId,quantity} = ctx.request.body
    try {

        let res = await Cart.updateOne({"_id":cartId},{$set:{QUANTITY:quantity}})
        if(res){
            ctx.body = {
                msg:'修改成功',
                data:res,
                code:0
            }
        }else{
            ctx.body = {
                msg:'修改失败',
                data:{},
                code:1
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
//删除购物车
router.post('/removeCart',async(ctx)=>{
    let {cartId} = ctx.request.body
    try {
        let res = await Cart.deleteOne({"_id":cartId})
        if(res){
            ctx.body = {
                msg:'删除商品成功',
                data:res,
                code:0
            }
        }else{
            ctx.body = {
                msg:'修改商品失败',
                data:{},
                code:1
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
//获取购物车
router.get('/getCartList',async(ctx)=>{
    let userId = '5c710675a16dd53fa0780368'
    try {
        let cartList = await Cart.find({USERID:userId})
        if(cartList){
            for(let i=0;i<cartList.length;i++){
                let goods = await Goods.findOne({ID:cartList[i].GOODS_ID})
                cartList[i]={
                    ...cartList[i]._doc,
                    CARTID:cartList[i]._doc._id,
                    ...goods._doc,
                }
            }
            ctx.body = {
                msg:'获取购物车列表成功',
                data:cartList,
                code:0
            }
        }else{
            ctx.body = {
                msg:'获取购物车列表失败',
                data:{},
                code:1
            }
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})

//获取购物车数
router.get('/getCartCount',async(ctx)=>{
    let userId = '5c710675a16dd53fa0780368'
    try {
        let carts = await Cart.find({USERID:userId})
        let count = 0
        carts.forEach(v=>{
            count+=v.QUANTITY
        })
        ctx.body = {
            msg:'获取购物车数成功',
            count:count,
            code:0
        }
    } catch (error) {
        ctx.body = {
            msg:'数据出错',
            data:{},
            code:1
        }
    }
})
module.exports = router.routes()
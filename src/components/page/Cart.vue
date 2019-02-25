<template>
    <div class="cart-page">
        <div class="cart-header">
            <van-nav-bar
                title="购物车"
            />
        </div>
        <div class="cart-body">
            <div class="loading" v-if="loading">
                <van-loading />
            </div>
            <div class="cart-list">
                <van-swipe-cell :right-width="65" v-for="(item,index) in cartList" :key="index">
                    <van-cell-group>
                        <div class="cart-item">
                            <div class="cart-check">
                                <van-checkbox v-model="item.checked"/>
                            </div>
                            <div class="cart-content">
                                <div class="cart-image">
                                    <img :src="item.IMAGE1" :alt="item.NAME">
                                </div>
                                <div class="cart-info">
                                    <p class="cart-name">{{item.NAME}}</p>
                                    <div class="cart-price-box">
                                        <div class="cart-price">
                                            ￥{{item.PRESENT_PRICE | calcMoney}}
                                        </div>
                                        <div class="cart-stepper">
                                            <van-stepper class="stepper" v-model="item.QUANTITY" @change="changeAuantity(index,item.CARTID)"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-cell-group>
                    <span slot="right" class="remove-cart" @click="removeCart(item.CARTID,index)">删除</span>
                </van-swipe-cell>
                
            </div>
        </div>
        <div class="cart-footer">
            <van-submit-bar
            :price="allPrice"
            button-text="提交订单"
            @submit="onSubmit"
            >
                <van-checkbox v-model="allSelect" @change="allSelectFn">全选</van-checkbox>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import url from '@/serviceAPI.config'
import axios from 'axios'
import {toMoney} from '@/filter'
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            allPrice:0,
            allSelect:false,
            loading:true,
            value:1,
            cartList:[],
        }
    },
    filters:{
        calcMoney(money){
            return toMoney(money)
        }
    },
    watch:{
        //监听购物车列表
        cartList:{
            handler(newValue, oldValue) {
                //是否全选了
    　　　　　　 let allSelect = true
                for(let i=0;i<newValue.length;i++){
                    if(newValue[i].checked==false){
                        allSelect=false
                    }
                }
                if(allSelect){
                    this.allSelect = true
                }else{
                    this.allSelect = false
                }
                //统计选中的商品的价格
                let allPrice = 0
                for(let i=0;i<newValue.length;i++){
                    if(newValue[i].checked==true){
                        allPrice=allPrice+(newValue[i].QUANTITY*newValue[i].PRESENT_PRICE)
                    }
                }
                this.allPrice = allPrice*100
    　　　　},
    　　　　deep: true
        }
    },
    methods:{
        ...mapMutations('index',{
            setCartNum:'SET_CART_NUM'
        }),
        onSubmit(){
            console.log(this.cartList)
        },
        async getCartNum(){
            let {data}=await axios.get(url.cartcount)
            console.log(data)
            this.setCartNum(data.count)
        },
        //改变购物车数量
        async changeAuantity(index,cartId){
            let thisCart = this.cartList.find((v,i)=>{
                if(i==index){
                    return v
                }
            })
            let res = await axios.post(url.changecart,{
                cartId:cartId,
                quantity:thisCart.QUANTITY
            })
            if(res.status==200){
                this.getCartNum()
            }else{
                this.$toast('请求服务器出错!')
            }
        },
        //删除购物车
        removeCart(cartId){
            this.$dialog.confirm({
                title: '警告',
                message: '是否删除该商品？'
            }).then( async () => {
                let res = await axios.post(url.removecart,{
                    cartId:cartId
                })
                if(res.status==200){
                    this.$toast(res.data.msg)
                    this.cartList = this.cartList.filter((v)=>{
                        return v.CARTID !== cartId
                    })
                    this.getCartNum()
                    console.log(this.cartList)
                }else{
                    this.$toast('请求服务器出错!')
                }
            }).catch(() => {
                // on cancel
            });
        },
        //全选
        allSelectFn(val){
            if(val){
                this.cartList = this.cartList.map((v)=>{
                    return {
                        ...v,
                        checked:val
                    }
                })
            }else{
                let allSelect = true
                for(let i=0;i<this.cartList.length;i++){
                    if(this.cartList[i].checked==false){
                        allSelect=false
                    }
                }
                if(allSelect){
                    this.cartList = this.cartList.map((v)=>{
                        return {
                            ...v,
                            checked:val
                        }
                    })
                }else{
                    return;
                }
            }
        },
        //获取购物车列表数据
        async initGetCart(){
            let res = await axios.get(url.cartlist)
            if(res.status==200){
                if(res.data.code==0){
                    this.cartList = res.data.data
                    this.cartList = this.cartList.map((v)=>{
                        return {
                            ...v,
                            checked:false
                        }
                    })
                    this.loading = false
                }else{
                    this.$toast('获取购物车列表失败')
                }
            }else{
                this.$toast('请求服务器出错!')
            }
            console.log(res)
        },
    },
    mounted(){
        this.initGetCart()
    }
}
</script>

<style lang="less" scoped>
.cart-page{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .cart-footer{
        padding-left:.5rem;
        background: #fff;
        .van-submit-bar{
            position:static;
        }
    }
    .cart-body{
        flex:1;
        .loading{
            display: flex;
            justify-content: center;
            align-items: center;
            padding:.5rem 0;
        }
        .cart-list{
            .remove-cart{
                background:red;
                color:#fff;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 65px;
                height: 100%;
            }
            .cart-item{
                background:#fff;
                margin-bottom:.5rem;
                display: flex;
                padding:.5rem;
                .cart-check{
                    display: flex;
                    padding-right:.5rem;
                    justify-content: center;
                    align-items: center;
                }
                .cart-content{
                    flex:1;
                    display: flex;
                    .cart-image{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width:5rem;
                            height:5rem;
                            display: block;
                            border:1px solid #eee;
                        }
                    }
                }
                .cart-info{
                    padding:0 0 0 .5rem;
                    flex:1;
                    .cart-name{
                        margin:0;
                        padding:.2rem 0;
                        font-size: .8rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .cart-price-box{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .cart-price{
                            font-size:.7rem;
                            color:#f44;
                            font-weight:bold;
                            line-height: 2rem;
                        }
                    }
                }
            }
        }
    }
}
</style>

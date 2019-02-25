<template>
    <div class="goods-page">
        <div class="goods-body">
            <div class="loading" v-if="loading">
                <van-loading />
            </div>
            <div v-if="loading==false">
                <van-nav-bar
                    title="商品详情"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                />
                <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,i) in goods.goodsImg" :key="i">
                        <img v-lazy="item" width="100%" @click="preview(i)">
                    </van-swipe-item>
                </van-swipe>
                <div class="product-main">
                    <p class="product-title">{{goods.NAME}}</p>
                    <div class="product-price">
                        <span>￥{{goods.PRESENT_PRICE | calcMoney}}</span>
                        <s>￥{{goods.ORI_PRICE | calcMoney}}</s>
                    </div>
                </div>
                <div class="comment">
                    <van-tabs v-model="active" :line-height="2" :line-width="160" swipeable sticky>
                        <van-tab title="商品详情">
                            <div class="goods-info" :style="{fontSize:'0px'}" v-html="goods.DETAIL"></div>
                        </van-tab>
                        <van-tab title="评论">内容 2</van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
        <div class="goods-footer">
            <ul>
                <li class="buycart" @click="jumpCart">
                    <img :src="require('@/assets/images/buycart.png')" alt="">
                    <span>购物车</span>
                    <i>{{cartNum}}</i>
                </li>
                <li class="cart" @click="joinCart">加入购物车</li>
                <li class="buy">立即购买</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import {ImagePreview} from 'vant'
import {mapState,mapMutations} from 'vuex'
import url from '@/serviceAPI.config'
import {toMoney} from '@/filter'
export default {
    data(){
        return {
            loading:true,
            active:0,
            goods:[]
        }
    },
    filters:{
        calcMoney(money){
            return toMoney(money)
        }
    },
    computed:{
        ...mapState({
            cartNum:state=>state.index.cartNum
        })
    },
    methods:{
        ...mapMutations('index',{
            setCartNum:'SET_CART_NUM'
        }),
        onClickLeft(){
            this.$router.back(-1)
        },
        preview(i){
            ImagePreview({
                images:this.goods.goodsImg,
                startPosition: i,
                onClose() {
                    // do something
                }
            });
        },
        jumpCart(){
             this.$router.push('/cart')
        },
        async getCartNum(){
            let {data}=await axios.get(url.cartcount)
            console.log(data)
            await this.setCartNum(data.count)
        },
        async joinCart(){
            let res = await axios.post(url.joincart,{
                goodsId:this.goods.ID,
                quantity:1
            })
            if(res.status==200){
                if(res.data.code==0){
                    this.$toast(res.data.msg)
                    this.getCartNum()
                }else{
                    this.$toast(res.data.msg)
                }
            }else{
                this.$toast('请求服务器出错!')
            }
        },
        initGetGoods(){
            let goodsId = this.$route.params.goodsId || ''
            if(goodsId){
                ;(async()=>{
                    let goods = await axios.get(url.goods,{
                        params:{
                            goodsId:goodsId
                        }
                    })
                    if(goods.status==200){
                        if(goods.data.code==0){
                            this.goods = goods.data.data
                            this.goods.goodsImg = []
                            if(this.goods.IMAGE1){
                                this.goods.goodsImg.push(this.goods.IMAGE1)
                            }
                            if(this.goods.IMAGE2){
                                this.goods.goodsImg.push(this.goods.IMAGE2)
                            }
                            if(this.goods.IMAGE3){
                                this.goods.goodsImg.push(this.goods.IMAGE3)
                            }
                            if(this.goods.IMAGE4){
                                this.goods.goodsImg.push(this.goods.IMAGE4)
                            }
                            if(this.goods.IMAGE5){
                                this.goods.goodsImg.push(this.goods.IMAGE5)
                            }
                            this.loading = false
                        }else{
                            this.$toast('获取商品失败')
                        }
                    }else{
                        this.$toast('请求服务器出错!')
                    }
                    console.log(goods)
                })()
            }else{
                this.$toast('没有商品ID')
                setTimeout(()=>{
                    this.$router.push('/')
                },100)

            }
        }
    },
    mounted(){
        this.initGetGoods()
        this.getCartNum()
    }
}
</script>

<style lang="less" scoped>
.goods-page{
    height:100%;
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .goods-body{
        flex:1;
        overflow-y: auto;
        .loading{
            display: flex;
            justify-content: center;
            align-items: center;
            padding:.5rem 0;
        }
        .swipe{
            background: #fff;
            border-bottom:1px solid #eee;
            img{
                display: block;
            }
        }
        .product-main{
            background: #fff;
            border-bottom:1px solid #eee;
            .product-title{
                margin:0;
                padding:.5rem;
                font-size: 1rem;
            }
            .product-price{
                padding:.2rem .5rem;
                span{
                    color:#ffaa00;
                    font-weight: 600;
                }
                s{
                    margin-left:.5rem;
                    font-size: .7rem;
                    color:#555; 
                }
            }
        }
        .comment{
            margin-top:.5rem;
        }
    }
    .goods-footer{
        height:2.75rem;
        background: #fff;
        border-top:1px solid #eee;
        ul{
            display: flex;
            height:2.75rem;
            li{
                height:2.75rem;
                text-align: center;
            }
            li:nth-child(1){
                width:2.75rem;
            }
            li:nth-child(1), li:nth-child(2){
                border-right:1px solid #eee;
            }
            .cart{
                background: #ff9600;
                color:#fff;
            }
            .buy{
                background: #e4393c;
                color:#fff;
            }
            li:nth-child(2), li:nth-child(3){
                flex:1;
                line-height: 2.75rem;
            }
            .buycart{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                img{
                    width:1.4rem;
                }
                span{
                    font-size:.6rem;
                    margin-top:.2rem;
                    color:#444;
                }
                i{
                    position:absolute;
                    text-decoration: none;
                    font-style:normal;
                    top:0;
                    right:0;
                    color:#f40;
                    font-size: .6rem;
                    font-weight: normal;
                    width:1rem;
                    height:1rem;
                    line-height:1rem;
                    border:1px solid #ccc;
                    border-radius:1rem;
                    background: #fff;
                    text-align: center;
                }
            }
        }
    }
}
img{
    display: block;
}
</style>

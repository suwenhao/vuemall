<template>
    <div id="mainPage">
        <!-- 搜索头 -->
        <search-bar-component/>
        <!-- banner轮播图 -->
        <div class="banner">
            <van-swipe class="swipe" :autoplay="3000">
                <van-swipe-item v-for="(image, index) in bannerPicArray" :key="index">
                    <img :src="image.image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
            <div class="bar-item" v-for="(cate,index) in category" :key="index" @click="jumpCate(cate.mallCategoryId)">
                <img :src="cate.image"  width="90%"/>
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- 广告 -->
        <div class="ad-banner">
            <img width="100%" :src="adBanner" />
        </div>
        <!-- recommend -->
        <div class="recommend">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                 <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommend" :key="index">
                        <div class="recommend-item" @click="jump(item.goodsId)">
                            <img v-lazy="item.image" width="100%">
                            <div class="mall-price">￥{{item.mallPrice | calcMoney}}</div>
                            <div class="price"><s>￥{{item.price | calcMoney}}</s></div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- 楼层1 -->
        <floor-component v-if="floor1.length>0" :f="1" :fclass="'one'" :floorName="floorName.floor1" :floorData="floor1"/>
        <!-- 楼层2 -->
        <floor-component v-if="floor2.length>0" :f="2" :fclass="'two'" :floorName="floorName.floor2" :floorData="floor2"/>
        <!-- 楼层3 -->
        <floor-component v-if="floor3.length>0" :f="3" :fclass="'three'" :floorName="floorName.floor3" :floorData="floor3"/>
        <!-- hot -->
        <div class="hot">
            <div class="hot-title">
                热卖商品
            </div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="8">
                        <van-col class="van-col" span="12" v-for="(item,i) in hotGoods" :key="i">
                            <!-- 这里需要一个list组件 -->
                            <goods-item-component :goods="item"/>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FloorComponent from '@/components/component/Floor'
import GoodsItemComponent from '@/components/component/GoodsItem'
import SearchBarComponent from '@/components/component/SearchBar'
import {toMoney} from '@/filter'
import url from '@/serviceAPI.config.js'

export default {
    name:'mainPage',
    components:{
        swiper,
        swiperSlide,
        FloorComponent,
        GoodsItemComponent,
        SearchBarComponent
    },
    data(){
        return {
            
            bannerPicArray:[], //轮播图
            category:[],   //分类
            adBanner:'',   //广告
            recommend:[],  //推荐
            floorName:{}, //楼层名称
            floor1:[],  //楼层1
            floor2:[],  //楼层2
            floor3:[],  //楼层3
            hotGoods:[], //热卖商品
            swiperOption:{
                slidesPerView: 3,
                spaceBetween: 5,
                freeMode: true,
            }
        }
    },
    filters:{
        calcMoney(money){
            return toMoney(money)
        }
    },
    methods:{
        jump(goodsId){
            this.$router.push('/goods/'+goodsId)
        },
        jumpCate(cid){
            localStorage.setItem('__cate_index__',cid)
            this.$router.push('/cate')
        }
    },
    created(){
        axios({
            url:url.getShoppingMallInfo,
            method:'get',
        }).then(res=>{
            console.log(res)
            if(res.status==200){
                this.category = res.data.data.category
                this.bannerPicArray = res.data.data.slides
                this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS
                this.recommend = res.data.data.recommend
                this.floor1 = res.data.data.floor1
                this.floor2 = res.data.data.floor2
                this.floor3 = res.data.data.floor3
                this.floorName = res.data.data.floorName
                this.hotGoods = res.data.data.hotGoods
            }
        }).catch(error=>{
            console.log(error)
        })
    }
}
</script>

<style lang="less" scoped>
.banner{
    max-height:9rem;
    overflow: hidden;
    img{
        width:100%;
    }
}
.type-bar{
    display: flex;
    justify-content: center;
    padding:.2rem;
    margin:0 .3rem;
    border-radius:.5rem;
    background: #ffffff;
    .bar-item{
        flex:1;
        img{
            display: block;
            width:80%;
            margin:0 auto;
        }
        span{
            display: block;
            font-size: .7rem;
            text-align: center;
        }
    }
}
.ad-banner{
    margin:.5rem 0;
}
.recommend{
    background: #fff;
    border-bottom:1px solid #eee;
    .recommend-title{
        height:1.6rem;
        line-height: 1.6rem;
        font-size: .8rem;
        padding:0 .5rem;
        border-bottom:1px solid #eee;
        color:#ffaa00;
    }
    .recommend-body{
        padding:0 .3rem;
        .recommend-item{
            padding:.3rem 0;
            width:99%;
            text-align: center;
            border-right:1px solid #eee;
            .mall-price{
                font-size: .7rem;
            }
            .price{
                font-size:.6rem;
                color:#ccc;
            }
        }
    }
}
.hot{
    background: #fff;
    border-bottom:1px solid #eee;
    margin-top:.5rem;
    .hot-title{
        height:1.6rem;
        line-height: 1.6rem;
        font-size: .8rem;
        padding:0 .5rem;
        border-bottom:1px solid #eee;
        color:#ffaa00;
    }
    .hot-goods{
        padding:0 .3rem;
        .van-col{
            border-bottom:1px solid #eee;
        }
        .van-col:nth-child(odd){
            border-right:1px solid #eee;
        }
    }
}
</style>
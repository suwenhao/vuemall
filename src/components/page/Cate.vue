<template>
    <div class="cate-page">
        <!-- 搜索头 -->
        <div class="cate-header" ref="header">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <div class="cate-body">
            <div class="cate-main">
                <van-row class="cate-row">
                    <van-col span="6" class="cate-left" :style="{height:scrollHeight}">
                        <vue-better-scroll class="wrapper"
                            ref="scroll"
                            :startY="parseInt(startY)">
                            <ul class="cate-list">
                                <li 
                                    v-for="(item,i) in cates" 
                                    :key="i" 
                                    :class="{'active':cateIndex==i?true:false}"
                                    @click="clickCategory(i)">
                                    {{item.MALL_CATEGORY_NAME}}
                                </li>
                            </ul>
                        </vue-better-scroll>
                    </van-col>
                    <van-col span="18" class="cate-right" :style="{height:scrollHeight}">
                        <div ref="tab">
                            <van-tabs @click="clickCateSub" v-model="catesubIndex" :line-width='40' :line-height='2' :swipe-threshold='3' :ellipsis='false'>
                                <van-tab v-for="(item,i) in catesubs" :title="item.MALL_SUB_NAME" :key="i"></van-tab>
                            </van-tabs>
                        </div>
                        <div class="goods-list" :style="{height:listHeight}">
                            <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                            >
                                <van-row>
                                    <van-col class='goods' span="12" v-for="(jtem,jndex) in goods" :key="jndex">
                                        <div class="goods-item" @click="jump(jtem.ID)">
                                            <div class="goods-image">
                                                <img v-lazy="jtem.IMAGE1"/>
                                            </div>
                                            <p class="goods-name">{{jtem.NAME}}</p>
                                            <div class="goods-price">￥{{jtem.PRESENT_PRICE | calcMoney}}</div>
                                        </div>
                                    </van-col>
                                </van-row>
                            </van-list>
                            
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config'
import {toMoney} from '@/filter'
//搜索组件
import SearchBarComponent from '@/components/component/SearchBar'
import VueBetterScroll from 'vue2-better-scroll'


export default {
    data(){
        return {
            value:'',
            cates:[],
            catesubs:[],
            goods:[],
            cateIndex:0,
            catesubIndex:0,
            loading: false,
            finished: false,
            page:1,
            pagesize:10,
            count:0,
            scrollHeight:'29.6rem',
            listHeight:'24rem',
            startY:0,
        }
    },
    filters:{
        calcMoney(money){
            return toMoney(money)
        }
    },
    components:{
        SearchBarComponent,
        VueBetterScroll,
    },
    methods:{
        onSearch(){

        },
        //跳转到商品页
        jump(goodsId){
            this.$router.push('/goods/'+goodsId)
        },
        //点击大分类
        clickCategory(i){
            localStorage.setItem('__cate_index__',this.cates[i].ID)
            this.goods=[]
            this.page = 1
            this.cateIndex = i
            this.catesubIndex = 0
            this.$nextTick()
            this.getCategorySubData(()=>{
                this.$nextTick()
                this.getGoodsList()
                this.loading=false
                this.finished=false
            })
        },
        //点击小分类
        clickCateSub(index,title){
            this.goods=[]
            this.page = 1
            this.catesubIndex = index
            this.$nextTick()
            this.getCategorySubData(()=>{
                this.$nextTick()
                this.getGoodsList()
                this.loading=false
                this.finished=false
            })
        },
        //获取大分类数据
        async _getCategoryData(cb){
            let res = await axios.get(url.category)
            if(res.status==200){
                if(res.data.code==0){
                    this.cates = res.data.data
                    cb&&cb()
                }else{
                    this.$toast(res.data.msg)
                }
            }else{
                this.$toast('请求服务器出错!')
            }
            // console.log(res)
        },
        //获取小分类数据
        async getCategorySubData(cb){
            let cid = this.cates[this.cateIndex].ID
            let res = await axios.get(url.categorysub,{params:{cid}})
            if(res.status==200){
                if(res.data.code==0){
                    this.catesubs = res.data.data
                    cb&&cb()
                }else{
                    this.$toast(res.data.msg)
                }
            }else{
                this.$toast('请求服务器出错!')
            }
            // console.log(res)
        },
        //根据类别获取商品列表
        async getGoodsList(cb){
            let categorysubId = this.catesubs[this.catesubIndex].ID
            let res = await axios.get(url.goodslist,{params:{categorysubId,page:this.page,pagesize:this.pagesize}})
            if(res.status==200){
                if(res.data.code==0){
                    this.goods = this.goods.concat(res.data.data)
                    this.count = res.data.count
                    this.page+=1
                    cb&&cb()
                }else{
                    this.$toast(res.data.msg)
                }
            }else{
                this.$toast('请求服务器出错!')
            }
            // console.log(res)
        },
        //上拉加载
        onLoad(){
            setTimeout(()=>{
                var totalpage = parseInt(this.count/this.pagesize)
                if(this.count%this.pagesize!=0){
                    totalpage+=1;
                }
                console.log(totalpage)
                if(this.count<=10){
                    this.loading=false
                    this.finished=true
                    console.log(this.goods)
                }else if(this.page==totalpage){
                    this.$nextTick()
                    this.getGoodsList(()=>{
                        this.loading=false
                        this.finished=true
                        console.log(this.goods)
                    })
                }else{
                    this.$nextTick()
                    this.getGoodsList(()=>{
                        this.loading=false
                        this.finished=false
                        console.log(this.goods)
                    })
                }
            },500)
        },
        setInitCate(cb){
            let cid=localStorage.getItem('__cate_index__')
            if(!cid) return;
            let index = this.cates.findIndex((item)=>{
                console.log(item.ID)
                return item.ID==cid
            })
            this.cateIndex = index
            cb&&cb()
        },
        _calcHeight(){
            let headerH = this.$refs.header.clientHeight
            let tabH = this.$refs.tab.clientHeight
            var mainHeight = document.documentElement.clientHeight | document.body.clientHeight;
            this.scrollHeight = (mainHeight-(headerH*2)) + 'px';
            this.listHeight = (mainHeight-tabH-(headerH*2)) + 'px';
        },
        _resize(){
            window.onresize=()=>{
                this._calcHeight()
                this.$refs.scroll.refresh()
            }
        }
    },
    mounted(){
        this._getCategoryData(()=>{
            this.setInitCate()
            this.$nextTick()
            this.getCategorySubData(()=>{
                this.$nextTick()
                this.getGoodsList()
                this.loading=false
                this.finished=false
            })
        })
        this._calcHeight()
        this._resize()
    }
}
</script>

<style lang="less" scoped>
.cate-page{
    height:100%;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cate-body{
        flex:1;
        background: #fff;
        .cate-main{
            flex:1;
             height:100%;
            .cate-row{
                height:100%;
                .cate-right{
                    height:100%;
                    display: flex;
                    flex-direction: column;
                    .goods-list{
                        flex:1;
                        overflow-y: auto;
                        .goods{
                            border-bottom:1px solid #eee;
                        }

                        .goods:nth-child(odd){
                            border-right:1px solid #eee;
                        }
                        .goods-item{
                            padding-bottom:.5rem;
                            
                            margin:.4rem;
                            .goods-image{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img{
                                    width:6rem;
                                    height:6rem;
                                    display: block;
                                }
                            }
                            .goods-name{
                                padding:.2rem;
                                margin:0;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size:.8rem;
                            }
                            .goods-price{
                                color:#555;
                                font-size:.7rem;
                            }
                        }
                    }
                }
                .cate-left{
                    height:100%;
                    border-right:1px solid #eee;
                    .cate-list{
                        li{
                            padding:.5rem 0;
                            text-align: center;
                            font-size: .8rem;
                            border-bottom:1px solid #eee;
                        }
                        li.active{
                            background:#ffaa00;
                            color:#fff;
                        }
                    }
                }
            }
        }
    }
}
</style>

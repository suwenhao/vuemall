<template>
    <div>
        <!-- 1F -->
        <div class="floor-text">
            <span :class="'mark ' + fclass ">{{f}}F</span>
            <span :class="'text ' + fclass ">{{floorName}}</span>
        </div>
        <!-- 1F floor -->
        <div class="floor">
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img v-lazy="floorData0.image" width="100%" @click="jump(floorData0.goodsId)"/>
                </div>
                <div class="floor-two">
                    <div class="two-item">
                        <img v-lazy="floorData1.image" width="100%" @click="jump(floorData1.goodsId)"/>
                    </div>
                    <div class="two-item">
                        <img v-lazy="floorData2.image" width="100%" @click="jump(floorData2.goodsId)"/>
                    </div>
                </div>
            </div>
            <div class="floor-rule">
               <div class="floor-item" v-for="(item,index) in floorData.slice(3)" :key="index">
                    <img v-lazy="item.image" width="100%"  @click="jump(item.goodsId)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            floorData:{
                type:Array,
                default:[]
            },
            f:[String, Number],
            floorName:{
                type:String,
                default:'楼层'
            },
            fclass:{
                type:String,
                default:'one'
            }
        },
        data(){
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        methods:{
            jump(goodsId){
                this.$router.push('/goods/'+goodsId)
            }
        },
        created(){
            this.floorData0 = this.floorData[0]
            this.floorData1 = this.floorData[1]
            this.floorData2 = this.floorData[2]
        }
    }
</script>

<style lang="less" scoped>
.floor-text{
    display: flex;
    justify-content: center;
    align-items: center;
    padding:.5rem 0;
    .mark{
        color:#fff;
        height:1.4rem;
        width:1.4rem;
        font-size: .8rem;
        border-radius:1.4rem;
        text-align: center;
        line-height: 1.4rem;
    }
    .text{
        font-size:.7rem;
        margin-left:.5rem;
    }
    .text.one{
        color:#fcd836;
    }
    .mark.one{
        background:#fcd836;
    }
    .text.two{
        color:#d42e2f;
    }
    .mark.two{
        background:#d42e2f;
    }
    .text.three{
        color:#1b97f0;
    }
    .mark.three{
        background:#1b97f0;
    }
}
.floor{
    .floor-anomaly{
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-bottom:1px solid #eee;
        .floor-one{
            flex:1;
            border-right:1px solid #eee;
            justify-content: center;
            display: flex;
            flex-direction: column;
        }
        .floor-two{
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .two-item{
                flex:1;
                justify-content: center;
                display: flex;
                flex-direction: column;
            }
            .two-item:nth-child(1){
                border-bottom:1px solid #eee;
            }
        }
        
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        background: #fff;
        .floor-item{
            flex:1;
            width:50%;
            min-width: 50%;
            max-width: 50%;
            border-bottom:1px solid #eee;
        }
        .floor-item:nth-child(odd){
            border-right:1px solid #eee;
            margin-left:-1px;
        }
    }
}
</style>

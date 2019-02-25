<template>
    <div class="goods" @click="jump(goods.goodsId)">
        <div class="goods-image">
            <img v-lazy="goods.image" width="100%">
        </div>
        <p class="goods-name">{{goods.name}}</p>
        <div class="goods-price">￥{{goods.price | calcMoney}}</div>
    </div>
</template>

<script>
import {toMoney} from '@/filter'
export default {
    props:['goods'],
    filters:{
        calcMoney(money){
            return toMoney(money)
        }
    },
    methods:{
        jump(goodsId){
            this.$router.push('/goods/'+goodsId)
        }
    }
}
</script>
<style lang="less" scoped>
.goods{
    padding-bottom:.5rem;
}
.goods-image{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width:9.375rem;
        height:9.375rem;
    }
}
.goods-name{
    padding:.3rem;
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
</style>

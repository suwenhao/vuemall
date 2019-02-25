<template>
    <ul class="menu">
        <li>
            <router-link to="/" active-class="active">
                <i></i>
                <span>商城</span>
            </router-link>
        </li>
        <li>
            <router-link to="/cate" active-class="active" @click="clearCateIndex">
                <i></i>
                <span>分类</span>
            </router-link>
        </li>
        <li>
            <router-link to="/cart" active-class="active">
                <i></i>
                <span>购物车</span>
                <b v-if="cartNum>0">{{cartNum}}</b>
            </router-link>
        </li>
        <li>
            <router-link to="/my" active-class="active">
                <i></i>
                <span>个人中心</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            cartNum:state=>state.index.cartNum
        })
    },
    methods:{
        clearCateIndex(){
            localStorage.removeItem('__cate_index__')
        }
    }
}
</script>

<style lang="less" scoped>
.menu{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-top:1px solid #ddd;
    li{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            i{
                width:1.4rem;
                height:1.4rem;
                display: block;
                background-size:90%;
                background-position: center;
                background-repeat: no-repeat;
            }
            span{
                color:#555;
                font-size: .5rem;
            }
            b{
                position:absolute;
                top:0;
                right:-.6rem;
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
    li:nth-child(1){
        a{i{background-image: url('../../assets/images/index.png')}}
        a.router-link-exact-active{i{ background-image: url('../../assets/images/index_active.png')} span{color:#f40;}}
    }
    li:nth-child(2){
        a{i{background-image: url('../../assets/images/cate.png')}}
        a.router-link-exact-active{i{background-image: url('../../assets/images/cate_active.png')} span{color:#f40;}}
    }
    li:nth-child(3){
        a{i{background-image: url('../../assets/images/cart.png')}}
        a.router-link-exact-active{i{background-image:url('../../assets/images/cart_active.png')} span{color:#f40;}}
    }
    li:nth-child(4){
        a{i{background-image: url('../../assets/images/my.png')}}
        a.router-link-exact-active{i{background-image: url('../../assets/images/my_active.png')} span{color:#f40;}}
    }
}
</style>

<template>
    <div id="indexPage">
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="footer">
            <footer-component/>
        </div>
    </div>
</template>

<script>
    import FooterComponent from '@/components/component/Footer'
    import {mapMutations} from 'vuex'
    import {SET_CART_NUM} from '@/store/types.js'
    import axios from 'axios'
    import url from '@/serviceAPI.config'
    export default {
        name:'shoppingMall',
        data() {
            return {
                msg:'首页'
            }
        },
        methods:{
            ...mapMutations('index',{
                setCartNum:'SET_CART_NUM'
            }),
            async getCartNum(){
                let {data}=await axios.get(url.cartcount)
                console.log(data)
                await this.setCartNum(data.count)
            }
        },
        components:{
            FooterComponent
        },
        mounted(){
            this.getCartNum()
        }
    }
</script>

<style lang="less" scoped>
#indexPage{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    .main{
        flex:1;
        overflow-y:auto; 
    }
    .footer{
        height:2.75rem;
    }
}
</style>
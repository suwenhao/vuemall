<template>
    <div class="my-page">
        <div class="header">
            <img :src="require('@/assets/images/avatar.jpg')" alt="">
        </div>
        <div class="order-main">
            <van-cell-group>
                <van-cell title="全部订单" value="查看全部订单" />
            </van-cell-group>
            <ul class="order">
                <li>
                    <img :src="require('@/assets/images/fk.png')" alt="">
                    <div>待付款</div>
                </li>
                <li>
                    <img :src="require('@/assets/images/fh.png')" alt="">
                    <div>待发货</div>
                </li>
                <li>
                    <img :src="require('@/assets/images/sh.png')" alt="">
                    <div>待收货</div>
                </li>
                <li>
                    <img :src="require('@/assets/images/pj.png')" alt="">
                    <div>待评价</div>
                </li>
            </ul>
        </div>
        <div class="sention">
            <van-cell-group>
                <van-cell title="优惠券" icon="coupon-o" is-link />
                <van-cell title="客服电话" icon="service-o" is-link />
                <van-cell title="福利" icon="like-o" is-link />
                <van-cell title="关于我们" icon="friends-o" is-link />
            </van-cell-group>
        </div>
        <div class="sention">
            <van-cell-group>
                <van-cell title="地址管理" icon="logistics" is-link @click="jumpAddress"/>
                <van-cell title="修改密码" icon="setting-o" is-link />
                <van-cell title="退出登录" icon="share" is-link />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            jumpAddress(){
                this.$router.push('/address')
            }
        }
    }
</script>

<style lang="less" scoped>
.my-page{
    .header{
        height:6rem;
        width:100%;
        background:#ffaa00;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width:3rem;
            height:3rem;
            display: block;
            border-radius: 3rem;
            border:.2rem solid #fff;
        }
    }
    .order-main{
        background: #fff;
        margin-top:.5rem;
        .order{
            display: flex;
            justify-content: space-between;
            padding:.3rem 0;
            li{
                flex:1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width:1.6rem;
                    height:1.6rem;
                    display: block;
                }
                div{
                    font-size: .8rem;
                }
            }
        }
    }
    .sention{
        margin-top:.5rem;
    }
}
</style>

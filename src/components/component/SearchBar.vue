<template>
    <div class="search-bar">
        <van-row type="flex">
            <van-col  span="3">
                <img class="location" :src="locationIcon" alt="location">
            </van-col>
            <van-col span="17">
                <input type="text" class="search-input"/>
            </van-col>
            <van-col span="4">
                <van-button class="search-button" size="mini" :round="true">搜索</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                locationIcon:require("@/assets/images/location.png"),
            }
        }
    }
</script>

<style lang="less" scoped>
.search-bar{
    height:2.3rem;
    line-height:2.2rem;
    background: #ffaa00;
    .location{
        width:1.5rem;
    }
    .van-col{
        height:2.3rem;
        line-height:2.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .search-input{
        width:96%;
        border:0;
        height:1.5rem;
        border-radius:2.2rem;
        margin-right:4%;
        text-indent: 1rem;
    }
}
</style>

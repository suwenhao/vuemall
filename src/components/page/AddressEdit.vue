<template>
    <div>
        <van-nav-bar
            title="新增地址"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
    export default {
        props:['areaList'],
        data(){
            return{
                searchResult: []
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back(-1)
            },
            onSave() {
            
            },
            onDelete() {

            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                    name: '黄龙万科中心',
                    address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <van-nav-bar
            title="登录"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="form-box">
            <van-cell-group>
                <van-field
                    v-model="username"
                    clearable
                    label="手机号码"
                    placeholder="请输入11位手机号码"
                    required
                />
                <!-- <van-field
                    v-model="sms"
                    center
                    clearable
                    type="number"
                    label="手机验证码"
                    placeholder="请输入手机验证码"
                    required
                >
                    <van-button slot="button" size="small" type="default">发送验证码</van-button>
                </van-field> -->
                <van-field
                    v-model="password"
                    clearable
                    type="password"
                    label="设置密码"
                    placeholder="6到20位数字+字母或符号组成"
                    required
                />
            </van-cell-group>
            
        </div>
        <div class="sub-btn">
            <van-button 
            :loading="loading" 
            :disabled="disabled" 
            @click="submit" 
            type="danger" 
            block 
            size="normal" 
            class="submit-btn" loading-text="登录中...">登录</van-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config'
export default {
    name:"register",
    data(){
        return {
            username:'',
            password:'',
            sms:'',
            disabled:false,
            loading:false,
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        },
        //表单验证
        _checkForm(loadingFn){
            //验证手机
            let phone = !(/^1[34578]\d{9}$/.test(this.username))
            //表单验证
            if(phone){
                this.$toast('手机号码格式出错！')
                loadingFn(this)
                return false; 
            }else if(this.password==""){
                this.$toast('密码不能为空！')
                loadingFn(this)
                return false; 
            }else{
                return true;
            }
        },
        async submit(){
            this.disabled = true
            this.loading = true
            //初始化提交按钮
            let loadingFn = (that)=>{
                that.disabled = false
                that.loading = false
            }
            if(this._checkForm(loadingFn)){
                let res = await axios({
                    method:'post',
                    url:url.loginUser,
                    data:{
                        username:this.username,
                        password:this.password
                    }
                })
                loadingFn(this)
                if(res.status==200){
                    if(res.data.code==0){
                        this.$toast(res.data.msg)
                        localStorage.setItem('login',this.username)
                        setTimeout(()=>{
                            this.$router.push('/')
                        },500)
                    }else{
                        this.$toast(res.data.msg)
                    }
                }else{
                    this.$toast('请求服务器出错!')
                }
            }
        }
    },
    created(){
        let checkLogin = localStorage.getItem('login')
        if(checkLogin){
            this.$toast('你已经登录了')
            setTimeout(()=>{},100)
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
.form-box{
    padding:.5rem .2rem 0 .2rem;
}
.sub-btn{
    padding:.5rem;
}
</style>

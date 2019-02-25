import Vue from 'vue'
import Vuex from 'vuex'
import indexModule from '@/store/module/indexModule'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        index:indexModule
    }
})
export default store
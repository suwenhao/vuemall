import {SET_CART_NUM} from '@/store/types.js'

export default {
    namespaced: true,
    state: { 
        cartNum:0
    },
    getters: {
      
    },
    actions: {
        
    },
    mutations: {
        async [SET_CART_NUM](state,num){
            console.log(num)
            state.cartNum = num
        }
    },
}
import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/page/ShoppingMall'
import Main from '@/components/page/Main'
import Register from '@/components/page/Register'
import Login from '@/components/page/Login'
import Goods from '@/components/page/Goods'
import Cate from '@/components/page/Cate'
import Cart from '@/components/page/Cart'
import My from '@/components/page/My'
import Address from '@/components/page/Address'
import AddressEdit from '@/components/page/AddressEdit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'shoopingMall', component: ShoppingMall, 
      children:[
        {path:'/', name:'main', component: Main},
        {path:'cate', name:'cate', component: Cate},
        {path:'cart', name:'cart', component: Cart},
        {path:'my', name:'my', component: My}
      ] 
    },
    {path: '/register', name: 'register', component: Register,},
    {path: '/address', name: 'address', component: Address,},
    {path: '/addressedit', name: 'addressedit', component: AddressEdit,},
    {path: '/login', name: 'login', component: Login,},
    {path: '/goods/:goodsId', name: 'goods', component: Goods,}
  ]
})

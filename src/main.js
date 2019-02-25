// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { AddressEdit, AddressList, Dialog, SwipeCell, Stepper, Checkbox, SubmitBar, Search, Tab, Tabs, Loading, Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Cell, NavBar, Field, CellGroup, Toast } from 'vant'
import '@/assets/css/common.css'
import store from '@/store'
Vue.use(Button)
.use(Row)
.use(Col)
.use(Swipe)
.use(SwipeItem)
.use(Lazyload,{loading:require('@/assets/images/loading.gif'),error:require('@/assets/images/error.png')})
.use(List)
.use(Cell)
.use(NavBar)
.use(Field)
.use(CellGroup)
.use(Toast)
.use(Loading)
.use(Tab)
.use(Tabs)
.use(Search)
.use(SubmitBar)
.use(Checkbox)
.use(Stepper)
.use(SwipeCell)
.use(Dialog)
.use(AddressList)
.use(AddressEdit)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import GoodList from '@/view/GoodList'
import Cart from '@/view/Cart'
import Address from '@/view/Address'
import OrderConfirm from '@/view/OrderConfirm'
import Pay from '@/view/Pay'
import OrderSuccess from '../view/OrderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,

    },
    {
      path: '/Goodlist',
      name: 'GoodList',
      component: GoodList,

    },
    {
      path: '/Cart',
      name: 'Cart',
      component:Cart,

    },
    {
      path: '/Address',
      name: 'Address',
      component:Address,

    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component:OrderConfirm,
    },
    {
      path: '/Pay',
      name: 'Pay',
      component:Pay,
    },
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component:OrderSuccess,
    }
  ]
})

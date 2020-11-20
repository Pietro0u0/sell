import VueRouter from 'vue-router'
import Vue from 'vue'

import Goods from 'components/goods/Goods'
import Ratings from 'components/ratings/Ratings'
import Sellers from 'components/seller/Seller'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/rating',
    component: Ratings
  },
  {
    path: '/seller',
    component: Sellers
  },
]
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
export default router

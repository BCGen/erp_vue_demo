import Vue from 'vue'
import VueRouter from 'vue-router'
import Opening from '../views/opening/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Opening
  },
  {
    // 職缺維護 列表
    path: '/recruit/opening',
    name: 'opening',
    component: () =>
      import(/* webpackChunkName: "opening" */ '../views/opening/index.vue')
  },
  {
    // 職缺維護 新增
    path: '/recruit/opening/create',
    name: 'openingCreate',
    component: () =>
      import(
        /* webpackChunkName: "openingCreate" */ '../views/opening/Create.vue'
      )
  },
  {
    // 職缺維護 編輯
    path: '/recruit/opening/edit/:id',
    name: 'openingEdit',
    component: () =>
      import(/* webpackChunkName: "openingEdit" */ '../views/opening/Edit.vue')
  },
  {
    path: '/recruit/banner',
    name: 'banner',
    component: () =>
      import(/* webpackChunkName: "banner" */ '../views/banner/index.vue')
  },
  {
    path: '/recruit/banner/create',
    name: 'bannerCreate',
    component: () =>
      import(
        /* webpackChunkName: "bannerCreate" */ '../views/banner/Create.vue'
      )
  },
  {
    path: '/recruit/banner/edit/:id',
    name: 'bannerEdit',
    component: () =>
      import(/* webpackChunkName: "bannerEdit" */ '../views/banner/Edit.vue')
  },
  {
    path: '/recruit/resume',
    name: 'resume',
    component: () =>
      import(/* webpackChunkName: "resume" */ '../views/resume/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

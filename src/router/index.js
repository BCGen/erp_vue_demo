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
    // 選單維護
    path: '/recruit/code',
    name: 'code',
    component: () =>
      import(/* webpackChunkName: "code" */ '../views/code/index.vue')
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
    path: '/recruit/qrCode',
    name: 'qrCode',
    component: () =>
      import(/* webpackChunkName: "QRCode" */ '../views/qrCode/index.vue')
  },
  {
    path: '/recruit/resume',
    name: 'resume',
    component: () =>
      import(/* webpackChunkName: "resume" */ '../views/resume/index.vue')
  },
  {
    path: '/recruit/privacy',
    name: 'privacy',
    component: () =>
      import(/* webpackChunkName: "privacy" */ '../views/privacy/index.vue')
  },
  {
    path: '/recruit/privacy/create',
    name: 'privacyCreate',
    component: () =>
      import(
        /* webpackChunkName: "privacyCreate" */ '../views/privacy/Create.vue'
      )
  },
  {
    path: '/recruit/privacy/edit/:id',
    name: 'privacyEdit',
    component: () =>
      import(/* webpackChunkName: "privacyEdit" */ '../views/privacy/Edit.vue')
  },
  /*******
   * 字庫
   *******/
  {
    path: '/recruit/dictionary',
    name: 'dictionary',
    component: () =>
      import(
        /* webpackChunkName: "dictionary" */ '../views/dictionary/index.vue'
      )
  },
  {
    path: '/recruit/dictionary/create',
    name: 'dictionaryCreate',
    component: () =>
      import(
        /* webpackChunkName: "dictionaryCreate" */ '../views/dictionary/Create.vue'
      )
  },
  {
    path: '/recruit/dictionary/edit/:id',
    name: 'dictionaryEdit',
    component: () =>
      import(
        /* webpackChunkName: "dictionaryEdit" */ '../views/dictionary/Edit.vue'
      )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

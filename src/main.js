import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins'
import '@/assets/css/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  metaInfo: {
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: ['aboutbg', 'type']
    }
  }
}).$mount('#app')

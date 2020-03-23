import Vue from 'vue'
import * as components from '@/components'

// 將 Components 綁定到 Vue 上
Object.keys(components).forEach(key => {
  const component = components[key]
  Vue.component(component.name || key, component)
})

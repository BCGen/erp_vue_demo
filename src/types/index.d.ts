import Vue from 'vue'
import { $api } from '../services'
import $f from '../utils'

declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof $api
    $f: typeof $f
  }
}

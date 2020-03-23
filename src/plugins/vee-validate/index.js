import Vue from 'vue'
import { strLen } from './utils'
import {
  ValidationObserver,
  ValidationProvider,
  configure,
  extend
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

const messages = {
  required: '必填',
  max: '需要小於等於{length}字'
}

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule] || '輸入格式錯誤，請重新輸入。'
  })
})

/** 字數限制 (中英字元) */
extend('max_char', {
  params: ['size', 'sizeZh'],
  validate(value, { size, sizeZh }) {
    return strLen(value, size / sizeZh) <= Number(size)
  },
  message: '字數限制：中 {sizeZh} 字元，英 {size} 字元'
})

/** 檔案大小限制 (MB) */
extend('file_size', {
  params: ['size'],
  validate(value, { size }) {
    let fileSize = 0
    if (Array.isArray(value)) {
      fileSize = value.map(file => file.size).reduce((a, b) => a + b, 0)
    } else {
      fileSize = value.size
    }
    return fileSize / 1024 ** 2 <= Number(size)
  }
})

/** 字數限制 (中英字元) */
extend('url_start', {
  params: ['start'],
  validate(value, { start }) {
    const reg = RegExp(`^${start}`, 'g')
    return reg.test(value)
  },
  message: '網址開頭需為 {start}'
})

configure({
  classes: {
    invalid: 'is-invalid'
  }
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

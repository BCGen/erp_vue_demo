<template>
  <div class="position-relative">
    <input
      ref="datepicker"
      placeholder="YYYY/MM/DD"
      type="text"
      class="datepicker form-control"
      readonly="readonly"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <img
      class="ui-datepicker-trigger"
      src="@/assets/images/day@2x.png"
      @click="show"
    />
  </div>
</template>

<script>
import '@/plugins/jquery-ui/jquery-ui.min.js'
import '@/plugins/jquery-ui/jquery-ui.css'

export default {
  name: 'InputDatepicker',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    option: {
      type: [Object, null],
      default: () => ({})
    },
    defaultDate: {
      type: null,
      default: null
    }
  },
  computed: {
    datepickerOption() {
      const vm = this
      return {
        dateFormat: 'yy/mm/dd',
        onSelect(date) {
          vm.$emit('input', moment(new Date(date)).format('YYYYMMDD'))
        },
        changeMonth: true,
        changeYear: true,
        ...this.option
      }
    }
  },
  watch: {
    // 監聽 option， 有變動則重新設定 datepicker
    option: {
      handler() {
        this.setOption()
      },
      deep: true
    }
  },
  mounted() {
    $(this.$refs.datepicker).datepicker(this.datepickerOption)

    // 如果有 value 則設定初始值
    if (this.value) {
      $(this.$refs.datepicker).datepicker(
        'setDate',
        moment(this.value).format('YYYY/MM/DD')
      )
    }
  },
  methods: {
    /** 顯示 */
    show() {
      $(this.$refs.datepicker).datepicker('show')
    },
    /** 設定選項 */
    setOption() {
      $(this.$refs.datepicker).datepicker('option', this.datepickerOption)
    }
  }
}
</script>

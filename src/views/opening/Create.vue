<template>
  <div>
    <page-header title="職缺維護 - 新增" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <opening-form ref="form" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'
import OpeningForm from './components/Form'

export default {
  name: 'OpeningCreate',
  components: {
    OpeningForm
  },
  mixins: [notify],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '職缺維護',
          link: '/recruit/opening'
        },
        {
          title: '新增'
        }
      ]
    }
  },
  methods: {
    /** 提交表單 */
    async handleSubmit() {
      const loader = this.$loading.show()
      const data = this.$refs.form.formData

      try {
        await this.$api.postOpening(data)

        this.$router.push('/recruit/opening')
        this.notifyCreateSuccess()
      } catch (e) {
        this.notifyCreateFail()
        console.warn(e)
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

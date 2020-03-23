<template>
  <div>
    <page-header title="隱私權維護 - 新增" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <privacy-form ref="form" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'
import PrivacyForm from './components/Form'

export default {
  name: 'OpeningCreate',
  components: {
    PrivacyForm
  },
  mixins: [notify],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '隱私權維護',
          link: '/recruit/privacy'
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
        await this.$api.postPrivacy(data)

        this.$router.push('/recruit/privacy')
        this.notifyCreateSuccess()
      } catch {
        this.notifyCreateFail()
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

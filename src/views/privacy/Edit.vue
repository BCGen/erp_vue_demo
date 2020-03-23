<template>
  <div>
    <page-header title="隱私權維護 - 編輯" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <privacy-form
        ref="form"
        :request-data="$api.getPrivacy($route.params.id)"
        @submit="handleSubmit"
      />
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
          title: '編輯'
        }
      ]
    }
  },
  methods: {
    /** 提交表單 */
    async handleSubmit() {
      const loader = this.$loading.show()
      const id = this.$route.params.id
      const data = this.$refs.form.formData

      try {
        await this.$api.patchPrivacy(id, data)

        this.$router.push('/recruit/privacy')
        this.notifyEditSuccess()
      } catch {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

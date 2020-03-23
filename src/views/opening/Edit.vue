<template>
  <div>
    <page-header title="職缺維護 - 編輯" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <opening-form
        ref="form"
        :request-data="requestData()"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import { page } from '@/mixins'
import OpeningForm from './components/Form'

export default {
  name: 'OpeningEdit',
  components: {
    OpeningForm
  },
  mixins: [page],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '職缺維護',
          link: '/recruit/opening'
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
        await this.$api.patchOpening(id, data)

        this.$router.push('/recruit/opening')
        this.notifyEditSuccess()
      } catch (e) {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    },
    /** 取得編輯輯資料 */
    requestData() {
      return this.$api.getOpening(this.$route.params.id)
    }
  }
}
</script>

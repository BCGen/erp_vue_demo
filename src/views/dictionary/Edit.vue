<template>
  <div>
    <page-header title="字庫維護 - 編輯" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <dictionary-form
        ref="form"
        :request-data="requestData()"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import DictionaryForm from './components/Form'

export default {
  name: 'DictionaryCreate',
  components: {
    DictionaryForm
  },
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '字庫維護',
          link: '/recruit/dictionary'
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
      const data = this.$refs.form.formData

      try {
        await this.$api.postDictionary(data)

        this.$router.push('/recruit/dictionary')
        this.notifyEditSuccess()
      } catch (e) {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    },
    /** 取得編輯輯資料 */
    requestData() {
      return this.$api.getDictionary(this.$route.params.id)
    }
  }
}
</script>

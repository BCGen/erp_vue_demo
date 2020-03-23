<template>
  <div>
    <page-header title="字庫維護 - 新增" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <dictionary-form ref="form" @submit="handleSubmit" />
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
          title: '新增'
        }
      ],
      content: ''
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

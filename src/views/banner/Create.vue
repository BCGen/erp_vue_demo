<template>
  <div>
    <page-header title="Banner 新增" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <banner-form ref="form" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'
import BannerForm from './components/Form'

export default {
  name: 'BannerCreate',
  components: {
    BannerForm
  },
  mixins: [notify],
  data() {
    return {
      breadcrumb: [
        {
          title: 'Banner',
          link: '/recruit/banner'
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
        await this.$api.postBanner(data)
        this.$router.push('/recruit/banner')
        this.notifyCreateSuccess()
      } catch (e) {
        this.notifyCreateFail()
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

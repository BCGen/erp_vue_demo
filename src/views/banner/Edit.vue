<template>
  <div>
    <page-header title="Banner 編輯" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <banner-form
        ref="form"
        :request-data="$api.getBanner($route.params.id)"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'
import BannerForm from './components/Form'

export default {
  name: 'BannerEdit',
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
        await this.$api.postBanner(data)
        this.$router.push('/recruit/banner')
        this.notifyEditSuccess()
      } catch (e) {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

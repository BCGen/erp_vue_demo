<template>
  <div>
    <page-header title="QRCode" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <div class="row">
        <form-group class="col-sm-12 col-lg-6" label="狀態">
          <input-select
            v-model.trim="formData.status"
            track-by="value"
            label="name"
            :options="statusOptions"
            :required="true"
          />
        </form-group>

        <form-group
          class="col-12 col-lg-6"
          label="尺寸 (px)"
          label-for="inputWidth"
          rules="required"
        >
          <input
            id="inputWidth"
            v-model.trim="formData.width"
            class="form-control"
            type="text"
          />
        </form-group>

        <form-group
          class="col-12 col-lg-6"
          label="URL"
          label-for="inputUrl"
          rules="required"
        >
          <input
            id="inputUrl"
            v-model.trim="formData.url"
            class="form-control"
            type="text"
          />
        </form-group>
      </div>

      <div class="row">
        <div class="col d-flex justify-content-center">
          <img
            v-if="formData.url && formData.size >= 100"
            :src="qrCodeUrl"
            alt="QR Code"
          />
        </div>
      </div>

      <div v-show="isAuth('update')" class="text-center">
        <base-button @click="handleSave">
          儲存
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, notify } from '@/mixins'

export default {
  name: 'QrCodeIndex',
  mixins: [auth, notify],
  data() {
    return {
      breadcrumb: [
        {
          title: 'QRCode'
        }
      ],
      formData: this.getDefaultData(),
      statusOptions: [
        {
          name: '開啟',
          value: '1'
        },
        {
          name: '關閉',
          value: '0'
        }
      ]
    }
  },
  computed: {
    qrCodeUrl() {
      return (
        'https://chart.googleapis.com/chart?cht=qr&chl=' +
        this.formData.url +
        '&chs=' +
        this.formData.size
      )
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const list = ['authList', 'formData']

    try {
      const responses = await Promise.all([
        this.$api.getAuth('QRCODE'),
        this.$api.getQRCode()
      ])

      this.$api.bindResponses(this, list, responses)
    } catch (e) {
      console.warn(e)
    } finally {
      loader.hide()
    }
  },
  methods: {
    /** 儲存 */
    async handleSave() {
      const loader = this.$loading.show()
      try {
        await this.$api.patchQRCode(this.formData)
        this.notifyEditSuccess()
      } catch (e) {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    },
    /** 取得預設資料 */
    getDefaultData() {
      return {
        status: '1',
        url: '',
        width: 100
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label-title {
  font-size: 16px;
  padding-top: 9px;
}
</style>

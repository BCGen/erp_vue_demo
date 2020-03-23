<template>
  <div>
    <app-form ref="form" v-on="$listeners">
      <div class="col-9 date-label">
        <span v-if="formData.date">更新日期：{{ formData.date }}</span>
      </div>

      <form-group class="col-3" label="狀態">
        <input-select
          v-model.trim="formData.status"
          required
          :options="statusOptions"
        />
      </form-group>

      <form-group class="col-12" label-for="inputTitle" input-class="col-12">
        <app-editor v-model="formData.innerHtml" />
      </form-group>
    </app-form>

    <div class="text-center">
      <router-link to="/recruit/banner">
        <base-button>
          回清單
        </base-button>
      </router-link>

      <base-button @click="$refs.form.submit()">
        確定送出
      </base-button>
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'

export default {
  name: 'PrivacyForm',

  mixins: [notify],
  inheritAttrs: false,
  props: {
    requestData: {
      type: [Promise, null],
      default: null
    }
  },
  data() {
    return {
      /**表單資料 */
      formData: this.getDefaultData(),
      /** 狀態選項列表 */
      statusOptions: [
        { id: 0, value: '關閉' },
        { id: 1, value: '開啟' }
      ]
    }
  },
  async mounted() {
    if (this.requestData) {
      const loader = this.$loading.show()

      try {
        const response = await this.requestData

        if (this.$api.checkResponse(response)) {
          const { data } = response.data

          this.formData = {
            ...data,
            innerHtml: this.$f.unescapeHTML(data.innerHtml)
          }
        }
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    }
  },
  methods: {
    /** 取得預設資料 */
    getDefaultData() {
      return {
        /** 內容 */
        innerHtml: '',
        /** 狀態 */
        status: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.date-label {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
  padding-left: 30px;
}
</style>

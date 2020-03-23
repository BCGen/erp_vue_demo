<template>
  <div>
    <app-form ref="form" v-on="$listeners">
      <form-group class="col-12 col-xl-8" label="電腦版">
        <file-uploader
          id="uploaderPc"
          ref="uploaderPc"
          v-model="formData.urlPc"
          accept="image/*"
          :image-size="{ width: 2880, height: 1260 }"
          @image-size-error="pcImageSizeError"
        >
          <label v-if="imagePc()" for="uploaderPc">
            <img class="banner__image" :src="imagePc()" />
          </label>
          <div v-else>
            <label for="uploaderPc" class="uploader__button">
              選擇檔案
            </label>
            <div class="uploader__size__label">
              2880(寬) x 1260(長)
            </div>
          </div>
        </file-uploader>
      </form-group>

      <form-group class="col-12 col-xl-4" label="手機版">
        <file-uploader
          id="uploaderPhone"
          ref="uploaderPhone"
          v-model="formData.urlPhone"
          accept="image/*"
          :image-size="{ width: 750, height: 1248 }"
          @image-size-error="phoneImageSizeError"
        >
          <label v-if="imagePhone()" for="uploaderPhone">
            <img class="banner__image" :src="imagePhone()" />
          </label>
          <div v-else>
            <div>
              <label class="uploader__button" for="uploaderPhone">
                選擇檔案
              </label>
              <div class="uploader__size__label">
                750(寬) x 1248(長)
              </div>
            </div>
          </div>
        </file-uploader>
      </form-group>

      <form-group
        class="col-12"
        label="標題"
        label-for="inputTitle"
        input-class="col-10"
        rules="max_char:22,15"
      >
        <input
          id="inputTitle"
          v-model.trim="formData.title"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12"
        label="內文"
        label-for="inputTitle"
        input-class="col-10"
        rules="max_char:55,25"
      >
        <input
          id="inputText"
          v-model.trim="formData.text"
          class="form-control"
          type="text"
        />
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
  name: 'BannerForm',
  mixins: [notify],
  inheritAttrs: false,
  props: {
    /** 編輯時取資料方法 */
    requestData: {
      type: [Promise, null],
      default: null
    }
  },
  data() {
    return {
      /** 表單資料 */
      formData: this.getDefaultData(),
      defaultImagePc: '',
      defaultImagePhone: ''
    }
  },
  computed: {
    titleLen() {
      return this.len(this.formData.text)
    }
  },
  async mounted() {
    if (this.requestData) {
      const loader = this.$loading.show()

      try {
        const response = await this.requestData

        if (this.$api.checkResponse(response)) {
          const { urlPc, urlPhone, ...data } = response.data.data
          this.formData = data
          this.defaultImagePc = urlPc
          this.defaultImagePhone = urlPhone
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
        /** 標題 */
        title: '',
        /** 內文 */
        text: '',
        /** 電腦版圖片 */
        urlPc: null,
        /** 手機版圖片 */
        urlPhone: null
      }
    },
    tempImagePc() {
      const uploader = this.$refs.uploaderPc

      if (uploader && uploader.files && uploader.files.length > 0) {
        return uploader.files[0].path
      }
      return null
    },
    tempImagePhone() {
      const uploader = this.$refs.uploaderPhone

      if (uploader && uploader.files && uploader.files.length > 0) {
        return uploader.files[0].path
      }
      return null
    },
    imagePc() {
      return this.tempImagePc() || this.defaultImagePc
    },
    imagePhone() {
      return this.tempImagePhone() || this.defaultImagePhone
    },
    pcImageSizeError() {
      alert('電腦版圖片限制：1440(寬) x 630(長)')
    },
    phoneImageSizeError() {
      alert('手機版圖片限制：375(寬) x 624(長)')
    }
  }
}
</script>

<style lang="scss" scoped>
.banner__image {
  @media (min-width: 1371px) {
    max-height: 280px;
  }

  @media (min-width: 1251px) and (max-width: 1370px) {
    max-height: 240px;
  }

  @media (max-width: 1250px) {
    max-height: 225px;
  }

  @media (max-width: 1199px) {
    max-width: 100%;
  }
}

.uploader__button {
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  white-space: nowrap;
}
.uploader__size__label {
  font-size: 14px;
  color: red;
}
</style>

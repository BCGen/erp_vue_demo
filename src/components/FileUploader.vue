<template>
  <div>
    <input
      :id="$attrs.id || 'fileUploader'"
      ref="input"
      v-bind="$attrs"
      type="file"
      :class="inputClass"
      :files="value"
      @change="handleChange"
    />
    <slot>
      <label
        :for="$attrs.id || 'fileUploader'"
        class="custom-file-label upload-label"
        data-browse="瀏覽"
      >
        選擇檔案
      </label>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FileUploader',
  inheritAttrs: false,
  props: {
    inputClass: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: null
    },
    imageSize: {
      type: Object,
      default: () => ({
        height: null,
        width: null
      })
    }
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    /** 檢查圖片長寬是否符合條件 */
    checkImageSize(w, h) {
      const { height, width } = this.imageSize
      if (height === null && width === null) {
        return true
      } else {
        return Number(w) === Number(width) && Number(h) === Number(height)
      }
    },
    handleChange(e) {
      const { files } = e.target

      this.$emit('input', files)

      if (files.length > 0) {
        this.createFiles(files)
      } else {
        this.files = []
      }
    },
    createFiles(files) {
      const vm = this
      this.files = []

      if (files) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader()

          reader.onload = e => {
            const path = e.target.result

            vm.files.push({ file: files[i], path })

            // 取得圖片長寬
            this.loadImage(path, (width, height) => {
              if (this.checkImageSize(width, height)) {
                vm.files[i].width = width
                vm.files[i].height = height
              } else {
                vm.files = []
                this.$refs.input.value = ''
                this.$emit('image-size-error')
              }
            })
          }

          reader.readAsDataURL(files[i])
        }
      }
    },
    /** 取得圖片長寬 */
    loadImage(src, callback) {
      const img = new Image()

      img.onload = function onload() {
        callback(this.width, this.height)
      }

      img.src = src
    },
    reset() {
      this.$refs.input.value = ''
      this.handleChange({ target: this.$refs.input })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-label {
  width: '100%';
  overflow: hidden;
}
</style>

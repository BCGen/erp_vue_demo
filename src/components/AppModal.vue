<template>
  <div
    :id="`appModal${_uid}`"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="`appModalLabel${_uid}`"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 :id="`appModalLabel${_uid}`" class="modal-title">
            {{ modalTitle }}
          </h4>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="`${$listeners.submit ? 'btn-danger' : 'btn-primary'}`"
            class="btn"
            data-dismiss="modal"
          >
            {{ closeText }}
          </button>

          <button
            v-if="$listeners.submit"
            type="button"
            class="btn btn-primary ml-5"
            @click="$emit('submit')"
          >
            {{ submitText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** 關閉鈕文字 */
    closeText: {
      type: String,
      default: '關閉'
    },
    /** 確認鈕文字 */
    submitText: {
      type: String,
      default: '確認'
    },
    modalTitle: {
      type: String,
      default: ''
    }
  },
  mounted() {
    $(this.$refs.modal).on('show.bs.modal', () => {
      this.$emit('before-show')
    })

    $(this.$refs.modal).on('shown.bs.modal', () => {
      this.$emit('after-show')
    })

    $(this.$refs.modal).on('hide.bs.modal', () => {
      this.$emit('before-hide')
    })

    $(this.$refs.modal).on('hidden.bs.modal', () => {
      this.$emit('after-hidden')
    })
  },
  methods: {
    show(isStatic = false) {
      if (isStatic) {
        $(this.$refs.modal).modal({
          backdrop: 'static',
          keyboard: false
        })
      } else {
        $(this.$refs.modal).modal('show')
      }
    },
    hide() {
      $(this.$refs.modal).modal('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-footer {
  text-align: center;
}

.modal-header {
  border-bottom-color: lightgray;
}

.modal-title {
  font-weight: bold;
  text-align: center;
}
</style>

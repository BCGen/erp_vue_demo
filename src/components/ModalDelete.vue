<template>
  <div
    id="modalDelete"
    ref="modal"
    class="modal fade modal-delete"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <p class="alertify-message">
            是否確認刪除此筆資料?
          </p>
          <div>
            <button
              class="alertify-button alertify-button-cancel"
              data-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
            <button
              class="alertify-button alertify-button-ok"
              @click="$emit('confirm', modal)"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDelete',
  computed: {
    modal() {
      return this
    }
  },
  methods: {
    hide() {
      $(this.$refs.modal).modal('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-delete {
  .modal-content {
    border: 10px solid rgba(0, 0, 0, 0.5);
    background-color: transparent;
    border-radius: 8px;
  }

  .modal-body {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

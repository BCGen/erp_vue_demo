export const notify = {
  methods: {
    notifyFail(title) {
      this.$notify({
        group: 'action',
        title,
        type: 'err'
      })
    },
    /**
     * 新增資料成功
     */
    notifyCreateSuccess() {
      this.$notify({
        group: 'action',
        title: '新增成功',
        type: 'success'
      })
    },
    /**
     * 新增資料失敗
     */
    notifyCreateFail() {
      this.$notify({
        group: 'action',
        title: '新增失敗',
        type: 'err'
      })
    },
    /**
     * 編輯資料成功
     */
    notifyEditSuccess() {
      this.$notify({
        group: 'action',
        title: '編輯成功',
        type: 'success'
      })
    },
    /**
     * 編輯資料失敗
     */
    notifyEditFail() {
      this.$notify({
        group: 'action',
        title: '編輯失敗',
        type: 'err'
      })
    },
    /**
     * 刪除資料成功
     */
    notifyDeleteSuccess() {
      this.$notify({
        group: 'action',
        title: '刪除成功',
        type: 'success'
      })
    },
    /**
     * 刪除資料失敗
     */
    notifyDeleteFail() {
      this.$notify({
        group: 'action',
        title: '刪除失敗',
        type: 'err'
      })
    },
    /**
     * 取得資料失敗
     */
    notifyGetFail() {
      this.$notify({
        group: 'action',
        title: '取得資料失敗',
        type: 'err'
      })
    }
  }
}

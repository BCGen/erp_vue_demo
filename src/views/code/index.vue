<template>
  <div>
    <page-header title="選單維護" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <app-form ref="form" @submit="handleSearch">
        <form-group
          class="col-sm-12 col-xl-6"
          label="選單類別"
          rules="required"
        >
          <input-select
            v-model.trim="dataId"
            track-by="id"
            label="value"
            :options="typeOptions"
          />
        </form-group>
      </app-form>

      <div class="button_row">
        <base-button @click="$refs.form.submit()">
          查詢
        </base-button>

        <base-button v-show="isAuth('save')" @click="handleSave">
          儲存
        </base-button>

        <base-button v-show="isAuth('save')" @click="$refs.modal.show(true)">
          排序維護
        </base-button>

        <button-action-create v-show="isAuth('save')" @click="handleCreate">
          新增選項
        </button-action-create>
      </div>

      <app-table
        ref="table"
        :columns="tableColumns"
        :data.sync="tableData"
        :table-pagination="{ size: 10000, page: 1 }"
        :show-pagination="false"
        :draggable="true"
        :drag-option="dragOption"
      >
        <template v-slot:value="{ data, index }">
          <input
            :ref="`input-${index}`"
            v-model.trim="data.value"
            class="form-control d-inline"
            type="text"
            style="max-width: 60%;"
          />
        </template>

        <template v-slot:status="{ data, index }">
          <input-switch
            :id="`inputStatus${data.id}-${index}`"
            v-model="data.status"
            class="d-inline"
            true-value="1"
            false-value="0"
          />
          <div v-if="!data.id" class="button_all ml-3 d-inline">
            <button-action-delete @click="handleDelete(index)" />
          </div>
        </template>

        <template v-slot:action="{ data: { id }, index }">
          <div v-if="!id" class="button_all" style="display: inline;">
            <button-action-delete @click="handleDelete(index)" />
          </div>
        </template>
      </app-table>

      <div v-show="isAuth('save')" class="text-center">
        <base-button @click="handleSave">
          儲存
        </base-button>

        <button-action-create @click="handleCreate">
          新增選項
        </button-action-create>
      </div>
    </div>

    <app-modal
      ref="modal"
      close-text="取消"
      submit-text="儲存"
      modal-title="職缺維護 - 排序"
      @before-show="cloneTableDataToOrderData"
      @submit="handleOrderFormSubmit"
    >
      <order-form ref="orderForm" :list="orderData" />
    </app-modal>
  </div>
</template>

<script>
import { page } from '@/mixins'
import OrderForm from './components/OrderForm'

export default {
  components: {
    OrderForm
  },
  mixins: [page],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '選單維護'
        }
      ],
      currentParentId: null,
      /** 選單類別 Id */
      dataId: null,
      /** Table 欄位 */
      tableColumns: [
        {
          title: '選項名稱',
          dataIndex: 'value',
          slot: 'value'
        },
        {
          title: '是否啟用',
          dataIndex: 'status',
          slot: 'status',
          width: '150px'
        }
      ],
      /** 預設資料 */
      defaultData: [],
      dragOption: {
        handle: this.$isMobile() ? '.handle' : ''
      },
      /** 排序的資料 */
      orderData: [],
      /** Table 資料 */
      tableData: [],
      downloadIds: [],
      isSelectAllChecked: false,
      /** 選單類別列表 */
      typeOptions: []
    }
  },
  computed: {
    formatSubmitData() {
      return this.tableData
        .filter(item => !!item.value)
        .map((item, index) => ({
          ...item,
          order: index + 1
        }))
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const { bindResponses, checkResponse, ...api } = this.$api

    try {
      const authRes = await api.getAuth('CODE')
      if (checkResponse(authRes)) {
        bindResponses(this, 'authList', authRes)
      }

      // 取得所有類別資料
      const optionRes = await api.getCodes('ALL')

      if (checkResponse(optionRes)) {
        bindResponses(this, 'typeOptions', optionRes)
      }
      this.dataId = this.typeOptions[0].id
      this.currentParentId = this.typeOptions[0].id

      // 取得排序最前面的類別選單資料
      const response = await api.getCodeData(this.typeOptions[0].id)

      if (checkResponse(response)) {
        bindResponses(this, 'tableData', response)
      }
    } catch (e) {
      this.notifyGetFail()
    } finally {
      loader.hide()
    }
  },
  methods: {
    /** clone talbe 列表 給 排序列表 */
    cloneTableDataToOrderData() {
      this.orderData = JSON.parse(JSON.stringify(this.formatSubmitData))
    },
    /** 對最後一個 input focus */
    focusLastInput() {
      const index = this.tableData.length - 1
      const input = this.$refs[`input-${index}`]
      input.focus()
    },
    /** 建立選單項目 */
    handleCreate() {
      this.tableData.push({
        order: this.tableData.length,
        parentId: this.currentParentId,
        status: '0',
        value: ''
      })

      this.$nextTick(() => {
        this.focusLastInput()
      })
    },
    /** 刪除項目 */
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    /** 提交排序列表 */
    async handleOrderFormSubmit() {
      const loader = this.$loading.show()

      try {
        const data = this.orderData
        await this.$api.postCodeData({ data })

        this.handleSearch()
        this.notifyEditSuccess()
        this.$refs.modal.hide()
      } catch (e) {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    },
    async handleSave() {
      const loader = this.$loading.show()

      try {
        const data = this.formatSubmitData
        await this.$api.postCodeData({ data })
        this.handleSearch()
        this.notifyEditSuccess()
      } catch (e) {
        this.notifyEditFail()
      } finally {
        loader.hide()
      }
    },
    /** 搜尋 */
    async handleSearch() {
      const loader = this.$loading.show()

      try {
        const response = await this.$api.getCodeData(this.dataId)

        if (this.$api.checkResponse(response)) {
          this.tableData = response.data.data
          this.defaultData = response.data.data
          this.currentParentId = this.dataId
        }
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .tr {
  border: 1px solid #e1e8f9 !important;
}
</style>

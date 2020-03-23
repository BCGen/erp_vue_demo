<template>
  <div>
    <page-header title="職缺維護" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <app-form
        v-show="isAuth('search')"
        ref="form"
        class="row"
        @submit="handleSearch"
      >
        <form-group class="col-sm-12 col-lg-6 col-xl-4" label="職缺類型">
          <input-select v-model.trim="formData.typeid" :options="typeOptions" />
        </form-group>

        <form-group class="col-sm-12 col-lg-6 col-xl-4" label="置頂">
          <input-select
            v-model.trim="formData.sticky"
            :options="stickyOptions"
          />
        </form-group>

        <form-group class="col-sm-12 col-lg-6 col-xl-4" label="狀態">
          <input-select
            v-model.trim="formData.status"
            :options="statusOptions"
          />
        </form-group>

        <form-group
          class="col-sm-12 col-lg-10"
          label="工作地點"
          input-class="col-8 col-sm-9 col-lg-8"
        >
          <input-select
            v-model.trim="formData.wpid"
            multiple
            :options="workspaceOptions"
          />
        </form-group>
      </app-form>

      <div class="button_row">
        <base-button v-show="isAuth('update')" @click="handleFormSubmit">
          儲存
        </base-button>
        <base-button v-show="isAuth('update')" @click="$refs.modal.show(true)">
          排序維護
        </base-button>
        <button-action-search
          v-show="isAuth('search')"
          @click="$refs.form.submit()"
        />
        <button-action-create
          v-show="isAuth('insert')"
          @click="$router.push({ name: 'openingCreate' })"
        />
      </div>

      <app-table
        ref="table"
        :columns="authTableColumns"
        :data="formatList"
        :draggable="true"
        :drag-option="dragOption"
        row-key="id"
        @drag-change="handleDragChange"
      >
        <template v-slot:action="{ data: { id } }">
          <div class="button_all" style="display: inline;">
            <button-action-edit :link="`/recruit/opening/edit/${id}`" />
          </div>
        </template>

        <template v-slot:sticky="{ data }">
          <input-checkbox
            v-model="data.sticky"
            label-class="mb-0"
            true-value="1"
            false-value="0"
          />
        </template>
      </app-table>
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
          title: '職缺維護'
        }
      ],
      dragOption: {
        handle: this.$isMobile() ? '.handle' : ''
      },
      /** 搜尋表單資料 */
      formData: this.getDefaultData(),
      /** Table 欄位 */
      tableColumns: [
        {
          title: '職缺類型',
          dataIndex: 'type',
          sorter: false
        },
        {
          title: '工作地點',
          dataIndex: 'place',
          sorter: false
        },
        {
          title: '職稱',
          dataIndex: 'title',
          sorter: false
        },
        {
          title: '排序',
          dataIndex: 'order',
          sorter: false
        },
        {
          title: '置頂',
          dataIndex: 'sticky',
          slot: 'sticky',
          sorter: false
        },
        {
          title: '狀態',
          dataIndex: 'status',
          sorter: false
        }
      ],
      /** 排序的資料 */
      orderData: [],
      /** Table 資料 */
      tableData: [],
      /** 職缺類型選項列表 */
      typeOptions: [],
      /** 工作地點選項列表 */
      workspaceOptions: [],
      /** 職缺狀態選項列表 */
      statusOptions: [
        { id: 1, value: '開啟' },
        { id: 0, value: '關閉' }
      ],
      /** 置頂選項列表 */
      stickyOptions: [
        { id: 1, value: '是' },
        { id: 0, value: '否' }
      ]
    }
  },
  computed: {
    authTableColumns() {
      const actionColumn = {
        title: '操作',
        dataIndex: 'action',
        slot: 'action',
        width: '60px'
      }

      return this.isAuth('update')
        ? [...this.tableColumns, actionColumn]
        : this.tableColumns
    },
    stickyList() {
      return this.sortList(this.tableData.filter(data => data.sticky == '1'))
    },
    unStickyList() {
      return this.sortList(this.tableData.filter(data => data.sticky == '0'))
    },
    formatList() {
      return [...this.stickyList, ...this.unStickyList]
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const list = ['authList', 'tableData', 'typeOptions', 'workspaceOptions']

    try {
      const responses = await Promise.all([
        this.$api.getAuth('OPENING'),
        this.$api.getOpenings(),
        this.$api.getCodes('OPENING'),
        this.$api.getCodes('WORKPLACE')
      ])

      this.$api.bindResponses(this, list, responses)
    } catch (e) {
      this.notifyGetFail()
    } finally {
      loader.hide()
    }
  },
  methods: {
    handleDragChange({ data, moved }) {
      /** 移動項目的新 index */
      const newIndex = moved.newIndex
      /** 置頂列表的長度 */
      const stickyListLen = this.stickyList.length

      // 判斷移動的項目的位置是否需要置頂
      moved.element.sticky = newIndex < stickyListLen ? '1' : '0'
      moved.element.order =
        newIndex < stickyListLen
          ? this.stickyList[newIndex].order
          : this.unStickyList[newIndex - stickyListLen].order

      const stickyList = data.filter(item => item.sticky == '1')
      const unStickyList = data.filter(item => item.sticky != '1')

      stickyList.forEach((item, index) => {
        if (index > 0 && item.order <= stickyList[index - 1].order) {
          item.order = stickyList[index - 1].order + 1
        }
      })

      unStickyList.forEach((item, index) => {
        if (index > 0 && item.order <= unStickyList[index - 1].order) {
          item.order = unStickyList[index - 1].order + 1
        }
      })

      this.tableData = [...stickyList, ...unStickyList]
    },
    /** 排序列表 */
    sortList(list) {
      return (
        list
          // 依照 order 排序，如有相同的則以目前修改的項目優先
          .sort((current, next) => {
            const a = current.order === undefined ? 0 : current.order
            const b = next.order === undefined ? 0 : next.order
            return a == b && current.id == this.lastChangeItemId ? -1 : a - b
          })

          // 如 order 的值相等，將順序較後面的 + 1，避免重複，如比前一項小，改成前一項的 order + 1
          .map((item, index, array) => {
            if (index < array.length - 1) {
              if (item.order == array[index + 1].order) {
                array[index + 1].order = Number(array[index + 1].order) + 1
              } else if (item.order > array[index + 1].order) {
                array[index + 1].order = Number(item.order) + 1
              }
            }

            return item
          })
      )
    },
    getDefaultData() {
      return {
        /** 職缺類型 */
        typeid: null,
        /** 工作地點 */
        wpid: null,
        /** 狀態 */
        status: null,
        /** 置頂 */
        sticky: null
      }
    },
    /** clone talbe 列表 給 排序列表 */
    cloneTableDataToOrderData() {
      this.orderData = JSON.parse(JSON.stringify(this.tableData))
    },
    OrderSubmitData(submitData) {
      return submitData.map(item => ({
        id: item.id,
        sticky: item.sticky,
        order: item.order
      }))
    },
    /** 提交排序列表 */
    async handleOrderFormSubmit() {
      const isSuccess = await this.saveOpeningsOrder(this.orderData)
      if (isSuccess) {
        this.$refs.modal.hide()
        await this.handleSearch()
      }
    },
    /** 提交職缺置頂 */
    async handleFormSubmit() {
      await this.saveOpeningsOrder(this.tableData)
    },
    async saveOpeningsOrder(saveData) {
      const loader = this.$loading.show()

      try {
        const data = this.OrderSubmitData(saveData)
        await this.$api.postOpeningsOrder(data)
        this.notifyEditSuccess()
        return true
      } catch (e) {
        this.notifyEditFail()
        return false
      } finally {
        loader.hide()
      }
    },
    /** 搜尋 */
    async handleSearch() {
      const loader = this.$loading.show()

      try {
        const response = await this.$api.getOpenings(this.formData)

        if (this.$api.checkResponse(response)) {
          this.tableData = response.data.data

          this.$refs.table.resetPage()
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

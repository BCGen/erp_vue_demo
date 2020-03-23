<template>
  <div>
    <page-header title="隱私權維護" :breadcrumb="breadcrumb"></page-header>
    <div class="right-top">
      <app-form v-show="isAuth('search')" ref="form" @submit="handleSearch">
        <form-group
          class="col-sm-12 col-lg-6"
          input-class="col-7"
          label-class="col-4 col-lg-4 col-xl-3"
          label="更新日期 - 起"
          rules="required"
        >
          <input-datepicker
            ref="ds"
            v-model.trim="formData.ds"
            :option="datepickerStartOption"
          />
        </form-group>

        <form-group
          class="col-sm-12 col-lg-6"
          input-class="col-7"
          label-class="col-4 col-lg-4 col-xl-3"
          label="更新日期 - 迄"
          rules="required"
        >
          <input-datepicker
            ref="de"
            v-model.trim="formData.de"
            :option="datepickerEndOption"
          />
        </form-group>
      </app-form>

      <div class="button_row">
        <base-button v-show="isAuth('search')" @click="$refs.form.submit()">
          查詢
        </base-button>

        <button-action-create
          v-if="isAuth('insert')"
          @click="$router.push({ name: 'privacyCreate' })"
        />
      </div>

      <app-table ref="table" :columns="authTableColumns" :data="tableData">
        <template v-slot:innerHtml="{ data }">
          <span class="cursor-pointer" @click="handlePreviewClick(data)">
            預覽檢視
            <i
              class="fa fa-lg fa-search-plus icon-primary ml-1"
              aria-hidden="true"
            />
          </span>
        </template>

        <template v-slot:action="{ data: { id } }">
          <div class="button_all" style="display: inline;">
            <button-action-edit
              v-show="isAuth('update')"
              :link="`/recruit/privacy/edit/${id}`"
            />
          </div>
        </template>
      </app-table>

      <app-modal ref="modal" :modal-title="`隱私權政策 - ${previewData.date}`">
        <div v-html="$f.unescapeHTML(previewData.innerHtml)" />
      </app-modal>
    </div>
  </div>
</template>

<script>
import { page } from '@/mixins'
import tableData from '@/data/privacyList'

export default {
  name: 'PrivacyIndex',
  mixins: [page],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '隱私權維護'
        }
      ],
      /** 搜尋表單資料 */
      formData: this.getDefaultData(),
      tableColumns: [
        {
          title: '更新日期',
          dataIndex: 'date',
          width: '300px'
        },
        {
          title: '內容',
          dataIndex: 'innerHtml',
          slot: 'innerHtml'
        },
        {
          title: '狀態',
          dataIndex: 'status'
        }
      ],
      tableData,
      /** 預覽的資料 */
      previewData: {
        date: '',
        innerHtml: ''
      }
    }
  },
  computed: {
    /** 取得權限 table 欄位 */
    authTableColumns() {
      const actionColumn = {
        title: '操作',
        dataIndex: 'action',
        slot: 'action',
        width: '150px'
      }

      return this.isAuth('update')
        ? [...this.tableColumns, actionColumn]
        : this.tableColumns
    },
    /** 日期選擇器選項 - 起日 */
    datepickerStartOption() {
      const date = this.formData.de
      return {
        maxDate: date ? moment(date).format('YYYY/MM/DD') : null,
        yearRange: `2020:${moment(new Date()).format('YYYY')}`
      }
    },
    /** 日期選擇器選項 - 迄日 */
    datepickerEndOption() {
      const date = this.formData.ds
      return {
        minDate: date ? moment(date).format('YYYY/MM/DD') : null,
        yearRange: `2020:${moment(new Date()).format('YYYY')}`
      }
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const list = ['authList', 'tableData']

    try {
      const responses = await Promise.all([
        this.$api.getAuth('PRIVANCY'),
        this.handleSearch()
      ])

      this.$api.bindResponses(this, list, responses)
    } catch (e) {
      this.notifyGetFail()
    } finally {
      loader.hide()
    }
  },
  methods: {
    /** 取得預設資料 */
    getDefaultData() {
      return {
        /** 起日 */
        ds: '20200101',
        /** 迄日 */
        de: moment(new Date()).format('YYYYMMDD')
      }
    },
    /** 預覽隱私權 */
    handlePreviewClick(data) {
      this.previewData = data
      this.$refs.modal.show()
    },
    /** 搜尋 */
    async handleSearch() {
      const loader = this.$loading.show()

      try {
        const response = await this.$api.getPrivacies(this.formData)

        if (this.$api.checkResponse(response)) {
          this.tableData = response.data.data
        }

        this.$refs.table.resetPage()
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

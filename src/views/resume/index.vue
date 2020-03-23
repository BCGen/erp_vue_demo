<template>
  <div>
    <page-header title="履歷資料" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <app-form v-show="isAuth('search')" ref="form" @submit="handleSearch">
        <form-group class="col-sm-12 col-lg-6" label="起日" rules="required">
          <input-datepicker
            ref="ds"
            v-model.trim="formData.ds"
            :option="datepickerStartOption"
          />
        </form-group>

        <form-group class="col-sm-12 col-lg-6" label="迄日" rules="required">
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

        <base-button
          v-if="isAuth('pdf') && selectIds.length > 1"
          @click="handleDownloadZips"
        >
          批量下載
        </base-button>

        <base-button
          v-if="isAuth('excel') && !!selectIds.length"
          @click="handleDownloadExcel"
        >
          匯出 Excel
        </base-button>
      </div>

      <app-table
        ref="table"
        :columns="tableColumns"
        :data="tableData"
        :selected.sync="selectIds"
      >
        <template v-slot:name="{ data: { id, name } }">
          <a class="cursor-pointer" @click="handleDownloadPdf(id)">
            {{ name }}
          </a>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import { page } from '@/mixins'

export default {
  name: 'ResumeIndex',
  mixins: [page],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '履歷資料'
        }
      ],
      /** 搜尋表單資料 */
      formData: this.getDefaultData(),
      /** Table 欄位 */
      tableColumns: [
        {
          title: '填寫日期',
          dataIndex: 'date',
          sorter: true
        },
        {
          title: '姓名',
          dataIndex: 'name',
          sorter: true,
          slot: 'name'
        },
        {
          title: '教育程度',
          dataIndex: 'edu',
          sorter: true
        },
        {
          title: '學校',
          dataIndex: 'school',
          sorter: true
        },
        {
          title: '如何得知昕力徵才資訊',
          dataIndex: 'info',
          sorter: true
        }
      ],
      /** Table 資料 */
      tableData: [],
      selectIds: [],
      isSelectAllChecked: false
    }
  },
  computed: {
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
    const list = ['authList']

    try {
      const responses = await Promise.all([
        this.$api.getAuth('RESUME'),
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
    /** 下載 pdf */
    async handleDownloadPdf(id) {
      const loader = this.$loading.show()

      try {
        const response = await this.$api.getResumePdf(id)

        const file = response.data
        this.$f.toPdf(file, 'resume.pdf')
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    },
    /** 下載打包後的 Zip */
    async handleDownloadZips() {
      const ids = this.selectIds

      if (ids.length <= 1) {
        return
      }

      const loader = this.$loading.show()

      try {
        const response = await this.$api.getResumeZip(ids)
        const content = response.headers['content-disposition']

        this.$f.toZip(response.data, this.getFilename(content))
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    },
    /** 下載 Excel */
    async handleDownloadExcel() {
      const ids = this.selectIds

      if (!ids.length) {
        return
      }

      const loader = this.$loading.show()

      try {
        const response = await this.$api.getResumeExcel(ids)
        const content = response.headers['content-disposition']

        this.$f.toExcel(response.data, this.getFilename(content))
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    },
    /** 搜尋 */
    async handleSearch() {
      const loader = this.$loading.show()

      try {
        const response = await this.$api.getResumes(this.formData)

        if (this.$api.checkResponse(response)) {
          this.tableData = response.data.data
        }

        this.$refs.table.resetPage()
      } catch (e) {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    },
    /** 取得檔案名稱 */
    getFilename(content) {
      const reg = /filename="(\w+).*"/
      const result = content.match(reg)

      return result ? result[0].slice(10, -1) : ''
    }
  }
}
</script>

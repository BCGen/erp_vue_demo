<template>
  <div>
    <page-header title="字庫維護" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <!-- 搜尋表單 - Start -->
      <app-form
        v-show="isAuth('search')"
        ref="form"
        class="row"
        @submit="handleSearch"
      >
        <form-group
          class="col-12 col-xl-6"
          label="模糊比對字詞"
          label-for="inputKeyword"
          rules="max:50"
          input-class="col-8"
          label-class="col-4"
        >
          <input
            id="inputTitle"
            v-model.trim="formData.keyword"
            class="form-control"
            type="text"
          />
        </form-group>

        <form-group
          class="col-12 col-xl-6"
          label="使用者輸入關鍵字"
          label-for="inputResult"
          rules="max:50"
          input-class="col-8"
          label-class="col-4"
        >
          <input
            id="inputTitle"
            v-model.trim="formData.result"
            class="form-control"
            type="text"
          />
        </form-group>
      </app-form>
      <!-- 搜尋表單 - End -->

      <div class="button_row">
        <button-action-search
          v-show="isAuth('search')"
          @click="$refs.form.submit()"
        />
        <button-action-create
          v-show="isAuth('insert')"
          @click="$router.push({ name: 'dictionaryCreate' })"
        />
      </div>

      <app-table :columns="authTableColumns" :data="tableData">
        <template v-slot:action="{ data: { id } }">
          <div class="button_all" style="display: inline;">
            <button-action-edit :link="`/recruit/dictionary/edit/${id}`" />
          </div>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import { auth, notify } from '@/mixins'

export default {
  mixins: [auth, notify],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: '字庫維護'
        }
      ],
      /** 搜尋表單資料 */
      formData: this.getDefaultData(),
      /** Table 欄位 */
      tableColumns: [
        {
          title: '模糊比對字詞',
          dataIndex: 'result',
          sorter: true
        },
        {
          title: '使用者輸入關鍵字',
          dataIndex: 'keylist',
          sorter: true
        },
        {
          title: '狀態',
          dataIndex: 'status',
          sorter: true
        }
      ],

      /** Table 資料 */
      tableData: []
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
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const list = ['authList', 'tableData']

    try {
      const responses = await Promise.all([
        this.$api.getAuth('DICTIONARY'),
        this.$api.getDictionaries()
      ])

      this.$api.bindResponses(this, list, responses)
    } catch (e) {
      this.notifyGetFail()
    } finally {
      loader.hide()
    }
  },
  methods: {
    getDefaultData() {
      return {
        /** 模糊比對字詞 */
        keyword: '',
        /** 使用者輸入關鍵字 */
        result: ''
      }
    },
    /** 搜尋 */
    async handleSearch() {
      const loader = this.$loading.show()

      try {
        const response = await this.$api.getDictionaries(this.formData)

        if (this.$api.checkResponse(response)) {
          this.tableData = response.data.data
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

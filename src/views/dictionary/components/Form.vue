<template>
  <div>
    <app-form ref="form" v-on="$listeners">
      <div style="width: 70%; margin: 0 auto;">
        <form-group
          class="col-12 col-lg-6"
          label-class="col-5 col-xl-4"
          input-class="col-7 col-xl-8"
          label="模糊比對字詞"
          label-for="inputResult"
          rules="required|max:25"
        >
          <input v-model="formData.result" class="form-control" type="text" />
        </form-group>

        <form-group
          class="col-12 col-lg-6"
          label-class="col-5 col-xl-4"
          input-class="col-7 col-xl-8"
          label="狀態"
          rules="required"
        >
          <input-select
            v-model.trim="formData.status"
            required
            :options="statusOptions"
          />
        </form-group>

        <app-table
          :columns="tableColumns"
          :data="tableData"
          :table-pagination="{ size: 10000, page: 1 }"
          :show-no-data="false"
          :show-pagination="false"
        >
          <template v-slot:keyword="{ data }">
            <form-group
              class="col-12 pl-0 mb-0"
              input-class="col-12 pl-0"
              rules="required|max:25"
            >
              <input
                v-model.trim="data.keyword"
                class="form-control"
                type="text"
                style="max-width: 60%;"
              />
              <template slot="suffix">
                <span v-if="!data.id" class="delete-btn">
                  <button-action-delete @click="deleteKeyword(data.keyword)" />
                </span>
              </template>
              <!-- <span v-if="!data.id" class="delete-btn">
                <button-action-delete @click="deleteKeyword(data.keyword)" />
              </span> -->
            </form-group>
          </template>

          <template v-slot:status="{ data }">
            <input-switch
              v-model.trim="data.status"
              class="d-inline"
              true-value="1"
              false-value="0"
            />
          </template>
        </app-table>
      </div>
    </app-form>

    <app-form ref="addForm" @submit="addKeyword">
      <div style="width: 70%; margin: 0 auto;">
        <hr style="background: #e6e6e6; height: 1px;" />
        <div style="padding: 20px 40px;">
          <div class="row">
            <form-group
              class="col-7 mb-0"
              input-class="col-12 pl-0"
              rules="required|max:25"
            >
              <input
                v-model.trim="keyword"
                class="form-control"
                type="text"
                @keydown.enter="$refs.addForm.submit()"
              />
            </form-group>
            <div class="col-5 d-flex align-items-center justify-content-end">
              <base-button class="m-0 add-btn" @click="$refs.addForm.submit()">
                新增關鍵字
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </app-form>

    <div class="text-center">
      <router-link to="/recruit/dictionary">
        <base-button>
          回清單
        </base-button>
      </router-link>

      <base-button @click="$refs.form.submit()">
        儲存
      </base-button>
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'

export default {
  name: 'DictionaryForm',
  mixins: [notify],
  props: {
    /** 編輯時取資料方法 */
    requestData: {
      type: [Promise, null],
      default: null
    }
  },
  data() {
    return {
      tableColumns: [
        {
          title: '使用者輸入關鍵字',
          dataIndex: 'keyword',
          slot: 'keyword'
        },
        {
          title: '狀態',
          dataIndex: 'status',
          slot: 'status',
          width: '100px'
        }
      ],
      formData: {
        result: '',
        status: 1,
        keyword: []
      },
      /** 狀態選單列表 */
      statusOptions: [
        { id: 1, value: '開啟' },
        { id: 0, value: '關閉' }
      ],
      keyword: ''
    }
  },
  computed: {
    tableData() {
      return this.formData.keyword
    }
  },
  async mounted() {
    if (this.requestData) {
      const loader = this.$loading.show()

      try {
        const response = await this.requestData

        if (this.$api.checkResponse(response)) {
          this.formData = response.data.data
        }
      } catch {
        this.notifyGetFail()
      } finally {
        loader.hide()
      }
    }
  },
  methods: {
    /** 新增關鍵字 */
    addKeyword() {
      // 檢查關鍵字是否存在，不存在才新增
      if (this.findKeywordIndex(this.keyword) === -1) {
        this.formData.keyword.push({ keyword: this.keyword, status: 1 })
        this.keyword = ''
      }
    },
    /** 查詢關鍵字 index */
    findKeywordIndex(value) {
      return this.formData.keyword.findIndex(({ keyword }) => keyword === value)
    },
    /** 刪除關鍵字 */
    deleteKeyword(value) {
      const index = this.findKeywordIndex(value)

      if (index !== -1) {
        this.formData.keyword.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  font-size: 14px;
  min-width: 100px;
}

.delete-btn {
  position: relative;
  right: 40px;
  top: 8px;
}
</style>

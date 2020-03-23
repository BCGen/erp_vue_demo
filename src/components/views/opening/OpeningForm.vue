<template>
  <div>
    <app-form ref="form" v-on="$listeners">
      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="職缺類型"
        rules="required"
      >
        <input-select
          v-model.trim="formData.typeid"
          track-by="id"
          label="value"
          :options="typeOptions"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="工作地點"
        rules="required"
      >
        <input-select
          v-model.trim="formData.wpid"
          track-by="id"
          label="value"
          :options="workspaceOptions"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="狀態"
        rules="required"
      >
        <input-select
          v-model.trim="formData.status"
          track-by="value"
          label="name"
          :options="statuses"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-10 col-xl-10"
        label="104 網址"
        label-for="inputUrl"
        rules="url_start:https://www.104.com.tw/|max:500"
      >
        <input
          id="inputUrl"
          v-model.trim="formData.url"
          class="form-control"
          type="text"
        />
      </form-group>

      <div class="col-12 my-5">
        <page-header title="工作內容" :show-breadcrumb="false" />
      </div>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="職稱"
        label-for="inputTitle"
        rules="max:200"
      >
        <input
          id="inputTitle"
          v-model.trim="formData.title"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="工作性質"
        label-for="inputNature"
        rules="max:20"
      >
        <input
          id="inputNature"
          v-model.trim="formData.nature"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="出差外派"
        label-for="inputTrip"
        rules="max:50"
      >
        <input
          id="inputTrip"
          v-model.trim="formData.trip"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="工作時段"
        label-for="inputWhours"
        rules="max:30"
      >
        <input
          id="inputWhours"
          v-model.trim="formData.whours"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="需求人數"
        label-for="inputNum"
        rules="max:30"
      >
        <input
          id="inputNum"
          v-model.trim="formData.num"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="休假制度"
        label-for="inputVacation"
        rules="max:30"
      >
        <input
          id="inputVacation"
          v-model.trim="formData.vacation"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="上班地點"
        label-for="inputWpDetail"
        rules="max:100"
      >
        <input
          id="inputWpDetail"
          v-model.trim="formData.wpDetail"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group
        class="col-12 col-xl-8"
        label="工作內容"
        label-for="inputContent"
        input-class="col-8 col-sm-9 col-lg-10"
        rules="max:1000"
      >
        <textarea
          id="inputContent"
          v-model.trim="formData.content"
          class="form-control table_message"
          cols="30"
          rows="6"
        ></textarea>
      </form-group>

      <div class="col-12 my-5">
        <page-header title="需求條件" :show-breadcrumb="false" />
      </div>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="工作經歷"
        label-for="inputExp"
        rules="max:100"
      >
        <input
          id="inputExp"
          v-model.trim="formData.exp"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group class="col-12 col-lg-6 col-xl-4" label="學歷要求">
        <input-select
          v-model.trim="formData.edu"
          track-by="id"
          label="value"
          :options="eduOptions"
        />
      </form-group>

      <form-group
        class="col-12 col-lg-6 col-xl-4"
        label="科系要求"
        label-for="inputDep"
        rules="max:50"
      >
        <input
          id="inputDep"
          v-model.trim="formData.dep"
          class="form-control"
          type="text"
        />
      </form-group>

      <form-group class="col-12" label="語文條件">
        <div
          v-for="({ id, value }, index) in langOptions"
          :key="id"
          class="d-inline"
        >
          <input-checkbox
            :id="id"
            v-model="formData.lang"
            :label="value"
            :value="id"
          />
          <br v-if="index % 3 === 2" />
        </div>
      </form-group>

      <form-group class="col-12" label="擅長工具">
        <div v-for="{ id, value } in skillOptions" :key="id" class="d-inline">
          <input-checkbox
            :id="id"
            v-model="formData.skill"
            :label="value"
            :value="id"
          />
        </div>
      </form-group>

      <form-group
        class="col-12"
        label="其他條件"
        label-for="inputOther"
        input-class="col-8 col-sm-9 col-lg-10 col-xl-11"
        rules="max:1000"
      >
        <textarea
          id="inputOther"
          v-model.trim="formData.other"
          class="form-control table_message"
          cols="30"
          rows="6"
        />
      </form-group>
    </app-form>

    <div class="text-center">
      <router-link to="/recruit/opening">
        <base-button>
          回清單
        </base-button>
      </router-link>

      <base-button @click="$refs.form.submit()">
        確定送出
      </base-button>
    </div>
  </div>
</template>

<script>
import { notify } from '@/mixins'

export default {
  name: 'OpeningForm',
  mixins: [notify],
  inheritAttrs: false,
  props: {
    requestData: {
      type: [Promise, null],
      default: null
    }
  },
  data() {
    return {
      /**表單資料 */
      formData: this.getDefaultData(),
      /** 頁面資料是否讀取完成 */
      isDataLoaded: false,
      /** 學歷選項列表 */
      eduOptions: [],
      /** 語文條件選項列表 */
      langOptions: [],
      /** 善長工具選項列表 */
      skillOptions: [],
      /** 職缺類型選項列表 */
      typeOptions: [],
      /** 工作地點選項列表 */
      workspaceOptions: [],
      /** 職缺狀態選項列表 */
      statuses: [
        { name: '開啟', value: '1' },
        { name: '關閉', value: '0' }
      ]
    }
  },
  computed: {
    workSpace() {
      const space = this.workspaceOptions.find(
        ({ id }) => id === this.formData.wpid
      )

      return space ? space.value : ''
    }
  },
  watch: {
    /** 工作地點選擇後自動更新上班地點 */
    workSpace(newValue) {
      if (this.isDataLoaded) {
        this.formData.wpDetail = newValue
      }
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const list = [
      'eduOptions',
      'langOptions',
      'skillOptions',
      'typeOptions',
      'workspaceOptions'
    ]
    const promises = [
      this.$api.getCodes('EDU'),
      this.$api.getCodes('LANGABILITY'),
      this.$api.getCodes('SKILL'),
      this.$api.getCodes('OPENING'),
      this.$api.getCodes('WORKPLACE')
    ]

    if (this.requestData) {
      list.push('formData')
      promises.push(this.requestData)
    }

    try {
      this.$api.bindResponses(this, list, await Promise.all(promises))
    } catch (e) {
      this.notifyGetFail()
    } finally {
      // 避免編輯時一開始就觸發工作地點 watch
      setTimeout(() => {
        this.isDataLoaded = true
      })
      loader.hide()
    }
  },
  methods: {
    /** 取得預設資料 */
    getDefaultData() {
      return {
        /** 職缺類型 */
        typeid: '',
        /** 工作地點 */
        wpid: '',
        /** 狀態 */
        status: '',
        /** 104 Url */
        url: '',
        /** 職稱 */
        title: '',
        /** 工作內容 */
        content: '',
        /** 工作性質 */
        nature: '',
        /** 出差外派 */
        trip: '',
        /** 工作時段 */
        whours: '',
        /** 需求人數 */
        num: '',
        /** 休假制度 */
        vacation: '',
        /** 上班地點 */
        wpDetail: '',
        /** 工作經歷 */
        exp: '',
        /** 學歷要求 */
        edu: '',
        /** 科系要求 */
        dep: '',
        /** 語文條件 */
        lang: [],
        /** 擅長工具 */
        skill: [],
        /** 其他條件 */
        other: ''
      }
    },
    /** 設定表單資料 */
    setData(data) {
      this.formData = data
    }
  }
}
</script>

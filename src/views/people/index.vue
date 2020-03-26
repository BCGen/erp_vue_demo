<template>
  <div class="test">
    <h3>Neil Lai</h3>
    <h3>{{formData}}</h3>
    <div>
      <div>
        <div class="title">
          <h3>待審清單</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">採購系統</li>
              <li class="breadcrumb-item">查詢採購單</li>
            </ol>
          </nav>
        </div>
        <hr />
      </div>
      <div class="right_top">
        <form-group class="col-sm-12 col-lg-6 col-xl-6" label="請購日期(啟)" rules="required">
          <input-datepicker v-model="formData.applyDateStartDate" />
        </form-group>

        <form-group class="col-sm-12 col-lg-6 col-xl-6" label="請購日期(迄)" rules="required">
          <input-datepicker v-model="formData.applyDateEndDate" />
        </form-group>

        <form-group class="col-sm-12 col-lg-6 col-xl-6" label="請購人員" rules="required">
          <input v-model="formData.applyEmpId" class="form-control" />
        </form-group>
        <form-group class="col-sm-12 col-lg-6 col-xl-6" label="請購單號" rules="required">
          <input v-model="formData.applyId" class="form-control" />
        </form-group>

        <form-group v-if="statusOptions.isShow" class="col-sm-12 col-lg-6 col-xl-6" label="案件狀態">
          <input-select
            v-model="formData.status"
            :disabled="statusOptions.isDisabled"
            :options="statusOptions.options"
            label="label"
            track-by="value"
          ></input-select>
        </form-group>
        <form-roup
          v-if="purchasingOrderOptions.isShow"
          class="col-sm-12 col-lg-12 col-xl-12"
          label="採購類型"
        >
          <input-checkbox
            v-for="item in  purchasingOrderOptions.options"
            :key="item.value"
            v-model="formData.prsTypeList"
            :disabled="purchasingOrderOptions.isDisabled"
            :label="item.label"
            :value="item.value"
          ></input-checkbox>
        </form-group>
        <form-group
          v-if="purchasingRequisitionOptions.isShow"
          class="col-sm-12 col-lg-12 col-xl-12"
          label="請購類型"
        >
          <input-checkbox
            v-for="item in purchasingRequisitionOptions.options"
            :key="item.value"
            v-model="formData.applyTypeList"
            :disabled="purchasingRequisitionOptions.isDisabled"
            :label="item.label"
            :value="item.value"
          ></input-checkbox>
        </form-group>
        <div class="button_row" style="text-align:center">
          <base-button>查詢</base-button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <validation-observer>
      {{formData}}
      <h1>Neil Lai</h1>
      <ValidateInput label="ID">
        <input v-model="formData.id" type="text" />
      </ValidateInput>
      <ValidateInput label="Name">
        <input v-model="formData.name" type="text" />
      </ValidateInput>
      <form-group label="學校">
        <input-select v-model="formData.schoolID" :options="schoolOption"></input-select>
        <input-checkbox
          v-for="lang in langOptions"
          :key="lang.id"
          :label="lang.value"
          :value="lang.id"
          v-model="formData.langs"
        />
      </form-group>
      <button @click="handleSubmit">提交</button>
      <form-group ref="inputschool" class="col-12" label="起日" rules="required">
        <input-datepicker v-model="formData.ds" />
      </form-group>
    </validation-observer>
  </div>-->
</template>
<script>
import axios from 'axios'
import type from '@/components/type.vue'
import ValidateInput from '@/components/Validateinput.vue'

export default {
  components:{type,ValidateInput},

  data(){
     return{
      //  schoolOption:[],
      //  tableList:[],
      //  langOptions:[],
      statusOptions:{
        options:[],
        isShow:'',
        isDisabled:''
      },
      purchasingOrderOptions:{
        options:[],
        isShow:'',
        isDisabled:''
      },
      purchasingRequisitionOptions:{
        options:[],
        isShow:'',
        isDisabled:''
      },
       formData:{
        //  id:'',
        //  name:'',
        //  schoolID:'',
        //  langs:[],
         applyDateStartDate	:'',
         applyDateEndDate:'',
         applyEmpId:'',
         status:'',
         prsTypeList:[],
         applyTypeList:[]
       },
        tableColumns: [
          {
          title: 'ID',
          dataIndex: 'id',
          sorter:true
        },
        {
          title: '姓名',
          dataIndex: 'name',
          sorter:true
        }
        ],
     }
  },
  mounted(){
    // axios.get('http://192.168.70.120:3000/people').then(res=>{
    //   this.tableList = res.data;
    // })
    // axios.get('http://192.168.70.120:3000/schools').then(res=>{
    //   this.schoolOption = res.data
    // })
    // axios.get('http://192.168.70.120:3000/langs').then(res=>{
    //   this.langOptions = res.data
    // })
    axios.get('http://192.168.70.120:7000/purchase/review/home').then(res=>{
      this.statusOptions = res.data.data.statusOptions
      // for(let i=0;i<this.statusOptions.options.length;i++){
      // if(this.statusOptions.options[i].selected == true){
      //     this.formData.status = this.statusOptions.options[i].value
      // }
      // }
      this.formData.status = this.statusOptions.options.find(x=>x.selected == true).value
    })
    axios.get('http://192.168.70.120:7000/purchase/review/home').then(res=>{
      this.purchasingOrderOptions = res.data.data.purchasingOrderOptions
     let test = this.purchasingOrderOptions.options.filter(x=>x.selected == true)
     for(let i=0;i<test.length;i++){
       this.formData.prsTypeList.push(test[i].value)
     }
    })
    axios.get('http://192.168.70.120:7000/purchase/review/home').then(res=>{
      this.purchasingRequisitionOptions = res.data.data.purchasingRequisitionOptions
      let test = this.purchasingRequisitionOptions.options.filter(x=>x.selected ==true)
      for(let i =0;i<test.length;i++){
        this.formData.applyTypeList.push(test[i].value)
      }
    })
  },
  methods: {
    handleSubmit(){
      console.log(this.$refs.inputschool)
    }
  },
}
</script>

<style lang="scss" scope>
.test /deep/ {
  .form-group__label {
    width: 140px;
  }
}
</style>

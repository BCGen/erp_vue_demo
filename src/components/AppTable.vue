<template>
  <div class="dataTables_wrapper">
    <div
      v-if="showPagination"
      id="DataTables_Table_0_length"
      class="dataTables_length"
    >
      <label>
        每頁顯示
        <select
          v-model="pagination.size"
          name="DataTables_Table_0_length"
          aria-controls="DataTables_Table_0"
        >
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="10000">全部</option>
        </select>
        筆資料，共 {{ data.length }} 筆
      </label>
    </div>

    <ul>
      <li class="thead">
        <ol class="tr">
          <!-- 選擇全部 -->
          <li v-if="selected" style="width: 100px; vertical-align: middle;">
            <input
              id="checkbox"
              class="form-check-input"
              type="checkbox"
              :checked="isSelectAllChecked"
              @change="handleSelectAllCheck"
            />
            <label for="checkbox" class="form-check-label mb-0" />
          </li>
          <li
            v-for="(column, index) in columns"
            :key="column.dataIndex || index"
            :style="{ width: column.width, 'vertical-align': 'middle' }"
            :class="[
              column.sorter ? 'sorter' : '',
              sort.sort === column.dataIndex ? `sorter_${sort.order}` : ''
            ]"
            @click="column.sorter && setSort(column.dataIndex)"
          >
            <template v-if="column.titleSlot">
              <slot :name="column.titleSlot" />
            </template>
            <template v-else>
              {{ column.title }}
            </template>
          </li>
        </ol>
      </li>
      <draggable
        ref="draggable"
        :list="data"
        :group="{ name: 'people' }"
        class="tbody"
        v-bind="dragOptions"
        :disabled="!draggable"
        v-on="dragEvents"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group
          v-for="(item, index) in filterData"
          :key="rowKey ? item[rowKey] : index"
          type="transition"
          :name="!drag ? 'flip-list' : null"
          class="tr"
          :class="{ tr__dragger: draggable && $isMobile() }"
        >
          <!-- 多選 Checkbox - Start -->
          <li v-if="selected" :key="`select${item.id}`">
            <input
              id="checkbox"
              class="form-check-input"
              type="checkbox"
              :checked="selected.includes(item.id.toString())"
              :value="item.id"
              style="vertical-align: middle;"
              @change="handleSelectCheck"
            />
            <label for="checkbox" class="form-check-label mb-0" />
          </li>
          <!-- 多選 Checkbox - End -->

          <li
            v-for="column in columns"
            :key="column.dataIndex"
            :data-title="column.title"
            style="vertical-align: middle;"
          >
            <template v-if="column.slot">
              <slot
                :name="column.slot"
                :data="item"
                :value="item[column.dataIndex]"
                :index="index"
              />
            </template>
            <template v-else-if="column.format">
              {{ column.format(item[column.dataIndex]) }}
            </template>
            <template v-else>
              {{ item[column.dataIndex] }}
            </template>
          </li>

          <div
            v-if="draggable && $isMobile()"
            :key="`handle${index}`"
            class="handle"
          >
            <img
              class="position-center"
              src="@/assets/images/swipe_35.png"
              srcset="@/assets/images/swipe_35.png"
              width="35"
            />
          </div>
        </transition-group>
      </draggable>
    </ul>
    <div v-if="data.length === 0 && showNoData" class="no-data">查無資料</div>

    <app-pagination
      v-if="showPagination"
      v-model="pagination.page"
      class="dataTables_paginate paging_simple_numbers"
      :total="data.length"
      :size="Number(pagination.size)"
      active-class="current"
      button-class="paginate_button"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'AppTable',
  display: 'Transitions',
  components: {
    AppPagination,
    draggable
  },
  props: {
    /**
     * 欄位資訊
     * @type {string[]} columns
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * Table 資料
     * @type {Object[]} data
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 是否可拖曳
     */
    draggable: {
      type: Boolean,
      default: false
    },
    dragOption: {
      type: Object,
      default: () => ({})
    },
    /**
     * 欄位 Key
     * @type {String | null}
     */
    rowKey: {
      type: [String, null],
      default: null
    },
    selected: {
      type: [Array, null],
      default: null
    },
    /** 是否顯示查無資料 */
    showNoData: {
      type: Boolean,
      default: true
    },
    tablePagination: {
      type: Object,
      default: () => ({
        page: 1,
        size: 20
      })
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      drag: false,
      pagination: this.tablePagination,
      sort: {
        sort: null,
        order: 'asc'
      }
    }
  },
  computed: {
    /** draggable 事件 */
    dragEvents() {
      const dragOptions = this.dragOptions

      return Object.keys(dragOptions)
        .filter(key => typeof dragOptions[key] === 'function')
        .reduce(
          (a, b) =>
            typeof a === 'object'
              ? { ...a, ...{ [b]: dragOptions[b] } }
              : { [a]: dragOptions[a], [b]: dragOptions[b] },
          {}
        )
    },
    /** draggable 選項 */
    dragOptions() {
      const dragOption = {
        change: ({ moved }) => {
          this.$emit('drag-change', {
            data: this.data,
            moved: { ...moved }
          })
        },
        ...this.dragOption
      }
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        ...dragOption
      }
    },
    /** 全選 chenckbox 是否勾選 */
    isSelectAllChecked() {
      if (this.data.length === 0) {
        return false
      }

      const { page, size } = this.pagination
      const start = page === 1 ? 0 : (page - 1) * size
      const end = page === 1 ? page * size : page * size - 1
      const array = [...this.selected]
      let data = [...this.data]
      data = data.slice(start, end).map(item => item.id.toString())
      return data.every(item => array.includes(item))
    },
    groupData() {
      const list = [...this.data]
      const arr1 = list.filter(data => data.sticky == '1')
      const arr2 = list.filter(data => data.sticky == '0')

      return [...arr1, ...arr2]
    },
    /** 分頁資料 */
    filterData() {
      const { page, size } = this.pagination
      const start = page === 1 ? 0 : (page - 1) * size
      const end = page === 1 ? page * size : page * size - 1
      return this.sortData.slice(start, end)
    },
    /** 排序資料  */
    sortData() {
      const { order, sort } = this.sort
      const dataList = [...this.data]
      let list = dataList
      if (sort) {
        if (order === 'asc') {
          list = dataList.sort((a, b) =>
            a[sort].toString().localeCompare(b[sort].toString())
          )
        } else {
          list = dataList.sort((a, b) =>
            b[sort].toString().localeCompare(a[sort].toString())
          )
        }
      }
      return list
    }
  },
  watch: {
    'pagination.size': {
      handler() {
        this.pagination.page = 1
      }
    }
  },
  methods: {
    handleSelectAllCheck({ target: { checked } }) {
      const { page, size } = this.pagination
      const start = page === 1 ? 0 : (page - 1) * size
      const end = page === 1 ? page * size : page * size - 1
      const array = [...this.selected]
      let data = [...this.data]
      data = data.splice(start, end).map(item => item.id.toString())

      if (checked) {
        data.forEach(id => {
          if (!array.includes(id)) {
            array.push(id)
          }
        })
        this.$emit('update:selected', array)
      } else {
        data.forEach(id => {
          const index = array.indexOf(id)

          if (index !== -1) {
            array.splice(index, 1)
          }
        })
        this.$emit('update:selected', array)
      }
    },
    /** 選擇鈕點擊 */
    handleSelectCheck({ target: { checked, value } }) {
      const array = [...this.selected]

      if (checked && !array.includes(value)) {
        // 如果勾選則寫入陣列
        array.push(value)
        this.$emit('update:selected', array)
      } else if (!checked && array.includes(value)) {
        // 如果未勾選則移除陣列
        array.splice(array.indexOf(value), 1)
        this.$emit('update:selected', array)
      }
    },
    /** 重設頁數 */
    resetPage() {
      this.pagination.page = 1
    },
    setSort(field) {
      if (this.sort.sort === field) {
        if (this.sort.order === 'desc') {
          this.sort.order = 'asc'
        } else {
          this.sort.order = null
          this.sort.sort = null
          // this.sort.order = 'desc'
        }
      } else {
        this.sort.sort = field
        this.sort.order = 'desc'
      }

      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.no-move {
  transition: transform 0s;
}

.ghost {
  transition: transform 0.5s;
  opacity: 0.5;
  background: #e1e8f9;
}

ul {
  width: 100%;
  display: table;
  margin: 0 auto;
  border-collapse: collapse;
  border: none;
}

.thead {
  display: table-header-group;
}

.tr {
  display: table-row;
}

.tbody {
  display: table-row-group;
}

.thead li,
.tr li {
  display: table-cell;
  padding: 20px 5px;
  color: #555;
  font-size: 15px;

  &:nth-child(1) {
    padding-left: 40px;
  }
}

.thead li {
  background-color: #e1e8f9;
  font-size: 16px;
  padding: 10px 8px;
  color: #333;

  &.sorter {
    background-image: url(../assets/images/icon_bg.png);
    background-repeat: no-repeat;
    background-position: center right 10px;
    cursor: pointer;

    &.sorter_asc {
      background-image: url(../assets/images/icon_asc.png);
    }

    &.sorter_desc {
      background-image: url(../assets/images/icon_desc.png);
    }
  }
}

@media only screen and (max-width: 992px) {
  .thead {
    display: none;
  }
  .tr {
    display: block;
    border: #ddd 1px solid;
    margin-bottom: 5px;
    padding-inline-start: 0;
  }
  .tr li {
    display: inline-block;
    width: 100%;
    border: none;
    padding: 8px;

    &:nth-child(1) {
      padding-left: 8px;
    }
  }
  .tr li:before {
    content: attr(data-title);
    display: inline-block;
    width: auto;
    min-width: 20%;
    font-weight: 900;
    padding-right: 1rem;
  }
}

.tr__dragger {
  padding-left: 60px;
  position: relative;
}

.handle {
  position: absolute;
  left: 0;
  top: 0;
  color: lightgray;
  padding: 30px;
  height: 100%;
}

.no-data {
  text-align: center;
  font-size: 16px;
  padding: 20px 0;
}
</style>

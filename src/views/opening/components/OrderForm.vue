<template>
  <div class="sort-form">
    <div class="sort-form-row sort-form-row-title">
      <div class="grid-table-cell">項次</div>
      <div class="grid-table-cell">職缺類型</div>
      <div class="grid-table-cell">工作地點</div>
      <div class="grid-table-cell">職稱</div>
      <div class="grid-table-cell">置頂</div>
      <div class="grid-table-cell">排序</div>
    </div>

    <!-- 置頂列表 - Start -->
    <div
      v-for="(data, index) in stickyList"
      :key="data.id"
      class="sort-form-row"
    >
      <div class="grid-table-cell">{{ index + 1 }}</div>
      <div class="grid-table-cell">{{ data.type }}</div>
      <div class="grid-table-cell">{{ data.place }}</div>
      <div class="grid-table-cell">{{ data.title }}</div>
      <div class="grid-table-cell">
        <input-checkbox
          v-model="data.sticky"
          label-class="mb-0"
          true-value="1"
          false-value="0"
        />
      </div>
      <div class="grid-table-cell">
        <input
          v-model.lazy="data.order"
          type="number"
          class="form-control sort-form-row-input"
          @change="lastChangeItemId = data.id"
        />
      </div>
    </div>
    <!-- 置頂列表 - End -->

    <!-- 非置頂列表 - Start -->
    <div
      v-for="(data, index) in unstickyList"
      :key="data.id"
      class="sort-form-row"
    >
      <div class="grid-table-cell">{{ index + 1 }}</div>
      <div class="grid-table-cell">{{ data.type }}</div>
      <div class="grid-table-cell">{{ data.place }}</div>
      <div class="grid-table-cell">{{ data.title }}</div>
      <div class="grid-table-cell">
        <input-checkbox
          v-model="data.sticky"
          label-class="mb-0"
          true-value="1"
          false-value="0"
        />
      </div>
      <div class="grid-table-cell">
        <input
          v-model.lazy="data.order"
          type="number"
          class="form-control sort-form-row-input"
          @change="lastChangeItemId = data.id"
        />
      </div>
    </div>
    <!-- 非置頂列表 - End -->
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      lastChangeItemId: undefined
    }
  },
  computed: {
    /** 置頂列表 */
    stickyList() {
      return this.sortList(this.list.filter(({ sticky }) => sticky == '1'))
    },
    /** 非置頂列表 */
    unstickyList() {
      return this.sortList(this.list.filter(({ sticky }) => sticky != '1'))
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-form {
  display: grid;
  font-size: 15px;
  max-height: 70vh;

  &-row {
    display: grid;
    padding: 5px;
    align-items: center;
    grid-template-columns: 80px 1fr 2fr 2fr 80px 1fr;
    border-bottom: 1px solid lightgray;

    &.sort-form-row-title {
      background-color: #e1e8f9;
      padding: 10px 5px;
      border-bottom: 0;
    }

    &-input {
      height: 30px;
    }
  }
}
</style>

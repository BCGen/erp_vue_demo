<template>
  <div>
    <page-header title="Banner" :breadcrumb="breadcrumb" />
    <div class="right_top">
      <div class="button_row">
        <button-action-create
          v-if="isAuth('insert')"
          @click="$router.push({ name: 'bannerCreate' })"
        />
      </div>

      <app-table ref="table" :columns="tableColumns" :data="tableData">
        <template v-slot:image="{ data: { urlPc } }">
          <img :src="urlPc" style="width: 90%;" />
        </template>

        <template v-slot:action="{ data: { id } }">
          <div class="button_all" style="display: inline;">
            <button-action-edit
              v-show="isAuth('update')"
              :link="`/recruit/banner/edit/${id}`"
            />
            <button-action-delete
              v-show="isAuth('delete')"
              @click="deleteId = id"
            />
          </div>
        </template>
      </app-table>
    </div>

    <modal-delete @confirm="handleDelete" />
  </div>
</template>

<script>
import { page } from '@/mixins'

export default {
  name: 'Banner',
  mixins: [page],
  data() {
    return {
      /** 麵包屑 */
      breadcrumb: [
        {
          title: 'Banner'
        }
      ],
      deleteId: null,
      tableColumns: [
        {
          title: '圖片預覽',
          dataIndex: 'image',
          slot: 'image',
          width: '300px'
        },
        {
          title: '標題',
          dataIndex: 'title'
        },
        {
          title: '內文',
          dataIndex: 'text'
        },
        {
          title: '操作',
          dataIndex: 'action',
          slot: 'action',
          width: '150px'
        }
      ],
      tableData: []
    }
  },
  async mounted() {
    const loader = this.$loading.show()
    const list = ['authList', 'tableData']

    try {
      const responses = await Promise.all([
        this.$api.getAuth('BANNER'),
        this.$api.getBanners()
      ])

      this.$api.bindResponses(this, list, responses)
    } catch {
      this.notifyGetFail()
    } finally {
      loader.hide()
    }
  },
  methods: {
    async handleDelete(modal) {
      const loader = this.$loading.show()
      modal.hide()

      try {
        await this.$api.deleteBanner(this.deleteId)
        await this.getBanners()
        this.notifyDeleteSuccess()
      } catch (e) {
        this.notifyDeleteFail()
      } finally {
        loader.hide()
      }
    },
    async getBanners() {
      try {
        const response = await this.$api.getBanners()

        if (this.$api.checkResponse(response)) {
          this.$api.bindResponses(this, 'tableData', response)
        }
        this.$refs.table.resetPage()
      } catch (e) {
        this.notifyGetFail()
      }
    }
  }
}
</script>

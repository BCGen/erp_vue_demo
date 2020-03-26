<template>
  <div id="app" class="vh-md-100">
    <app-header @toggle="$refs.menu.toggle()" />

    <!-- 主內容 - Start -->
    <section class="content">
      <!-- Menu -->
      <app-menu ref="menu" :menu-list="menuList" :user="user" />

      <!-- 右側主內容 - Start -->
      <main-container>
        <router-view />

        <template v-slot:footer>
          <app-footer />
        </template>
      </main-container>
      <!-- 右側主內容 - End -->
    </section>
    <!-- 主內容 - End -->
    <app-notification group="action" />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppMenu from '@/components/AppMenu.vue'
import MainContainer from '@/components/MainContainer.vue'
import { notify } from '@/mixins'

export default {
  components: {
    AppFooter,
    AppHeader,
    AppMenu,
    MainContainer
  },
  mixins: [notify],
  data() {
    return {
      menuList: [],
      user: {}
    }
  },
  // async mounted() {
  //   const loader = this.$loading.show()
  //   try {
  //     await Promise.all([this.getUser(), this.getMenu()])
  //   } catch (e) {
  //     this.notifyGetFail()
  //   } finally {
  //     loader.hide()
  //   }
  // },
  methods: {
    async getMenu() {
      const menu = this.$api.check(await this.$api.getMenu())

      if (menu) {
        this.menuList = menu
      }
    },
    async getUser() {
      const user = this.$api.check(await this.$api.getUserInfo())

      if (user) {
        this.user = user
      }
    }
  }
}
</script>

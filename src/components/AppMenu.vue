<template>
  <div class="nav-collapse">
    <div class="header_data">
      <h2>{{ user.copName }}</h2>
      <div class="header_box">
        <img src="@/assets/images/use.png" alt="" class="img-responsive" />
        <div class="header_right">
          <h3>{{ user.empName }}</h3>
          <h4>
            <a class="cursor-pointer" @click="handleLogout">登出</a>
          </h4>
        </div>
      </div>
    </div>

    <!-- 左側選單開始 -->
    <div id="div-menu">
      <ul ref="menu" class="sidebar-menu">
        <li
          v-for="menu in menuList"
          :id="menu.modelCode"
          :key="menu.modelCode"
          class="sub-menu"
          @click="onSubMenuClick"
        >
          <a>
            <i>
              <img :src="getMenuLogo(menu.modelImage)" class="img-responsive" />
            </i>
            <span>{{ menu.modelName }}</span>
            <span class="menu-arrow arrow_carrot-down arrow_carrot-right" />
            <i class="fa fa-caret-up" />
            <i class="fa fa-caret-down" />
          </a>
          <ul class="sub">
            <li
              v-for="(func, subIndex) in menu.functions"
              :key="subIndex"
              :class="{ active: func.url === menuRouteUrl }"
            >
              <a :href="func.url">{{ func.funcName }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 左側選單結束 -->
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      /**
       * Menu 列表
       * @type { MenuModel[] }
       * */
      menus: []
    }
  },
  computed: {
    /** 取得 route 名 */
    routeName() {
      const route = this.$route.name
      const bannerRoutes = ['banner', 'bannerCreate', 'bannerEdit']
      const openingRoutes = ['opening', 'openingCreate', 'openingEdit']

      if (bannerRoutes.includes(route)) {
        return 'banner'
      } else if (openingRoutes.includes(route)) {
        return 'opening'
      } else if (route === 'qrCode') {
        return 'qrcode'
      } else if (route === 'resume') {
        return 'resume'
      }
      return 'code'
    },
    menuRouteUrl() {
      return `/vue/recruit/${this.routeName}`
    }
  },
  mounted() {
    setTimeout(() => {
      $('#RECRUIT')
        .toggleClass('open')
        .find('.sub')
        .slideToggle()
    }, 1000)
  },
  methods: {
    /** 開啟或關閉 menu */
    toggle() {
      $(this.$refs.menu).slideToggle()
    },
    /** 選單點擊時，開啟或關閉子選單 */
    onSubMenuClick({ currentTarget }) {
      $(currentTarget)
        .toggleClass('open')
        .find('.sub')
        .slideToggle()

      $(currentTarget)
        .siblings()
        .removeClass('open')
        .find('.sub')
        .slideUp()
    },
    getMenuLogo(name) {
      try {
        return require(`../assets/images/${name}`)
      } catch {
        return require('../assets/images/menu_s_01@2x.png')
      }
    },
    /** 登出 */
    async handleLogout() {
      const loader = this.$loading.show()
      try {
        await this.$api.logout(this.user.copCode)
        loader.hide()
        window.location = '/erp/login'
      } catch {
        loader.hide()
        window.location = '/erp/login'
      }
    }
  }
}

/**********
 * 類型定義
 *********/

/**
 * Menu
 * @typedef {Object} MenuModel Menu 主項目
 * @property {string} copCode 關聯公司代碼
 * @property {string} modelCode 模組代碼
 * @property {string} modelName 模組名稱
 * @property {number | null} modelIdx 模組順序
 * @property {string} modelImage 模組圖檔
 * @property {MenuFunction[]} functions 功能清單
 */

/**
 * Menu 項目
 * @typedef {Object} MenuFunction Menu 子項目
 * @property {number | null} funcId 功能流水號
 * @property {string | null} funcName 功能名稱
 * @property {number | null} funcIdx 功能順序
 * @property {boolean} funcEntry 是功能入口
 * @property {string} url 功能連結
 * @property {string | null} frontType 前端類型 (Angular, Vue)
 */
</script>

<template>
  <div>
    <div class="title">
      <h3>{{ title }}</h3>
      <nav v-if="showBreadcrumb" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li
            v-for="(item, index) in breadcrumbs"
            :key="index"
            :class="{ active: index === breadcrumbs.length - 1 }"
            class="breadcrumb-item"
          >
            <template v-if="item.link">
              <router-link :to="item.link">
                {{ item.title }}
              </router-link>
            </template>
            <template v-else>
              {{ item.title }}
            </template>
          </li>
        </ol>
      </nav>
    </div>
    <hr />
  </div>
</template>

<script>
/**
 * Breadcrumb Item
 * @typedef {{ title: string, isActive: boolean | undefined, link: String | undefined }} BreadcrumbItem
 */

export default {
  name: 'PageHeader',
  props: {
    title: {
      required: true,
      type: String
    },
    /** @type {import('vue').PropOptions<BreadcrumbItem[]>} */
    breadcrumb: {
      type: Array,
      default: () => []
    },
    /** 顯示麵包屑 */
    showBreadcrumb: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          title: '招募系統'
        },
        ...this.breadcrumb
      ]
    }
  }
}
</script>

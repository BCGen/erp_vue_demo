<template>
  <button
    class="btn btn-blue btn-submit"
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    查詢
  </button>
</template>

<script>
export default {
  name: 'ButtonActionSearch',
  inheritAttrs: false
}
</script>

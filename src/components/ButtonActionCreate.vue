<template>
  <button class="btn btn-blue" type="button" v-bind="$attrs" v-on="$listeners">
    <i class="fa fa-plus" />
    <slot>
      新增
    </slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonActionCreate',
  inheritAttrs: false
}
</script>

<template>
  <button class="btn btn-blue" type="button" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false
}
</script>

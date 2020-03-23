<template>
  <div class="text-center">
    <router-link :to="backLink">
      <button class="btn btn-blue" type="button">
        回清單
      </button>
    </router-link>
    <button
      class="btn btn-blue btn-submit"
      type="button"
      @click="$emit('submit')"
    >
      確定送出
    </button>
  </div>
</template>

<script>
export default {
  name: 'FormSubmitBar',
  props: {
    backLink: {
      type: String,
      default: ''
    }
  }
}
</script>

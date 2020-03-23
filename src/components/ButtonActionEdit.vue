<template>
  <router-link :to="link">
    <div class="button_style">
      <img
        src="@/assets/images/button_01@2x.png"
        class="img-responsive"
        border="0"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ButtonActionEdit',
  props: {
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

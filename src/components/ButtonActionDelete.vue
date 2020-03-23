<template>
  <div class="button_style btn-remove" v-bind="$attrs" v-on="$listeners">
    <a data-toggle="modal" data-target="#modalDelete">
      <img src="@/assets/images/button_02@2x.png" class="img-responsive" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'ButtonActionDelete',
  inheritAttrs: false
}
</script>

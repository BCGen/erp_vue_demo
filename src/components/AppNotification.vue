<template>
  <notifications
    classes="app-notification"
    v-bind="$attrs"
    position="bottom right"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'AppNotification',
  inheritAttrs: false
}
</script>

<style lang="scss">
.app-notification {
  background: #1f1f1f;
  background: rgba(0, 0, 0, 0.9);
  padding: 15px;
  border-radius: 4px;
  color: #fff;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5);
  margin: 0 5px 5px;

  &.err {
    background: #fe1a00;
  }

  &.success {
    background: #5cb811;
  }
}
</style>

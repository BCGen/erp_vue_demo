<template>
  <Validation-provider v-slot="data" rules="required|min:5">
    {{ label }}
    <slot />
    <span style="color: red;">{{ data.errors[0] }}</span>
  </Validation-provider>
</template>
<script>
export default {
  name: 'ValidateInput',
  props:{
    label:{
   type:String,
   default:''
    }
    },
  data() {
    return {
      value: ''
    }
  }
}
</script>

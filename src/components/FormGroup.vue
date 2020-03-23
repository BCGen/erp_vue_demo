<template>
  <div class="form-group d-flex align-items-center">
    <label :class="getLabelClass" class="form-group__label p-0" :for="labelFor">
      {{ label }}
    </label>
    <div v-if="rules" :class="getInputClass">
      <validation-provider v-slot="data" :rules="rules">
        <slot v-bind="{ ...data }" />
        <span class="error_label">{{ data.errors[0] }}</span>
      </validation-provider>
    </div>

    <div v-else :class="getInputClass">
      <slot />
    </div>

    <slot name="suffix" :class="suffixClass" />
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelFor: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    },
    suffixClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    getInputClass() {
      return this.inputClass || 'col-8 col-sm-9 col-lg-8'
    },
    getLabelClass() {
      return this.labelClass || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group__label {
  font-size: 16px;
  color: #000;
  text-align: right;
  font-size: 16px;
  letter-spacing: 2.5px;
  width: 80px;
  margin-bottom: 0;
}

.form-group {
  min-height: 60px;
}

.error_label {
  font-size: 14px;
  color: red;
  position: absolute;
}
</style>

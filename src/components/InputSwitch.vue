<template>
  <div class="checkbox switcher m-0" style="position: relative; top: 8px;">
    <label :for="`inputSwitch${_uid}` || $attrs.id" class="pl-2 mb-0">
      <input
        :id="`inputSwitch${_uid}` || $attrs.id"
        v-bind="$attrs"
        :checked="isChecked"
        type="checkbox"
        @change="handleChange($event.target.checked)"
      />
      <span class="cursor-pointer mr-0"><small /></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputSwitch',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: null,
      default: true
    }
  },
  computed: {
    isChecked() {
      const attrTrue = this.$attrs['true-value']
      return this.checked == attrTrue
    }
  },
  methods: {
    handleChange(checked) {
      const attrTrue = this.$attrs['true-value']
      const attrFalse = this.$attrs['false-value']

      const trueValue = attrTrue === undefined ? true : attrTrue
      const falseValue = attrFalse === undefined ? false : attrFalse

      this.$emit('change', checked ? trueValue : falseValue)
    }
  }
}
</script>

<style lang="scss" scoped>
div.checkbox.switcher label input + span {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  width: 56px;
  height: 28px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid transparent;
  border-radius: 50px;
  ::before {
    content: 'OFF';
    font-size: 10px;
    position: absolute;
    top: 0;
    left: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.checkbox.switcher label input:checked + span {
  background: #4686ff;
  border-color: #4686ff;
  ::before {
    content: 'ON';
  }
}

.checkbox.switcher label input:checked + span small {
  left: 50%;
}

.checkbox.switcher label input + span small {
  position: absolute;
  display: block;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  left: 0;
}
</style>

<template>
  <ul>
    <li>
      <span :class="buttonClass" @click.prevent="onLastClick">
        {{ lastText }}
      </span>
    </li>
    <li v-for="pageNumber in pages" :key="pageNumber">
      <span
        :class="{ [buttonClass]: true, [activeClass]: pageNumber === value }"
        @click="$emit('input', pageNumber)"
      >
        {{ pageNumber }}
      </span>
    </li>
    <li>
      <span :class="buttonClass" @click.prevent="onNextClick">
        {{ nextText }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
    value: {
      type: Number,
      default: 1
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    buttonClass: {
      type: String,
      default: ''
    },
    lastText: {
      type: String,
      default: '«'
    },
    nextText: {
      type: String,
      default: '»'
    }
  },
  computed: {
    pages() {
      const pages = Math.ceil(this.total / this.size)
      return pages || 1
    }
  },
  methods: {
    onLastClick() {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
    onNextClick() {
      if (this.value < this.pages) {
        this.$emit('input', this.value + 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul li {
  display: inline;
}
</style>

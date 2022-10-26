<template>
  <span @click="onClick" style="display: block; margin: 0px -20px; padding: 0px 20px">{{ source.label }}</span>
</template>

<script>
export default {
  name: 'ElSelectItem',
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    onSelect: {
      type: Function
    }
  },
  methods: {
    onClick() {
      this.onSelect && this.onSelect(this.source)
    }
  }
}
</script>
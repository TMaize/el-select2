<template>
  <span @click="onClick" style="display: block; margin: 0px -20px; padding: 0px 20px" :class="{ selected: value === source[valueKey || 'value'] }">
    {{ source[labelKey || 'label'] }}
  </span>
</template>

<script>
export default {
  name: 'ElSelectItem',
  props: {
    value: [String, Number, Array],
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    labelKey: {
      type: String
    },
    valueKey: {
      type: String
    },
    onSelect: {
      type: Function
    }
  },
  methods: {
    onClick() {
      if (!this.onSelect) return
      this.onSelect(this.source[this.valueKey || 'value'])
    }
  }
}
</script>
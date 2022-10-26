<template>
  <el-select
    v-model="label"
    :filter-method="onFilter"
    ref="select"
    @visible-change="onVisibleChange"
    @blur="onBlur"
    @focus="onFocus"
    v-bind="inheritProps"
  >
    <template slot="empty">
      <virtual-list
        ref="list"
        style="height: 238px; overflow-y: auto"
        data-key="id"
        :data-sources="list"
        :data-component="itemComponent"
        :estimate-size="34"
        wrap-tag="ul"
        item-tag="li"
        wrap-class="el-select-dropdown__list"
        item-class="el-select-dropdown__item"
        :extra-props="{ onSelect, value }"
      />
    </template>
  </el-select>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import ElSelect2Item from './ElSelect2Item.vue'

export default {
  props: ['value', 'options', 'idKey', 'valueKey', 'labelKey'],
  components: { 'virtual-list': VirtualList },
  data() {
    return {
      itemComponent: ElSelect2Item
    }
  },
  computed: {
    inheritProps() {
      const attr = this.$attrs
      const props = {}
      const keys = ['size', 'clearable', 'filterable', 'disabled', 'name', 'autocomplete', 'placeholder']
      keys.forEach(key => {
        const value = this.$attrs[key]
        if (typeof value !== 'undefined') {
          props[key] = value
        }
      })
      return props
    },
    list() {
      const attr = this.$attrs // push 不触发computed重新计算，保证每次更新都触发计算 // TODO 优化
      const idKey = this.idKey
      const valueKey = this.valueKey || 'value'
      const labelKey = this.labelKey || 'label'

      if (Array.isArray(this.options)) {
        return this.options.map((item, idx) => {
          const id = idKey ? item[idKey] : idx
          return { id, label: item[labelKey], value: item[valueKey] }
        })
      }
      return []
    },
    label: {
      get() {
        const option = this.list.find(item => item.value === this.value)
        if (option) return option.label
        return this.value || ''
      },
      set(v) {
        this.$emit('input', '')
        this.$emit('change', '')
        this.$emit('clear', '')
      }
    }
  },
  methods: {
    onSelect(item) {
      this.$emit('input', item.value)
      this.$emit('change', item.value)
      this.$refs.select.blur()
    },
    onVisibleChange(val) {
      this.$emit('visible-change', val)
      if (!val) return

      const idx = this.list.findIndex(item => {
        return item.value === this.value
      })

      this.$nextTick(() => {
        this.$refs.list.reset()
        this.$refs.list.scrollToIndex(idx - 3 < 0 ? 0 : idx - 3) // 一页一共7个，停留在中间
      })
    },
    onBlur(e) {
      this.$emit('blur', e)
    },
    onFocus(e) {
      this.$emit('focus', e)
    },
    onFilter() {
      // TODO
    }
  }
}
</script>

<style>
</style>
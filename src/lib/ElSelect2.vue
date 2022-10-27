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
        v-if="list.length > 0"
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
      <slot name="empty" v-else-if="$slots.empty" />
      <p v-else-if="keyword" class="el-select-dropdown__empty">{{ noDataText || '无匹配数据' }}</p>
      <p v-else class="el-select-dropdown__empty">{{ noDataText || '无数据' }}</p>
    </template>
  </el-select>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import ElSelect2Item from './ElSelect2Item.vue'

export default {
  inheritAttrs: false,
  props: ['value', 'options', 'idKey', 'valueKey', 'labelKey', 'noDataText', 'noMatchText'],
  components: { 'virtual-list': VirtualList },
  data() {
    return {
      keyword: '',
      itemComponent: ElSelect2Item
    }
  },
  computed: {
    inheritProps() {
      const attr = this.$attrs
      const props = {}
      const keys = ['size', 'clearable', 'filterable', 'disabled', 'name', 'autocomplete', 'placeholder', 'popper-append-to-body', 'popperAppendToBody']
      keys.forEach(key => {
        const value = this.$attrs[key]
        if (typeof value !== 'undefined') {
          props[key] = value
        }
      })
      return props
    },
    lowerCaseKeyword() {
      return (this.keyword || '').toLowerCase()
    },
    list() {
      const attr = this.$attrs // push 不触发computed重新计算，保证每次更新都触发计算 // TODO 优化
      const idKey = this.idKey
      const valueKey = this.valueKey || 'value'
      const labelKey = this.labelKey || 'label'
      const keyword = this.lowerCaseKeyword

      if (!Array.isArray(this.options)) return []

      const list = []
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i]
        const item = { id: idKey ? option[idKey] : i, label: option[labelKey], value: option[valueKey] }
        if (!keyword) {
          list.push(item)
          continue
        }
        if (String(item.label).toLowerCase().indexOf(keyword) !== -1) {
          list.push(item)
        }
      }
      return list
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

      if (val) {
        this.$nextTick(() => {
          this.keyword = ''
        })
      } else {
        // fix: 有搜索值的情况下，失焦时会闪烁一下
        setTimeout(() => {
          this.keyword = ''
        }, 100)
      }

      if (!val) return
      const idx = this.list.findIndex(item => {
        return item.value === this.value
      })

      if (this.$refs.list) {
        this.$nextTick(() => {
          const $list = this.$refs.list
          $list && $list.reset()
          $list && $list.scrollToIndex(idx - 3 < 0 ? 0 : idx - 3) // 一页一共7个，停留在中间
        })
      }
    },
    onBlur(e) {
      this.$emit('blur', e)
    },
    onFocus(e) {
      this.$emit('focus', e)
    },
    onFilter(kw) {
      this.keyword = kw || ''
    }
  }
}
</script>

<style>
</style>
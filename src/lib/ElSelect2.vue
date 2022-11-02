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
        style="max-height: 238px; overflow-y: auto; overflow-y: overlay"
        class="el-select2-scroll"
        :data-key="idKey || valueKey || 'id'"
        :data-sources="list"
        :data-component="itemComponent"
        :estimate-size="34"
        wrap-tag="ul"
        item-tag="li"
        wrap-class="el-select-dropdown__list"
        item-class="el-select-dropdown__item"
        :extra-props="{ onSelect, value, labelKey, valueKey }"
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
      styleInjected: false,
      keyword: '',
      itemComponent: ElSelect2Item
    }
  },
  computed: {
    inheritProps() {
      const attr = this.$attrs
      const props = {}
      const keys = [
        'size',
        'clearable',
        'filterable',
        'disabled',
        'name',
        'autocomplete',
        'placeholder',
        'popper-append-to-body',
        'popperAppendToBody',
        'automatic-dropdown',
        'automaticDropdown'
      ]
      keys.forEach(key => {
        const value = this.$attrs[key]
        if (typeof value !== 'undefined') {
          props[key] = value
        }
      })
      return props
    },
    list() {
      const keyword = (this.keyword || '').toLowerCase()

      if (!Array.isArray(this.options)) return []

      const valueKey = this.valueKey || 'value'
      const labelKey = this.labelKey || 'label'

      if (keyword) {
        // 不要重新生成 item 否则性能很差
        // console.time('list')
        const list = this.options.filter(item => {
          const label = item[labelKey].toLowerCase()
          return label.includes(keyword)
        })
        // console.timeEnd('list')
        return list
      }

      return this.options
    },
    label: {
      get() {
        const valueKey = this.valueKey || 'value'
        const labelKey = this.labelKey || 'label'
        const option = this.options.find(item => item[valueKey] === this.value)
        if (option) return option[labelKey]
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
    injectStyle() {
      if (this.styleInjected) return
      this.styleInjected = true
      if (document.querySelector('#el-select2-style')) return
      console.log('injectStyle')
      const style = `
        .el-select2-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background-color: transparent;
        }
        .el-select2-scroll::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(144,147,153,.3);
        }
        .el-select2-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(144,147,153,.5);
        }
        .el-select2-scroll .selected {
          color: #409EFF;
          font-weight: 700;
        }
        `
      const styleNode = document.createElement('style')
      styleNode.id = 'el-select2-style'
      styleNode.appendChild(document.createTextNode(style))
      document.head.appendChild(styleNode)
    },
    onSelect(value) {
      this.$emit('input', value)
      this.$emit('change', value)
      this.blur()
    },
    onVisibleChange(val) {
      this.$emit('visible-change', val)

      if (!val) {
        // fix: 有搜索值的情况下，失焦时会闪烁一下
        setTimeout(() => {
          this.keyword = ''
        }, 100)
        return
      }

      this.$nextTick(() => {
        this.keyword = ''

        this.injectStyle()
      })

      const valueKey = this.valueKey || 'value'
      const idx = this.options.findIndex(item => {
        return item[valueKey] === this.value
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
    },
    focus() {
      this.$refs.select.focus()
    },
    blur() {
      this.$refs.select.blur()
    }
  }
}
</script>

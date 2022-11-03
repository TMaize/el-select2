# el-select2

support big amount data list

[el-select](https://element.eleme.cn/#/zh-CN/component/select) 增强，大数据不再卡顿

## Install

```
yarn add el-select2
```

```js
import ElSelect2 from 'el-select2'
```

```vue
<el-select2 v-model="value" :options="options" labelKey="b" valueKey="a" clearable :filterable="filterable" :disabled="disabled" />
```

## Select Attributes

- options 列表数据
- idKey 列表数据 id，默认取 valueKey
- valueKey 列表数据 valueKey
- labelKey 列表数据 labelKey
- value
- noDataText
- noMatchText
- size
- clearable
- filterable
- disabled
- name
- autocomplete
- placeholder
- popper-append-to-body
- popperAppendToBody
- automatic-dropdown
- automaticDropdown

## Select Events

同 el-select

- input
- change
- clear
- visible-change
- blur
- focus

## Select Slots

- empty

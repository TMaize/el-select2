<template>
  <div>
    <el-form inline :size="size" label-width="100px">
      <el-form-item label="尺寸">
        <el-select v-model="size">
          <el-option value="small" label="small" />
          <el-option value="medium" label="medium" />
          <el-option value="default" label="default" />
        </el-select>
      </el-form-item>
      <el-form-item label="禁用">
        <el-select v-model="disabled">
          <el-option :value="true" label="true" />
          <el-option :value="false" label="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="可筛选">
        <el-select v-model="filterable">
          <el-option :value="true" label="是" />
          <el-option :value="false" label="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作">
        <el-button @click="handAction('emptyValue')">清空值</el-button>
        <el-button @click="handAction('emptyData')">清空数据</el-button>
        <el-button @click="handAction('resetData')">重置数据</el-button>
        <el-button @click="handAction('unshiftData')">前追加数据</el-button>
        <el-button @click="handAction('pushData')">后追加数据</el-button>
      </el-form-item>
    </el-form>
    <el-form inline :size="size" label-width="100px">
      <!-- <el-form-item label="el-select">
        <el-select v-model="value" clearable :filterable="filterable" :disabled="disabled">
          <el-option v-for="item in options" :key="item.a" :value="item.a" :label="item.b"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="el-select2">
        <el-select2
          v-model="value"
          :options="options"
          labelKey="b"
          valueKey="a"
          clearable
          :filterable="filterable"
          :disabled="disabled"
          @change="onChange2"
          ref="select2"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ElSelect2 from './lib/ElSelect2.vue'

export default {
  components: { ElSelect2 },
  data() {
    return {
      value: 101,
      size: 'medium',
      disabled: false,
      filterable: false,
      options: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const options = []
      for (let i = 1; i <= 5000; i++) {
        if (i % 5 == 0) {
          options.push({ a: i, b: '王五' + i })
        } else if (i % 5 == 4) {
          options.push({ a: i, b: '李四' + i })
        } else if (i % 5 == 3) {
          options.push({ a: i, b: '张三' + i })
        } else {
          options.push({ a: i, b: '小明' + i })
        }
      }
      this.options = options
    },
    handAction(action) {
      const n = Date.now()

      switch (action) {
        case 'emptyValue':
          this.value = ''
          break
        case 'emptyData':
          this.options = []
          break
        case 'resetData':
          this.initData()
          break
        case 'unshiftData':
          this.options.unshift({ a: n, b: '追加 🧧' + n })
          this.value = n
          break
        case 'pushData':
          this.options.push({ a: n, b: '追加 🧧' + n })
          this.value = n
          break
        default:
          break
      }
    },
    onChange2(v) {
      console.log('onChange2', JSON.stringify(v))
    }
  },
  mounted() {
    // TODO need fix
    // automatic-dropdown 开启，聚焦展开后，通过点击外部区域失去焦点，再次点击Select展开时会闪烁
    // setTimeout(() => {
    //   this.$refs.select2.focus()
    // }, 1000)
  }
}
</script>

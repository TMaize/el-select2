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
        <el-button @click="value = ''">清空</el-button>
        <el-button @click="addItem">追加数据</el-button>
      </el-form-item>
    </el-form>
    <el-form inline :size="size" label-width="100px">
      <el-form-item label="el-select">
        <el-select v-model="value" clearable :filterable="filterable" :disabled="disabled">
          <el-option v-for="item in options" :key="item.a" :value="item.a" :label="item.b"></el-option>
        </el-select>
      </el-form-item>
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
          automatic-dropdown
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
    const options = []
    for (let i = 1; i <= 1000; i++) {
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
  methods: {
    addItem() {
      const n = Date.now()
      this.options.unshift({ a: n, b: '追加' + n })
      this.value = n
    },
    onChange2(v) {
      console.log('onChange2', JSON.stringify(v))
    }
  },
  mounted() {
    // TODO fix
    // setTimeout(() => {
    //   this.$refs.select2.focus()
    // }, 1000)
  }
}
</script>

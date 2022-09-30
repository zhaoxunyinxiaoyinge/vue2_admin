<template>
  <div class="form">
    <el-form :inline="true" :model="form" v-if="config.length>0">
      <el-form-item label="用户名称" v-for="(item,index) in config" :key="index"> 
        <el-input v-model="form[item.prop]" clearable></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    config:{
      type:Array,
      default:()=>{
        return []
      }
  },
  },
  data() {
    return {
      form: {
      },
    };
  },
  methods: {
    handleSearch(){
      this.$emit("search",this.form);
    }
  },
}
</script>

<style lang="scss" scoped>
$padding: 20px;
.form {
  padding: $padding;
}
</style>

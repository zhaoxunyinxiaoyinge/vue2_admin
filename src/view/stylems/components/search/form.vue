<template>
  <div class="form">
    <el-form :inline="true">
      <el-form-item label="用户名称">
        <el-input v-model="form.role_name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-button type="primary">搜索</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        role_name: "",
        password: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$padding: 20px;
.form {
  padding: $padding;
}
</style>

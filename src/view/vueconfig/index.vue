<template>
  <div class="box">
    <el-link type="primary">
      设置事件的自定义触发键盘码
    </el-link>
    <div class="form">
      <el-row>
        <el-form inline="true">
          <el-form-item label="事件触发编码">
            <el-input v-model="keycode" @keyup.f2.native="keyEmit" />
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keycode:123
    };
  },
  methods: {
    keyEmit() {
      this.keycode="已经执行了"
    },
  },
};
</script>

<style scoped lang="scss">
$form:20px;
$boxPadding:20px;
.box {
    padding: $boxPadding;
}
.form {
    margin-top: $form;
}
</style>

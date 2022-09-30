<template>
  <div class="back">
    <el-backtop
      target=".el-main"
      :bottom="100"
      :visibility-height="300"
      :right="60"
      >
      <span class="el-icon-caret-top icon"></span>
      <span class="back-txt">返回顶部</span>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "backTo",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
  @import "~@/assets/scss/backTo.scss";
  .back-txt {
    font-size: $hrefTextSize;
    color:$hrefTextColor;
    &:hover {
      color:$hrefTextColorHover;
    }
  }

</style>


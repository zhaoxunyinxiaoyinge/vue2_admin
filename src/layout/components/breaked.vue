<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumb"
        :key="index"
        :to="{ path: '/' }"
        >{{ item.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "break",
  data() {
    return {
      breadCrumb: [],
    };
  },
  watch: {
    $route: {
      handler: function(val) {
        this.breadCrumb = val.matched.map((item) => {
          return { path: item.path, title: item.meta.title };
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.bread-crumb {
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 10px;
}
</style>

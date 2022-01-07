<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="'/'" >面板</el-breadcrumb-item
      >
      <template  v-for="(item, index) in breadCrumb">
        <el-breadcrumb-item
          v-if="item.title&&item.path!=='/danbord'"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.title }}</el-breadcrumb-item
        >
          </template>
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
  width:100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  font-weight: bolder;
}
</style>

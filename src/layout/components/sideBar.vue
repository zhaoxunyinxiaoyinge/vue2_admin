<template>
  <div v-if="!datas.meta.hidden" class="sideBar">
    <template
      v-if="
        hasOnyChilds(datas.children, datas) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <el-menu-item
        class="menu-item"
        :index="resovlePath(baseRoutePath, onlyOneChild.path)"
      >
        <el-tooltip
          :disabled="!isCollapse"
          :content="datas.meta.title"
          placement="right"
        >
          <Item :title="datas.meta.title" :icon="datas.meta.icon" />
        </el-tooltip>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resovlePath(datas.path)" popper-append-to-body>
      <template slot="title">
        <Item class="item" :title="datas.meta.title" :icon="datas.meta.icon" />
      </template>

      <side-bar
        v-for="(item, index) in datas.children"
        :datas="item"
        :key="index"
        :baseRoutePath="resovlePath(item.path)"
      ></side-bar>
    </el-submenu>
  </div>
</template>
<script>
import Item from "./item.vue";

import path from "path";
export default {
  name: "SideBar",
  data() {
    return {
      onlyOneChild: "",
    };
  },
  components: { Item },
  inject: ["isCollapse"],

  props: {
    datas: {
      type: Object,
      default() {
        return {};
      },
    },
    baseRoutePath: {
      type: String,
      default() {
        return "";
      },
    },
  },

  methods: {
    hasOnyChilds(children = [], parent) {
      const onlyChild = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyChild = item;
          return true;
        }
      });

      if (onlyChild.length == 1) {
        return true;
      }

      if (onlyChild.length == 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resovlePath(val) {
      return path.resolve(this.baseRoutePath, val);
    },
  },
};
</script>

<style scoped lang="scss">
.menu-item {
  width: 100%;
  padding: 0px 10px;
}

.sideBar {
  width: 100%;
  background-color: #39634d;
  &:hover .item {
    color: #000;
  }
}

.el-submenu {
  background-color: #39634d;
  width: 100%;
}

.item {
  width: 100%;
}
</style>

<style>
.el-menu--collapse .sideBar .el-submenu {
  overflow: hidden;
}

.el-menu--collapse .sideBar .item span.title {
  visibility: hidden;
}

.el-menu--collapse .sideBar .is-active .item .icon {
  color: #000;
}

.el-menu--collapse
  .sideBar
  .el-submenu
  .el-submenu__title
  .el-icon-arrow-right {
  display: none;
}
.el-menu--collapse .el-submenu .item span.title {
  visibility: hidden;
}
</style>

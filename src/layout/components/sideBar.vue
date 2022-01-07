<template>
  <div v-if="child.meta && !child.meta.hidden" class="sideBar">
    <template
      v-if="
        hasOnyChild(child.children, child) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <el-menu-item class="menu-item" :index="resovlePath(onlyOneChild.path)">
        <template slot="title">
          <Item
            :title="onlyOneChild.meta.title"
            :icon="onlyOneChild.meta.icon"
          />
        </template>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="resovlePath(child.path)" >
      <template slot="title">
        <Item
          v-if="child.meta"
          class="item"
          :title="child.meta.title"
          :icon="child.meta.icon"
        />
      </template>

      <side-bar
        v-for="item in child.children"
        :child="item"
        :key="item.path"
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
      onlyOneChild: {},
    };
  },

  components: { Item },
  props: {
    child: {
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
    hasOnyChild(children = [], parent) {
      let onlyChild = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
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
  background-color: #4b0b0bef;
  &:hover .item {
    color: #4e1818;
  }
}

.el-submenu {
  background-color: #4b0b0bef;
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

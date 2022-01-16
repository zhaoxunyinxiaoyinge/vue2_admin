<template>
  <div class="sideBar">
    <template
      v-if="
        hasOnyChild(child.children, child) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <Links v-if="onlyOneChild.meta" :to="resovlePath(onlyOneChild.path)">
        <el-menu-item class="menu-item" :index="resovlePath(onlyOneChild.path)">
          <Item
            :icon="
              onlyOneChild.meta.icon ||
                (onlyOneChild.meta && onlyOneChild.meta.icon)
            "
            :title="onlyOneChild.meta.title"
          ></Item>
        </el-menu-item>
      </Links>
    </template>

    <el-submenu v-else :index="resovlePath(child.path)" popper-append-to-body>
      <template slot="title">
        <item
          v-if="child.meta"
          class="item"
          :title="child.meta.title"
          :icon="child.meta.icon"
        ></item>
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
import Links from "./link.vue";
import SideBar from "./sideBar.vue";

export default {
  name: "SideBar",
  data() {
    return {
      onlyOneChild: {},
    };
  },

  components: { Item, SideBar, Links },
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
    // color: #4e1818;
  }


  
}

.el-submenu {
  background-color: #4b0b0bef;
  width: 100%;
}

a.router-link-exact-active {
  text-decoration: none;
}

.item {
  width: 100%;
}
</style>

<style lang="scss">

.el-menu {
  background:none;
}

.el-menu--collapse .sideBar .el-submenu {
  overflow: hidden;
}

.el-menu--collapse .sideBar .item span.title {
  visibility: hidden;
}

.el-menu--collapse .sideBar .is-active .item .icon {
  /* color: #000; */
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

.el-submenu__title:hover,
.el-submenu__title:focus,
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: hsl(0, 90%, 12%) !important
}
</style>

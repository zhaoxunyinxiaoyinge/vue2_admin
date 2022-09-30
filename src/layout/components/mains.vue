<template>
  <el-menu
    width="initial"
    :class="getDeviceType()"
    class="menu"
    text-color="#fff"
    :active-text-color="Style.activeColor"
    :unique-opened="true"
    :collapse="openSidebar"
    :collapse-transition="false"
    :router="true"
    :default-active="activeRoute"
    mode="vertical"
  >
    <!-- 设置管理系统的导航栏 -->
    <div class="title" v-if="device == 'desktop'">
      <el-image :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'" fit="contain" style="height:40px;"></el-image>
      <span class="name" style="margin-left:20px;" v-if="!openSidebar">博客在线</span>
    </div>

    <side-bar
      :child="item"
      v-for="(item, index) in menus"
      :key="item.id"
      :baseRoutePath="item.path"
    ></side-bar>
  </el-menu>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Cookies from "js-cookie";
import Style from "./../../assets/scss/index.scss";

import SideBar from "./sideBar.vue";

export default {
  name: "mains",
  components: { SideBar },

  data() {
    return {
      menuList: [],
      activeRoute: "/",
      Style,
      src: require("./../../assets/1.jpg"),
    };
  },

  mounted() {},

  computed: {
    ...mapState("app", [
      "openSidebar",
      "device",
      "defaultOpen",
      "avatar",
      "btncolor",
    ]),
    ...mapState("perssion", ["menus"]),
  },

  methods: {
    ...mapMutations("app", ["SET_SIDEBAR", "SET_DEFAULT_OPEN"]),

    getDeviceType() {
      if (!this.openSidebar) {
        return "not-collapse-width";
      }
      if (this.device == "mobile" && this.openSidebar) {
        return "none-width";
      }
      if (this.openSidebar && this.device == "desktop") {
        return "collapse-width";
      }

      return "not-collapse-width";
    },

    handleClose() {
      if (this.openSidebar) {
        Cookies.set("openSidebar", false);
        this.SET_SIDEBAR(false);
      } else {
        Cookies.set("openSidebar", true);
        this.SET_SIDEBAR(true);
      }
    },
  },

  watch: {
    $route: {
      deep: true,
      handler: function(val, old) {
        this.activeRoute = val.fullPath;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~./../../assets/scss/index.scss";
.menu {
  width: 100%;
  border-right: 0;
}

.collapse-width {
  width: 64px;
  &:not(.el-menu--collapse) {
    width: 180px;
  }
}

.not-collapse-width {
  width: 220px;
}

.none-width {
  width: 0;
  overflow: hidden;
}

.title {
  color: #fff;
  height: 60px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding-left: 30px;
}
</style>

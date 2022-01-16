<template>
  <el-menu
    :class="getDeviceType()"
    class="menu"
    text-color="#fff"
    :active-text-color="Style.activeColor"
    :unique-opened="true"
    :collapse="openSidebar"
    :collapse-transition="openSidebar && device == 'mobile' ? true : false"
    :router="true"
    :default-active="activeRoute"
  >
    <!-- 设置管理系统的导航栏 -->
    <div class="title" v-if="device == 'desktop'">
      <el-image :src="src" style="height:40px"></el-image>
      <span class="name">五福临门</span>
    </div>

    <side-bar
      :child="item"
      v-for="(item, index) in routes"
      :key="index"
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
      src:'https://demosc.chinaz.net/Files/pic/iconsico/8321/f5.ico',
    };
  },

  mounted() {
    this.menuList = this.routes;
  },

  computed: {
    ...mapState("app", ["openSidebar", "device", "defaultOpen",'avatar','btncolor']),
    ...mapState("perssion", ["routes"]),
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
}

.not-collapse-width {
  width: 200px;
}

.none-width {
  width: 0;
  overflow: hidden;
}

.title {
  color:#fff;
  height: 60px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

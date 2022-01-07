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
    <side-bar
      :child="item"
      v-for="(item,index) in routes"
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
    };
  },

  mounted() {
    console.log("执行了")
      this.menuList = this.routes;
      console.log(this.menuList);
      console.log(this.routes)
  },

  computed: {
    ...mapState("app", ["openSidebar", "device", "defaultOpen"]),
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
    "route": {
      deep: true,
      handler: function(val, old) {
        if (val) {
          let arr = val.matched.map((item) => ({
            path: item.path,
            meta: item.meta,
          }));

          if (Object.keys(arr[0].meta).length > 0) {
            this.activeRoute = arr[1].path;
          } else {
            this.activeRoute = arr[0].path ? arr[0].path : "/";
          }
        }
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
  color: #fff;
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
</style>

<template>
  <el-container class="el-fulled">
    <!--移动场景下蒙版图 -->
    <div
      v-if="device === 'mobile' && openSidebar == false"
      @click="toggelSideBar"
      class="mobile-bg"
    />

    <up-down></up-down>

    <el-aside class="aside">
      <el-scrollbar style="height: 100%">
        <Mains ref="main" />
      </el-scrollbar>
    </el-aside>

    <el-main>
      <div class="nav-box">
        <!-- <Top/> -->
        <div  class="nav" :style="{background:Style.bg}">
          <div class="collapse hamburger-container" id="hamburger-container" @click="oncollapse">
            <span class="el-icon-s-fold"></span>
          </div>
            <BreadCrumb id="breacrubm-container"  class="breacrubm-container" :data="breadCrumb" v-if="device =='deskTop'" />
          <Header/>
        </div>
         <route-tag />
      </div>
      <div class="content">
        <!-- <el-scrollbar> -->
          <transition mode="out-in">
            <keep-alive>
              <!-- 阻止动态路由加载时复用，created和mount无法使用 -->
             <router-view :key="$route.path"></router-view>
            </keep-alive>

          </transition>
        <!-- </el-scrollbar> -->
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Cookies from "js-cookie";

import RouteTag from "./components/routeTag.vue";
import BreadCrumb from "./components/breaked.vue";
import UpDown from "./components/backTo.vue";
import Mains from "./components/mains.vue";
import Header from "./components/header.vue"
import Top from "./components/navBar.vue"
import Style from "./../assets/scss/index.scss";
import resizeHandle from "./mixins/resizeHandler"

export default {
  components: { Mains,  RouteTag, BreadCrumb, UpDown,Header,Top},

  data() {
    return {
      menuList: [],
      breadCrumb: [],
         Style,
    };
  },

  mixins:[resizeHandle],

  mounted() {
    this.menuList = this.routes;

  },

  computed: {
    ...mapState("perssion", ["routes"]),
    ...mapState("app", ["device", "openSidebar"]),
  },
  methods: {
    ...mapMutations("app", ["ADD_ROUTE_TAG", "SET_SIDEBAR"]),
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    oncollapse() {
      this.$refs.main.handleClose();
    },

    toggelSideBar() {
      Cookies.set("openSidebar", true);
      this.SET_SIDEBAR(true);
    },

  },
  watch: {
    $route: {
      handler: function(val, old) {
        this["ADD_ROUTE_TAG"]({ title: val.meta.title, path: val.fullPath,icon:val.meta.icon });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~./../assets/scss/index.scss";
.el-fulled {
  height: 100%;
  display: flex;
}

.mobile-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.1;
  z-index: 10;

}

.aside {
  width: auto !important;
}

.aside /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-aside {
  background-color: $sidebar;
  height: 100%;
}

.nav-box {
  display: flex;
  flex-direction: column;
  position:relative;
  top:0;
  left:0;
  z-index: 30;
}

.el-main {
  background-color:transparent(0.3);
  height: 100%;
  flex: 1;
  padding: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  height: 60px;
  background-color: hsla(80, 52%, 28%, 0.055);
  align-items: center;
  color:#000;
}

.collapse {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #000;
  letter-spacing: 2px;
  margin:0 10px;
  cursor: pointer;
}

.content {
  // flex: 1;
  display: flex;
  flex-direction: column;
}

.back {
  position: fixed;
  right:30px;
  bottom:100px;
  z-index: 40;
}
</style>

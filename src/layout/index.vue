<template>
  <el-container class="el-fulled">
    <!-- 头部导航栏 -->
    <Header />

    <!--移动场景下蒙版图 -->
    <div
      v-if="device === 'mobile' && openSidebar == false"
      @click="toggelSideBar"
      class="mobile-bg"
    />

    <back-to></back-to>

    <el-aside class="aside">
      <el-scrollbar style="height: 100%">
        <Mains ref="main" />
      </el-scrollbar>
    </el-aside>

    <el-main>
      <div style="display:flex;align-items:center">
        <div class="collapse" @click="oncollapse">
          <span class="el-icon-s-fold"></span>
        </div>
        <BreadCrumb :data="breadCrumb" />
      </div>

      <route-tag />

      <div class="content">
        <el-scrollbar style="height: 100%">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </el-scrollbar>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Cookies from "js-cookie";

import Header from "./components/header.vue";
import RouteTag from "./components/routeTag.vue";
import BreadCrumb from "./components/breaked.vue";
import BackTo from "./components/backTo.vue";
import Mains from "./components/mains.vue"

export default {
  components: { Mains, Header, RouteTag, BreadCrumb, BackTo },

  data() {
    return {
      menuList: [],
      // datapath: "",
      // baseRoutePath: "/",
      breadCrumb: [],
    };
  },

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
        this["ADD_ROUTE_TAG"]({ title: val.meta.title, path: val.fullPath });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/index.scss";
.el-fulled {
  height: 100%;
  display: flex;
  padding-top: 60px;
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

.el-main {
  background-color: #fff;
  height: 100%;
  flex: 1;
  padding: 0;
  text-align: left;
  // padding: 0 5px;
  // /deep/ .el-scrollbar__wrap {
  //   overflow-x: hidden;
  // }
  display: flex;
  flex-direction: column;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.back {
  // position: fixed;
  // right:30px;
  // bottom:100px;
  // z-index: 40;
}
</style>

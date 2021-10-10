<template>
  <el-container class="el-fulled">
    <Header />
    <el-container class="el-content">
      <el-aside class="aside">
        <el-scrollbar style="height: 100%">
          <div class="collapse" @click="oncollapse">
            <span class="el-icon-s-fold"></span>
          </div>

          <Mains ref="main">
            <SideBar
              :datas="item"
              v-for="(item, index) in menuList"
              :key="index"
              :baseRoutePath="item.path"
            ></SideBar>
          </Mains>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <BreadCrumb :data="breadCrumb" />
        <route-tag />

        <div class="content">
          <el-scrollbar style="height: 100%">
            <back-to></back-to>
            <transition mode="out-in">
              <router-view></router-view>
            </transition>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Mains from "./components/mains.vue";
import SideBar from "./components/sideBar.vue";
import Header from "./components/header.vue";
import RouteTag from "./components/routeTag.vue";
import BreadCrumb from "./components/breaked.vue";
import BackTo from "./components/backTo.vue";

export default {
  components: { Mains, SideBar, Header, RouteTag, BreadCrumb, BackTo },
  created() {
    this.$nextTick(() => {
      console.log(this.routes, 4444);
    });
  },
  data() {
    return {
      menuList: [],
      datapath: "",
      baseRoutePath: "/",
      breadCrumb: [],
    };
  },

  mounted() {
    this.menuList = this.routes;
  },

  computed: {
    ...mapState("perssion", ["routes"]),
  },
  methods: {
    ...mapMutations("app", ["ADD_ROUTE_TAG"]),
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    oncollapse() {
      this.$refs.main.handleClose();
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
<style lang="less" scoped>
.el-fulled {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.aside {
  width: auto !important;
}

.aside /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-aside {
  background-color: #2b6447;
  height: 100%;
  .collapse {
    height: 30px;
    background-color: #0f0808;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 2px;
  }
}
.el-main {
  background-color: #eee;
  height: 100%;
  flex: 1;
  padding: 0;
  text-align: left;
  padding: 0 5px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  display: flex;
  flex-direction: column;
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

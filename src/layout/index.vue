<template>
  <el-container class="el-fulled">
    <Header />
    <el-container class="el-content">
      <el-aside :width="collapse ? '50px' : '200px'">
        <div class="collapse" @click="oncollapse">|||</div>
        <side-bar />
      </el-aside>
      <el-main>
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sideBar from "@/layout/components/sideItem.vue";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: { sideBar },
  created() {
    // this.getMenu();
    this.$nextTick(() => {
      // let res = window.sessionStorage.getItem("datapath");
      // this.datapath = res;
    });
  },
  data() {
    return {
      menuList: [],
      collapse: false,
      datapath: "",
    };
  },

  mounted() {

  },

  computed: {
    ...mapState("perssion", ["name"]),
  },
  methods: {
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    oncollapse() {
      this.collapse = !this.collapse;
    },
    getpath(res) {},
  },
};
</script>
<style lang="less" scoped>
.el-fulled {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-header {
  background: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 20px;
  div.title {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    h1 {
      font-size: 18px;
      font-weight: normal;
    }
  }
}
.el-content {
  flex: 1;
  display: flex;
}
.el-aside {
  background-color: #222;
  height: 100%;
  .collapse {
    height: 30px;
    background-color: #ccc;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 2px;
  }
  .el-menu {
    background: #222;
    // color:#fff;
    border-right: 0;
    .el-submenu {
      span {
        // color:#fff;
      }
      i.iconfont {
        margin-right: 20px;
        color: #fff;
      }
      .el-menu-item {
        background: #333;
        span {
          // color:#ccc;
        }
      }
    }
  }
}
.el-main {
  background-color: #f8f8f8;
  height: 100%;
  flex: 1;
}
</style>

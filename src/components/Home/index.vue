<template>
  <el-container class="el-fulled">
    <el-header>
      <div class="title">
        <img src="./../../assets/1.jpg" alt="" />
        <h1>vue开发管理系统</h1>
      </div>
      <el-button type="danger" @click="logOut">退出</el-button>
    </el-header>
    <el-container class="el-content">
      <el-aside :width="collapse ? '50px' : '200px'">
        <!-- 导航菜单 -->
        <!-- 折叠按钮 -->
        <div class="collapse" @click="oncollapse">|||</div>
        <el-menu
          text-color="#fff"
          active-text-color="#f21fff"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
          :default-active="datapath"
        >
          <el-submenu
            class="goos"
            :index="'/' + item.path"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title"
              ><i :class="iconData[item.id]"></i
              ><span>{{ item.authName }}</span></template
            >
            <el-menu-item
              style="padding-left:70px"
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              ><i class="el-icon-message"></i
              ><span @click="getpath(subItem.path)">{{
                subItem.authName
              }}</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getMenus } from "API/serve.js";
export default {
  created() {
    this.getMenu();
    this.$nextTick(() => {
      let res = window.sessionStorage.getItem("datapath");
      this.datapath = res;
    });
  },
  data() {
    return {
      menuList: [],
      iconData: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-bao",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiaobiaoweiguanli",
      },
      collapse: false,
      datapath: "",
    };
  },
  methods: {
    async getMenu() {
      let res = await getMenus();
      console.log(res.data);
      if (res.data.meta.status == 200) {
        this.menuList = res.data.data;
        this.$Message({
          type: "success",
          message: "请求成功!",
        });
      } else {
        this.$Message({
          type: "warning",
          message: "请求失败!",
        });
      }
    },
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    oncollapse() {
      this.collapse = !this.collapse;
    },
    getpath(res) {
      window.sessionStorage.setItem("datapath", "/" + res);
      this.datapath = "/" + res;
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

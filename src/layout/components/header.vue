<template>
  <el-header class="header">
    <div class="right">
      <!-- 使用替代搜索框 -->
      <HeaderSearch v-if="device == 'desktop'" />
      <el-color-picker
       v-if="device =='desktop'"
        v-model="bg"
        @change="changeTheme"
        style="margin-right:5px"
      ></el-color-picker>
      <!-- 放大缩小配置 -->
      <span class="el-icon-full-screen iconFont" @click="fullScreen" v-if="device=='desktop'"></span>

      <!-- 设置字体大小 -->

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <svg-icon
            class="size"
            :svgClass="'size'"
            :className="'size'"
          ></svg-icon>
        </span>
         <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="default" :disabled="size=='default'">default</el-dropdown-item>
          <el-dropdown-item command="medium" :disabled="size=='medium'">medium</el-dropdown-item>
          <el-dropdown-item command="small" :disabled="size=='small'">small</el-dropdown-item>
          <el-dropdown-item command="mini" :disabled="size=='mini'">mini</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button-group class="button-group" v-if="device == 'desktop'">
        <el-button type="primary" size="mini" @click="setLangText('zh')"
          >中文</el-button
        >
        <el-button type="primary" size="mini" @click="setLangText('en')"
          >英文</el-button
        >
      </el-button-group>

      <span v-if="device == 'desktop'" class="el-icon-bell message"></span>

      <el-button
        type="primary"
        style="margin-right:20px"
        size="mini"
        @click.native.stop="handleHelp"
        >点击帮助</el-button
      >
      <el-dropdown  @command="handleCommandToken">
        <span class="el-dropdown-link">
          管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu trigger="click">
          <el-dropdown-item command="super">超级管理员</el-dropdown-item>
          <el-dropdown-item command="common">普通会员</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-image
        :fit='"contain"'
        :src="avatar"
          style="width:80px;height:40px; border-radius:5px;margin:0 5px"
      ></el-image>
    </div>
  </el-header>
</template>
<script>
import screenfull from "screenfull";
import { mapMutations, mapState } from "vuex";
import Style from "./../../assets/scss/index.scss";
import Cookie from "js-cookie"

import Driver from "driver.js"; // import driver.js
import steps from "@/config/step";
import "driver.js/dist/driver.min.css"; // import driver.js css

import HeaderSearch from "@/components/headsearch/search.vue";

export default {
  data() {
    return {
      isFullScreen: false,
      lang: "zh",
      bg: Style.bg,
      Style,
      driver: null,
    };
  },

  mounted() {
    this.driver = new Driver();
  },

  components: { HeaderSearch },

  computed: {
    ...mapState("app", ["avatar", "device", "openSidebar", "btncolor","size"]),
  },

  methods: {
    ...mapMutations("app", ["SET_THEME_COLOR","SET_ELEMENT_SIZE",'CLEAR_TOKEN','CLEAR_ROUTE_TAG']),

    logOut() {
      this.CLEAR_TOKEN();
      this.$router.push("/login");
    },

    handleHelp() {
      this.guide();
    },

    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    },

    changeTheme(val) {
      if (!val) {
        val = "#000";
      }
      this.bg = val;
      Style.bg = val;
    },

    fullScreen() {
      if (!screenfull.isEnabled) {
        screenfull.toggle();
      } else {
        screenfull.toggle();
      }
    },

    changeScreen() {
      this.isFullScreen = screenfull.isFullscreen;
    },

    change(val) {
      val ? "dark" : "light";
    },

    setLangText(lang) {
      window && window.localStorage.setItem("lang", lang);
      this.$i18n.locale = lang;
      let txt = lang == "zh" ? "中文" : "英文";
      this.$Message.success("当前选择的语言为" + txt);
    },

    mounted() {
      screenfull.on("change", this.changeScreen);
    },
    destory() {
      screenfull.off("change", this.changeScreen);
    },

    handleCommand(val) {
      this.$ELEMENT.size = val
      const { fullPath } = this.$route;
      this.SET_ELEMENT_SIZE(val); 
      this.CLEAR_ROUTE_TAG();
      this.$nextTick(() => {
        console.log(this.$router,"4444");
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    },

    handleCommandToken(val){
        if(val=='logout'){
          this.logOut();
        }
    }
  },
};
</script>

<style scoped lang="scss">
.el-header {
  background-color: inherit;
}

.header {
  display: flex;
  --webkit-display:flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  // width: 80%;
  background-color: inherit;
  height: 60px !important;
  color: #fff;
  .user-avatar {
    height: 40px;
    width: 80px;
    border-radius: 5px;
  }

  div.title {
    height: 100%;
    display: flex;
    align-items: center;

    .name {
      margin-left: 20px;
      color: #000;
      font-weight: bolder;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  .button-group {
    margin-right: 20px;
  }

  .iconFont {
    font-size: 28px;
    color: #000;
    margin: 0 5px;
  }
  .message {
    font-size: 20px;
    color: #000;
    margin-right: 10px;
  }

  .el-dropdown-link {
    margin-right: 10px;
  }

  .size {
    height: 20px;
    width: 20px;
    margin: 0 15px;
  }
}
</style>

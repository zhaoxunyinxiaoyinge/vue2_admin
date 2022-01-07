<template>
  <el-header class="header" :style="{background:Style.bg}">
    <div class="title">
      <el-image class="user-avatar" :src="avatar"></el-image>
      <span class="name" v-if="device=='desktop'">vue2后台管理系统</span>
    </div>

    <div class="right" >
<el-color-picker v-model="bg" @change="changeTheme"></el-color-picker>
      <span v-if="device=='desktop'" class="el-icon-full-screen iconFont" @click="fullScreen"></span>
      <el-button-group class="button-group">
        <el-button type="primary" size="mini" @click="setLangText('zh')"
          >中文</el-button
        >
        <el-button type="primary" size="mini" @click="setLangText('en')"
          >英文</el-button
        >
      </el-button-group>

      <span v-if="device=='desktop'" class="el-icon-bell message"></span>

      <el-button type="danger" size="mini" @click="logOut">退出</el-button>
    </div>
  </el-header>
</template>
<script>
import screenfull from "screenfull";
import { mapMutations, mapState } from "vuex";
import Style from "./../../assets/scss/index.scss";

export default {
  data() {
    return {
      isFullScreen: false,
      lang: "zh",
      bg:Style.bg,
      Style,
    };
  },

  computed: {
    ...mapState("app", ["avatar", "device", "openSidebar","btncolor"]),
  },

  methods: {
    ...mapMutations('app',['SET_THEME_COLOR']),
    logOut() {
      window.sessionStorage.clear("token");
      location.reload();
    },

    changeTheme(val){
      if(!val){val="#000"}
      this.bg=val;
      Style.bg=val;
      console.log(Style.bg);
      // this.SET_THEME_COLOR(val);
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
      this.onchange();
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
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
  height: 60px !important;
  position: fixed;
  top:0;
  color: #fff;
  border-bottom: 1px solid hsl(0, 0%, 93%);
  // background:#fff;

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
    margin-right: 20px;
    margin-left: 20px;
  }
  .message {
    font-size: 20px;
    color: #000;
    margin-right: 10px;
  }
}
</style>

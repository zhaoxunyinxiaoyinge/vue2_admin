<template>
  <el-header class="header">
    <div class="title">
      <img src="./../../assets/1.jpg" alt="" />
      <h1 class="name">后台开发管理系统模板</h1>
    </div>
    <div class="right">
      <span class="el-icon-full-screen iconFont" @click="fullScreen"></span>
      <el-button-group class="button-group">
        <el-button type="primary" size="mini" @click="setLangText('zh')"
          >中文</el-button
        >
        <el-button type="primary" size="mini" @click="setLangText('en')"
          >英文</el-button
        >
      </el-button-group>
      <span class="el-icon-bell message"></span>
      <el-button type="danger" size="mini" @click="logOut">退出</el-button>
      
    </div>
  </el-header>
</template>
<script>
import screenfull from "screenfull";
export default {
  data() {
    return {
      isFullScreen: false,
      lang: "zh",
    };
  },

  methods: {
    logOut() {
      window.sessionStorage.clear("token");
      location.reload();
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
  width: 100%;
  background: rgb(243, 245, 243);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  height: 60px !important;
  // position: fixed;
  // top:0;
  // left:0;

  div.title {
    height: 100%;
    display: flex;
    align-items: center;
    .name {
      color: #000;
      font-weight: bolder;
    }
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

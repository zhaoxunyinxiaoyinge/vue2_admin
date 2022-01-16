<template>
  <el-header class="header">
    <div class="right">
        <el-input style="width:220px;margin-right:20px" prefix-icon="el-icon-search"></el-input>
      <el-color-picker v-model="bg" @change="changeTheme"></el-color-picker>
      <span
        v-if="device == 'desktop'"
        class="el-icon-full-screen iconFont"
        @click="fullScreen"
      ></span>
    

      <el-button-group class="button-group">
        <el-button type="primary" size="mini" @click="setLangText('zh')"
          >中文</el-button
        >
        <el-button type="primary" size="mini" @click="setLangText('en')"
          >英文</el-button
        >
      </el-button-group>

      <span v-if="device == 'desktop'" class="el-icon-bell message"></span>

      <el-dropdown>
      <span class="el-dropdown-link">
        管理员<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu  trigger="click">
        <el-dropdown-item >超级管理员</el-dropdown-item>
        <el-dropdown-item>普通会员</el-dropdown-item>
        <el-dropdown-item  @click="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      <el-image
        :src="avatar"
        style="height:30px;border-radius:5px;margin:0 5px"
      ></el-image>
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
      bg: Style.bg,
      Style,
    };
  },

  computed: {
    ...mapState("app", ["avatar", "device", "openSidebar", "btncolor"]),
  },

  methods: {
    ...mapMutations("app", ["SET_THEME_COLOR"]),
    logOut() {
      window.sessionStorage.clear("token");
      location.reload();
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
.el-header {
  background-color: inherit;
}

.header {
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
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
    margin-right: 20px;
    margin-left: 20px;
  }
  .message {
    font-size: 20px;
    color: #000;
    margin-right: 10px;
  }

.el-dropdown-link {
  margin-right: 10px;
}
}
</style>

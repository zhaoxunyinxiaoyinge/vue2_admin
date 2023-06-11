<template>
  <div>
    <!-- git 测试 -->
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span class="bold">用户个人信息</span>
      </div>
      <div style="margin-bottom:20px">
        <span>用户名</span>:<span>{{userInfo.user_name }}</span>&nbsp;
      </div>
      <div style="margin-bottom:20px">
        <span>手机号码: {{userInfo.tel_phone}}</span>
      </div>
      <div style="margin-top:20px">
         <el-button type="primary"  @click="toggleImage" size="small">更换头像图片</el-button>
      </div>

      <el-image
        class="img"
        :lazy="true"
        :alt="'图像'"
        :src="userInfo.avatar"
      ></el-image>
      <div slot="error">图片加载错误</div>
    </el-card>
    <Avatar ref="avatar"  />
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Avatar from "./avatar.vue"
import { copyText } from "./../../utils/copy";

export default {
  name: "user",

  data() {
    return {
    };
  },

  computed: {
    ...mapState("user", ["userInfo"]),
  },

  mounted(){
    console.log("mount")
    this.$nextTick(()=>{
      copyText(".cut");
    })
  },

  activated(){
    console.log('actveid');
  },

  deactivated(){
    console.log("组件被销毁");
  },

  destroyed(){
    console.log("组件销毁之前");
  },

  components:{
    Avatar
  },

  methods: {
    toggleImage(){
      this.$refs.avatar.handleShow();
    }
  },
};
</script>
<style scoped>
  @media screen and (max-width:750px){
    .card {
      width:80%;
    }
  }

</style>
<style scoped lang="scss">

.card {
  width: 40%;
}

.bold {
  font-weight: bolder;
}

.img {
  width: 200px;
  margin: 20px 0 0 0;
}
</style>

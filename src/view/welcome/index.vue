<template>
  <div>
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span class="bold">用户个人信息</span>
      </div>
      <div>
        <span>用户名</span>:<span>{{ username }}</span>&nbsp;
        <el-button size="mini" type="success" class="copy" ref="btn" data-clipboard-text="xiaomei">直接复制当前属性文本</el-button>
        <el-button size="mini" type="success" class="cut"  >事件委托方式使用</el-button>
      </div>
      <div style="margin-top:20px">
         <el-button type="primary"  @click="toggleImage" size="small">更换头像图片</el-button>
      </div>
      <el-image
        class="img"
        :preview-src-list="imgList"
        :lazy="true"
        :alt="'图像'"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.cnhnb.com%2Fimage%2Fpng%2Fhead%2F2020%2F02%2F25%2Ff8f3abeeaa8441d8a7cca6d1079beb9c.png&refer=http%3A%2F%2Fimage.cnhnb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635646516&t=f265bcd4255efbea16bf3f17e0e92ce2"
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
      imgList: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.cnhnb.com%2Fimage%2Fpng%2Fhead%2F2020%2F02%2F25%2Ff8f3abeeaa8441d8a7cca6d1079beb9c.png&refer=http%3A%2F%2Fimage.cnhnb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635646516&t=f265bcd4255efbea16bf3f17e0e92ce2",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-0c1995ec100dac911add7618d539b32d_hd.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635646516&t=85b861d70c3867b45f711a970463cc87",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171204%2F712e29f300674ee78cc039db381c89cd.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635646516&t=637d29554e9490af78c49374989fefb8",
      ],
    };
  },
  computed: {
    ...mapState("app", ["username"]),
  },

  mounted(){
    this.$nextTick(()=>{
      copyText(".cut");
    })
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

<template>
  <div class="carousel">
    <p>欢迎光临后台管理系统！</p>
    <p>
      <a href="https://github.com/zhaoxunyinxiaoyingge"
        >个人gitHub地址:https://github.com/zhaoxunyinxiaoyingge</a
      >
    </p>
    <VueQuildEdit :content="content" :editorOption="editorOption"   />
  </div>
</template>
<script>
import VueQuildEdit from "components/quiledit";
import {getBananer} from "./api"
export default {
  name: "danbord",

 async mounted() {

 },
  data() {
    return {
      content:"",
      editorOption:{

      }
    }
  },
  components: { VueQuildEdit },
  methods: {

  },
};
</script>

<style scoped lang="scss">
p {
  text-align: center;
}

.block {
  display: inline-flex;
  margin: auto;
  text-align: left;
}
</style>

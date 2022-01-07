<template>
  <div class="item" >
    <i class="icon" :class="icon"></i>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "icon-title",
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
      default() {
        return "";
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed:{
    ...mapState('app',['openSidebar'])
  }
};
</script>

<style scoped lang="scss">
.item {
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;

  i.icon {
    width: 30px;
    font-size: 16px;
  }

  .title {
    flex: 1;
    text-align: left;
  }
}
</style>

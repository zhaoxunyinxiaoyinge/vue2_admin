<template>
  <el-menu
    :class="isCollapse?'collapse-width':'not-collapse-width'"
    class="menu"
    text-color="#fff"
    active-text-color="#000"
    :unique-opened="false"
    :collapse="isCollapse"
    :collapse-transition="false"
    :router="true"
    :default-active="'/'"
  >
    <slot></slot>
  </el-menu>
</template>
<script>
export default {
  name: "mains",
  props: {
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
  },

// 2.2,再vue2中使用provide和inject特性
  provide(){
    return this.$data
  },

  data() {
    return {
      menus: [],
      isCollapse: false,
      activeRoute:""
    };
  },
  methods: {
    handleClose() {
      this.isCollapse = !this.isCollapse;
    },
  },

  watch:{
      "$route":{
        deep:true,
        handler:function(val,old){
           if(val){
             this.activeRoute=val.fullPath;
           }
        },
        immediate:true
      }
  }
};
</script>

<style scoped lang="scss">
  .menu {
    color:#fff;
    border-right: 0;
    background-color: #2b6447;
    width: 100%;
  }

  .collapse-width{
    width:64px
  }

  .not-collapse-width {
    width:200px
  }
</style>

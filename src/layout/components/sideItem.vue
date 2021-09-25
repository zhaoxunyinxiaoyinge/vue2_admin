<template>
  <el-menu
    text-color="#fff"
    active-text-color="#f21fff"
    :unique-opened="true"
    :collapse="collapse"
    :collapse-transition="false"
    :router="true"
    :default-active="''"
  >

  <template  v-for="(item,index) in menus">
      <side-bar :data="item"  :key="index"></side-bar>
  </template>

  </el-menu>
</template>
<script>

import SideBar from '../../../../video_admin/src/layout/components/item.vue';
export default {
    data(){
        return {
            menus:[]
        }
    },
    components:{
      SideBar
    }
};
</script>

<style scoped></style>

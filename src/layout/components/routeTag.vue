<template>
  <div class="tag">
    <el-scrollbar    ref="scroll"   @wheel.native.prevent="handleWheel">
      <el-button class="tag-item"  size="small" @click="jumpTo(tag.path)" v-for="tag in getRouteTag" :key="tag.path" closable  
      :type="cur===tag.path?'primary':'default'">
          {{tag.title}}
          <span class="el-icon-close" @click="removeTag(tag.path)"></span>
      </el-button>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "router-tag",
  data() {
    return {
      cur:""
    };
  },

  computed: {
    ...mapGetters("app", ["getRouteTag"]),
     scrollWrapper() {
      return this.$refs.scroll.$refs.wrap
    }
  },

  methods: {
    ...mapMutations("app",["DELETE_ROUTE_TAG"]),
    jumpTo(val){
      this.$router.push(val);
    },

    removeTag(val){
      this['DELETE_ROUTE_TAG'](val);
      let len=this.getRouteTag.length;
      this.scrollWrapper.scrollLeft=this.scrollWrapper.scrollLeft-95;
      if(len>0){
        let lasteRoute=this.getRouteTag[len-1];
        this.$router.push(lasteRoute.path);
      }else{
        this.$router.push("/");
      }
    },

    handleWheel(e){
        const eventDelta = e.wheelDelta;
        const $scrollWrapper = this.scrollWrapper;
        $scrollWrapper.scrollLeft=$scrollWrapper.scrollLeft+eventDelta/4;
    },
  
  },
  watch:{
    $route:{
      handler:function(curToute){
      this.cur=curToute.path;
      },
      deep:true,
      immediate: true,
    }
  }
};
</script>
<style scoped>
    .tag {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        height: 30px;
        padding: 5px 0;
        background-color: #fff;
    }

    .tag-item {
      margin:0 10px;
    }

    .el-scrollbar {
      width: 100%;
      white-space: nowrap;
    }
       
 
</style>

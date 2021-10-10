<template>
  <div class="tag">
    <el-button class="tag-item" size="mini" @click="jumpTo(tag.path)" v-for="tag in getRouteTag" :key="tag.path" closable  type="success">
        {{tag.title}}
        <span class="el-icon-close" @click="removeTag(tag.path)"></span>
    </el-button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "router-tag",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("app", ["getRouteTag"]),
  },

  methods: {
    ...mapMutations("app",["DELETE_ROUTE_TAG"]),
    jumpTo(val){
      this.$router.push(val);
    },
    removeTag(val){
      this['DELETE_ROUTE_TAG'](val);
      let len=this.getRouteTag.length;
      console.log(this.getRouteTag,"router")
      if(len>0){
        let lasteRoute=this.getRouteTag[len-1];
        this.$router.push(lasteRoute.path);
      }else{
        this.$router.push("/");
      }
    }
  },
};
</script>
<style scoped>
    .tag {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 10px 0;
        background-color: #FFF;
        align-items: center;
        height: 30px;
    }

    .tag-item {
      margin:0 10px
    }
</style>

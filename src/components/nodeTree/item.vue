<template>
  <div class="node">
    <div class="list-item" v-if="child.children && child.children.length > 0">
      <span class="el-icon-arrow-right"></span>
      <span
        class="text"
        :class="child.id==ids?'blue':''"
        >{{ child.name }}{{ child.id }}</span
      >
      <Tree  :child="sItem" :key="sItem.id"  :ids="ids" v-for="sItem in child.children"></Tree>
    </div>
    <div :key="child.id"  :class="child.id==ids?'blue':''"   v-else>
      <span
        >{{ child.name }}{{ child.id }}</span
      > 
    </div>
  </div>
</template>
<script>
import Tree from "components/nodeTree/index.vue";
export default {
  name: "Tree",
  components: { Tree },
  props: {
    child: {
      type: Object,
      default() {
        return {};
      },
    },
    ids:{
      type:String,
      default:""
    }
  },

  data() {
    return {
      arr: [],
      show: true,
    };
  },
  mounted() {},
  methods: {
    getOneLevel(list) {
      list.forEach((item) => {
        if (item.children && item.children.length > 0) {
          let newArr = [...item.children];
          delete item.children;
          this.arr.push(item);
          this.getOneLevel(newArr);
        } else {
          this.arr.push(item);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
}

.jiao {
  position: relative;
  top: 15px;
  margin-left: 10px;
  width: 0;
  height: 0px;
  border-left: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-top: 12px solid green;
  border-right: 12px solid transparent;
}
.list-item div {
  padding-left: 20px;
}

.blue {
  color: blue;
}

.text:hover {
  cursor: pointer;
}
</style>

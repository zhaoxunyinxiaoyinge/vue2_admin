<template>
  <div>
    <el-input v-model="arg" suffix-icon="el-icon-search" @change="handleChange"></el-input>
    <div class="svg-list" :style="{ maxHeight: height }">
      <div
        class="svg-list-item"
        :key="index"
        v-for="(item, index) in getCheckedIcon"
        @click="handleClick(item)"
      >
        <svg-icon class="svg" :svgClass="item" :className="item"> </svg-icon>
        <span class="text">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    height: {
      type: String,
      default: "200px",
    },
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      arg:""
    };
  },
  computed: {
    ...mapState("app", ["iconList"]),
    getCheckedIcon() {
      if (this.arg === "") {
        return this.iconList;
      }
      let cur = this.iconList.filter((item) => item == this.arg);
      return cur.length === 0 ? [] : cur;
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("checked", item);
    },

    handleChange(value){
       this.$emit("checked", value);
    }
  },

watch: {
    value:{
        immediate:true,
        handler(news,old){
            this.arg=news;
        }
    }
},
};
</script>

<style lang="scss" scoped>
.svg-list {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  overflow: auto;
}

.svg-list-item {
  width: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 30px;
  margin-bottom: 20px;
}

.svg {
  width: 30px;
  height: 30px;
}

.text {
  margin-left: 20px;
}
</style>

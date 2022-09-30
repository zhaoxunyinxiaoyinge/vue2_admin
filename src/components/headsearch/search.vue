<template>
  <div :class="{ show: show }" class="headsearch-select">
    <svg-icon
      :svgClass="'search'"
      :className="'search'"
      @click.stop="change"
    ></svg-icon>
    <el-select
      clearable
      v-model="queryParams"
      remote
      :remote-method="querySearch"
      filterable
      default-first-option
      ref="select-search"
      class="select-search"
      size="small"
      @change="jumpCurrent"
    >
      <el-option
        v-for="item in options"
        :value="item.item.path"
        :key="item.item.path"
        :label="item.item.title"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import path from "path";
import _ from "lodash";
import Fuse from 'fuse.js'

export default {
  name: "search",
  data() {
    return {
      show: false,
      queryParams: "",
      options: [],
      fush: null,
      searchPool: [],
    };
  },
  mounted() {
    this.$nextTick(()=>{
          this.searchPool = this.gentRoutes(this.routes);
    if(this.searchPool.length>0){
      this.initFush(this.getBreadNav);
    }
    })

    
  },
  computed: {
    routes() {
      return this.$store.state.perssion.routes;
    },

    getBreadNav() {
      if (this.searchPool.length == 0) {
        return [];
      }
      let res = this.searchPool.map((item) => {
        item.title = _.cloneDeep(item.title)
          .split(",")
          .join(">");
        return item;
      });
      return res;
    },
  },

  methods: {
    gentRoutes(route, basePath = "/", prexTitle = "") {
      let res = [];
      for (let item of route) {
        if (item.hidden) {
          continue;
        }
        if (item.children && item.children.length > 0) {
          let basePath = path.resolve(basePath, item.path);
          let title =
            prexTitle != ""
              ? prexTitle + "," + item.meta.title
              : item.meta.title;
          res.push({ title: title, path: basePath });
          res.push(...this.gentRoutes(item.children, basePath, title));
        } else {
          let paths = path.resolve(basePath, item.path);
          let title =
            prexTitle != ""
              ? prexTitle + "," + item.meta.title
              : item.meta.title;
          res.push({ title: title, path: paths });
        }
      }
      return res;
    },

    change() {
      this.show = !this.show;
    },

    jumpCurrent(route) {
      if (!route) {
        return;
      }
      console.log(route,"开始测试值了")
      this.$router.push(route);
      this.queryParams="";
      this.options=[];
    },
    querySearch(query) {
    if(query!=""){
      this.options = this.fush.search(query);
      }else{
        this.options=[
        ]
      }

    },

    initFush(list) {
      this.fush = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7,
          },
          {
            name: "path",
            weight: 0.3,
          },
        ],
      });
    },
  },
  watch: {
    routes: function() {},
  },
};
</script>

<style lang="scss" scoped>
.headsearch-select {
  display: flex;
  align-items: center;
  height: 24px;
  .el-select {
    width: 0;
    transition: width 0.2s;
    overflow: hidden;
    ::v-deep .el-input__inner {
      padding: 0;
    }
  }

  .icon-search {
    font-size: 16px;
    height: 40px;
    width: 25px;
    cursor: pointer;
  }
  &.show {
    .el-select {
      width: 230px;
      margin-left: 10px;
    }
  }
}
</style>

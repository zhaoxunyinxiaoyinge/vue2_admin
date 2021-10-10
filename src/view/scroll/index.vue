<template>
<div class='infinite-list-wrapper'>
    <ul
      class="list"
      v-infinite-scroll="getData"
      infinite-scroll-disabled="disabled"
    >
      <li :key="item.id" v-for="item in list" class="list-item">
        {{ item.text }}
      </li>
    </ul>
    <p class="tip" v-if="loading">加载中...</p>
    <p class="tip" v-if="noMore">没有更多了</p>
</div>
</template>
<script>
import { getLoadMore } from "./api";
import _ from "lodash"

export default {
  name: "scrolls",
  data() {
    return {
      list: [],
      loading: false,
    };
  },

  mounted() {
    this.getData();
  },

  computed: {
    noMore() {
      return this.list.length >= 30;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },

  methods: {
    async getData() {
      this.loading = true;
      try {
        let data = await getLoadMore();
        this.list=_.cloneDeep(this.list).concat(data.data.data.data)
      } catch (e) {
        this.$Message.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
    .list {
        list-style: none;
        background-color: #fff;
    }

    .list-item {
        margin:20px 20px;
        text-indent: 20px;
        line-height: 30px;
        font-size: 14px;
    }

    .tip {
        text-align: center;
        font-size: 14px;
    }

    .infinite-list-wrapper {
        height: 800px;
    }

</style>

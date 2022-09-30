<template>
    <div>
        <Item :ids="ids" :key="item.id" :child="item" v-for="item in nodes"></Item>
    </div>
</template>

<script>
import Item from "./item.vue"
export default {
    props: {
    nodes: {
      type: Array,
      default() {
        return [];
      },
    },
    ids: {
      type: String,
      default: "",
    },
  },
    components:{
        Item
    }
}
</script>
<template>
  <div class="content">

  </div>
</template>

<script>
export default {
  name: "selfEvent",
  data() {
    return {
      keycode:123
    };
  },
  beforeCreated(){
    console.log(this,'挂载之前');
  },

  created(){
    console.log("created狗子函数",this)
  },

  mounted(){
    console.log("这里开始加载时就条用",this);
  },

  beforeMounted(){
    console.log("将要挂载",this);
  },


  
  activated(){
    console.log("这里被调用了");
  },

  deactivated(){
    console.log("组件离开时调用")
  },
  
};
</script>

<style scoped lang="scss">
p {
  margin:0;
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  border: 1px solid red;
}

.img {
  width: 100% ;
  height: calc(300% / 4) ;
}

.text {
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

</style>

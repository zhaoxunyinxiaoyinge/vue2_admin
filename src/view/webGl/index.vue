<template>
  <div>
    <canvas id="canvas" ref="webgl" width="200" height="200"> </canvas>
  </div>
</template>

<script id="share-vs">  
// 顶点设置
    attributte 
</script>


<script id="share-fs">
// 对填充的路经进行填色
</script>

<script>
export default {
  name: "webGl",
  data() {
    return {};
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let canvas = document.getElementById("canvas");
      let webgl = canvas.getContext("webgl");
      webgl.viewport(0, 0, webgl.canvas.width, webgl.canvas.height);
      webgl.clearColor(255, 0, 0, 1);
      webgl.clear(webgl.COLOR_BUFFER_BIT);
    },
  },
};
</script>

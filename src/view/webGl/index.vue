<template>
  <div>
    <canvas id="canvas" ref="webgl" width="200" height="200"> </canvas>
  </div>
</template>

<script id="share-vs">  
    attributte 
</script>


<script id="share-fs">

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
      webgl.clearColor(0, 0, 0, 1);
      webgl.clear(webgl.COLOR_BUFFER_BIT);
    },
  },
};
</script>

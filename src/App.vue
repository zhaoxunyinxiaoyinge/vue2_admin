<template>
  <div id="app" ref="app">
    <div id="apps"></div>
    <router-view ></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },

  created() {
    this.$nextTick(() => {
      let str = this.setSvg();
      document.getElementById("apps").style.backgroundImage =
        "url(" + str + ")";
    });
  },

  methods: {
    setSvg() {
      let str = `<svg xmlns="http://www.w3.org/2000/svg" width="400px" height="400px">
        <text x="0px" y="100px" dy="16px"
        text-anchor="start"
        stroke="#000"
        stroke-opacity="0.2"
        fill="none"
        transform="rotate(-40)"
        font-weight="40"
        font-size="30px"
        >
        商业机密
        </text>
      </svg>`;

      return `data:image/svg+xml;base64,${window.btoa(
        unescape(encodeURIComponent(str))
      )}`;
    },
  },
  beforedestroy() {
    window.onresize = null;
  },
};
</script>
<style lange="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#apps {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 234;
  pointer-events: none;
}
</style>

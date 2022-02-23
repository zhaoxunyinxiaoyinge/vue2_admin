<template>
  <div class="tabel">
    <div class="item" ref="one"></div>
    <div class="item" ref="two"></div>
    <div class="item" ref="three"></div>
    <div class="item" ref="four"></div>
    <div class="item" ref="five"></div>
    <div class="item" ref="six"></div>
    <div class="item" ref="seven"></div>
    <div class="item" ref="eight"></div>
  </div>
</template>
<script>
import { getEcharts } from "./api";
import _ from "lodash";
import Echarts from "echarts";
export default {
  data() {
    return {
      setData: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  methods: {
    init() {
      let myCharts = Echarts.init(this.$refs.one);
      let myChartst = Echarts.init(this.$refs.two);
      let myChartstree = Echarts.init(this.$refs.three);
      let myChartsfo = Echarts.init(this.$refs.four);
      let myChartstfive = Echarts.init(this.$refs.five);
      let myChartstsix = Echarts.init(this.$refs.six);
      let myChartstseven = Echarts.init(this.$refs.seven);
      let myChartsteight = Echarts.init(this.$refs.eight);
      myCharts.setOption(this.setData[0]);
      myChartst.setOption(this.setData[1]);
      myChartstree.setOption(this.setData[2]);
      myChartsfo.setOption(this.setData[3]);
      myChartstfive.setOption(this.setData[4]);
      myChartstsix.setOption(this.setData[4]);
      myChartstseven.setOption(this.setData[2]);
      myChartsteight.setOption(this.setData[1]);
    },
    async getReportss() {
      let res = await getEcharts();
      this.setData = res.data;
      this.init();
    },
  },
  created() {
    this.getReportss();
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
    })
  
  },
};
</script>

<style scoped>
.tabel {
  margin-top: 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-template-rows: 251px 251px;
  justify-content:space-between;
  align-content: space-around;
  height: 530px;
}

.item {
  background-color: #fff;
  border-radius: 5px; 
  offset: 1px solid  #eee;
  

}

@media screen and (max-width: 769px) {
  .tabel {
  grid-template-columns:99%;
  grid-template-rows: 251px 251px;
 }   
}


@media screen and (min-width: 770px) and (max-width: 1024px) {
  .tabel {
  grid-template-columns:48% 48%;
  grid-template-rows: 251px 251px;
 }   
}



</style>

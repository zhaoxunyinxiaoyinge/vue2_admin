<template>
  <div class="tabel">
    <el-card style="width:100%">
      <div id="container" style="width:100%;height:800px;background-color:#fff"></div>
    </el-card>
  </div>
</template>
<script>
import _ from "lodash";
import * as  echarts from "echarts";

export default {
  name: "charts",
  data() {
    return {
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: true
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
          },
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0 },
          grid: { top: '55%' },
          series: [
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['25%', '25%'],
              emphasis: {
                focus: 'self'
              },
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        }
      let myEacther=echarts.init(document.querySelector('#container'));
          myEacther.setOption(option)
      });
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.tabel {
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  background-color: #ccc;
  padding: 10px 0;
  flex-wrap: wrap;
  height: 100%;
  padding: 0px;
  justify-content: flex-start;
}

.item {
  background-color: #fff;
  border-radius: 5px;
  offset: 1px solid #eee;
  min-height: 200px;
  height: 251px;
  width: 32%;
  margin: 5px;
}

@media screen and (max-width: 760px) {
  .item {
    width: 100%;
  }
}

@media screen and (min-width: 760px) and (max-width: 992px) {
  .item {
    width: 48%;
  }
}
</style>

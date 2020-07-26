<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据表报</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div ref="echart" class="echarts"></div>
    </el-card>
  </div>
</template>
<script>
import {getReports} from "@/API/serve.js"
import _ from "lodash"
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
      let Dom = this.$refs.echart;
      let myCharts = Echarts.init(Dom);
      myCharts.setOption(this.setData);
    },
   async getReportss(){
        let res=await getReports();
        if(res.data.meta.status!==200){
            return this.$Message.error("请求错误！")
        }
        console.log(res.data,"信息")

        this.setData=_.merge(res.data.data,{tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    }},{
        xAxis: [
        {
            boundaryGap: false,
        }
    ],
    },) 
        this.init();
    }
  },
   created() {
    this.getReportss();  
   },
   mounted() {
    this.init();

  },
};
</script>

<style scoped>
.el-card {
    margin:20px 0;
}
.echarts {
  height: 400px;
}
</style>

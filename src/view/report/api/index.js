import { Fetch } from "@/API/http";

export const getEcharts = function(params) {
  return Fetch({
    url: "/echarts",
    methods: "get",
    params
  });
};

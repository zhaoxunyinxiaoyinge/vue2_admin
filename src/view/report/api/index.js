import { Fetch } from "@/api/http";

export const getEcharts = function(params) {
  return Fetch({
    url: "/echarts",
    methods: "get",
    params
  });
};

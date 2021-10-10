import { Random } from "mockjs";

const Mock = require("mockjs");
Mock.setup({
  timeout: 400
});

//用户登录接口
const login = () => {
  return Mock.mock(/\/login\?.*/, "get", function(options) {
    let username = getSearchParams(options.url).get("username");
    let passworld = getSearchParams(options.url).get("password");
    return {
      message: "ok",
      status: 200,
      data: {
        token: "zxy123456.com",
        username,
        passworld
      }
    };
  });
};

//  获取菜单权限
const getMenus = () => {
  return Mock.mock(/\/menus\/?.*/, "get", function(options) {
    return {
      message: "ok",
      status: 200,
      data: [
        {
          id: "1",
          path: "/danbord",
          roles: ["admin"]
        },

        {
          id: "1-1",
          path: "/welcome",
          roles: ["admin"]
        },
        {
          id: "1-2",
          path: "/user",
          roles: ["admin"],
          children: [
            {
              id: "1-2-1",
              path: "/user/roles",
              roles: ["admin"]
            }
          ]
        },

        {
          id: "1-3",
          path: "/reports",
          roles: ["admin"]
        },
        {
          id: "1-4",
          path: "/editext",
          roles: ["admin"],
          children: [
            {
              id: "1-4-1",
              path: "index",
              roles: ["admin"]
            }
          ]
        },
        {
          id: "1-5",
          path: "/scroll",
          roles: ["admin"],
          children: [
            {
              id: "1-5-1",
              path: "index",
              roles: ["admin"]
            }
          ]
        }
      ]
    };
  });
};

export const person = () => {
  return Mock.mock(/\/getPersonInfo/, "get", {
    page: 1,
    pageSize: 20,
    total: 20,
    "data|0-20": [
      {
        "id|+1": 1,
        name: "@cname",
        "creadit|+6": 421023198910030527,
        "adress|4": "广东省天朝市"
      }
    ]
  });
};

// 根据token获取用户个人信息
export const userInfo = () => {
  return Mock.mock(/\/userinfo/, "get", function(options) {
    let token = getSearchParams(options.url).get("token");
    return {
      status: 200,
      message: "ok",
      data: {
        username: "王小明",
        token
      }
    };
  });
};

export const getCharts = () => {
  return Mock.mock("/echarts", "get", function() {
    return [
      {
        title: {
          text: "Temperature Change in the Coming Week"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series: [
          {
            name: "Highest",
            type: "line",
            data: [10, 11, 13, 11, 12, 12, 9],
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }]
            }
          },
          {
            name: "Lowest",
            type: "line",
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
              data: [
                { type: "average", name: "Avg" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max"
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Max"
                    },
                    type: "max",
                    name: "最高点"
                  }
                ]
              ]
            }
          }
        ]
      },

      {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ],
            type: "scatter"
          }
        ]
      },
      {
        xAxis: {
          data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"]
        },
        yAxis: {},
        series: [
          {
            type: "candlestick",
            data: [
              [20, 34, 10, 38],
              [40, 35, 30, 50],
              [31, 38, 33, 44],
              [38, 15, 5, 42]
            ]
          }
        ]
      },
      {
        title: {
          text: "Basic Radar Chart"
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending"]
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 }
          ]
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget"
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending"
              }
            ]
          }
        ]
      },
      {
        title: [
          {
            text: "Michelson-Morley Experiment",
            left: "center"
          },
          {
            text: "upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR",
            borderColor: "#999",
            borderWidth: 1,
            textStyle: {
              fontWeight: "normal",
              fontSize: 14,
              lineHeight: 20
            },
            left: "10%",
            top: "90%"
          }
        ],
        dataset: [
          {
            // prettier-ignore
            source: [
                    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
                    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
                    [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
                    [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
                ]
          },
          {
            transform: {
              type: "boxplot",
              config: { itemNameFormatter: "expr {value}" }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1
          }
        ],
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          name: "km/s minus 299,000",
          splitArea: {
            show: true
          }
        },
        series: [
          {
            name: "boxplot",
            type: "boxplot",
            datasetIndex: 1
          },
          {
            name: "outlier",
            type: "scatter",
            datasetIndex: 2
          }
        ]
      },
      {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            detail: {
              formatter: "{value}"
            },
            data: [
              {
                value: 50,
                name: "SCORE"
              }
            ]
          }
        ]
      },
      {
        title: {
          text: "Funnel"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ["Show", "Click", "Visit", "Inquiry", "Order"]
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 60, name: "Visit" },
              { value: 40, name: "Inquiry" },
              { value: 20, name: "Order" },
              { value: 80, name: "Click" },
              { value: 100, name: "Show" }
            ]
          }
        ]
      }
    ];
  });
};

export const getCarouseList = () => {
  return Mock.mock(/\/getcarouse/, "get", {
    data: {
      status: 200,
      "data|5": [
        {
          imgurl: () => Random.image("1280x400", "#fb0a2c")
        }
      ]
    }
  });
};

export const getLoadMore = params => {
  return Mock.mock("/getmoredata", "get", {
    data: {
      message: "ok",
      status: 200,
      "data|10": [
        {
          "id|+1": 0,
          text: () => Random.paragraph()
        }
      ]
    }
  });
};

export const runMock = function() {
  login();
  getMenus();
  person();
  userInfo();
  getCharts();
  getCarouseList();
  getLoadMore();
};

function getSearchParams(val) {
  let index = val.indexOf("?");
  let params = val.slice(index + 1);
  return new URLSearchParams(params);
}

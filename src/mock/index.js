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
          path: "/",
          name: "welcome",
          order: 1,
          redirect: "/danbord",
          meta: {
            title: "主页"
          },
          children: [
            {
              id: "1-1",
              path: "/danbord",
              order: 1,
              name: "danbord",
              component: "view/danboard/index",
              meta: {
                title: "首页",
                icon: "el-icon-s-platform",
                hidden: false,
                noCancle: false
              }
            }
          ]
        },
        {
          id: "2",
          name: "report",
          order: 4,
          path: "/report",
          redirect: "/report/index",
          meta: {
            title: "图表"
          },
          children: [
            {
              id: "2-1",
              name: "reportIndex",
              order: 1,
              path: "index",
              component: "view/report/index",
              meta: {
                hidden: false,
                icon: "el-icon-document",
                noCancle: false,
                title: "常用图表"
              }
            }
          ]
        },
        {
          id: "3",
          name: "welcomes",
          order: 8,
          path: "/welcome",
          redirect: "/welcome/index",
          meta: {
            title: "系统"
          },
          children: [
            {
              id: "3-1",
              name: "welcomeIndex",
              order: 1,
              path: "index",
              component: "view/welcome/index",
              meta: {
                hidden: false,
                icon: "el-icon-setting",
                noCancle: false,
                title: "个人中心"
              }
            }
          ]
        },
        {
          id: "4",
          name: "stylems",
          order: 9,
          path: "/stylems",
          redirect: "/stylems/index",
          meta: {
            hidden: false,
            icon: "el-icon-s-promotion",
            title: "系统设置"
          },
          children: [
            {
              id: "4-1",
              name: "user",
              order: 1,
              path: "index",
              component: "view/stylems/index",
              meta: {
                hidden: false,
                icon: "el-icon-user-solid",
                noCancle: false,
                title: "用户管理"
              }
            },
            {
              id: "4-2",
              name: "roles",
              order: 2,
              path: "user_roles",
              component: "view/stylems/userRoles",
              meta: {
                hidden: false,
                icon: "el-icon-s-custom",
                noCancle: false,
                title: "角色管理"
              }
            },
            {
              id: "4-3",
              name: "menu",
              order: 2,
              path: "user_menu",
              component: "view/stylems/userMenu",
              meta: {
                hidden: false,
                icon: "el-icon-menu",
                noCancle: false,
                title: "菜单管理"
              }
            },
            {
              id: "4-4",
              name: "dictionaries",
              order: 3,
              path: "dictionaries_setting",
              component: "view/stylems/dictionariesSetting",
              meta: {
                hidden: false,
                icon: "el-icon-s-release",
                noCancle: false,
                title: "用户字典配置"
              }
            },
            {
              id: "4-5",
              name: "dictionariesDetail",
              order: 3,
              path: "dictionaries_setting/:id",
              component: "view/stylems/dictionriesdetail",
              meta: {
                hidden: true,
                icon: "el-icon-s-release",
                noCancle: false,
                title: "字典详情"
              }
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
          "imgurl|+1": [
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.soumeitu.com%2Fwp-content%2Fuploads%2F2020%2F07%2F573bc808867ec.jpg&refer=http%3A%2F%2Fwww.soumeitu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=cb9651bf3923b0b07e7e025567b490e6",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2Fe8%2Ff3%2Fcd%2Fe8f3cdbe20f21361d6221ba4215e64d6.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=148bd59cc775d7c58adabe0987a80a03",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F77%2Fd4%2F97%2F77d497be2006d6eb9c4af1975de26f50.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=9c0c96c0349ff27f4eef8ae644879ee8",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F51%2F27%2F83%2F512783480411092723575ff78f0c5e99.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=9765a1710055a7d7bc9be2fe99b9205a",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg10.51tietu.net%2Fpic%2F20191029%2F0yw1zrc5ygu0yw1zrc5ygu.jpg&refer=http%3A%2F%2Fimg10.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=4df72655aeb4b6f146a6d1f410bfff41",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F3f%2Fc5%2F04%2F3fc50458f791c19aba193146f52025a5.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=c196eaa429d61c5ca7a337c6104cbe5a",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic125.nipic.com%2Ffile%2F20170325%2F19152711_133212465000_2.jpg&refer=http%3A%2F%2Fpic125.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643689490&t=fc59c965adfb6ccd05e6f5af99e93fad"
          ]
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

export const getDirecter = params => {
  return Mock.mock("/getdirectdata", "get", {
    data: {
      message: "ok",
      status: 200,
      "data|10": [
        {
          "id|+1": 0,
          name: Random.name(),
          "age|+1": 26,
          avatar: Random.image("200x100", "#FF6600"),
          place: Random.name(),
          "xueji|1": ["高中", "小学", "大学", "学士"],
          idNum: 345,
          "xueli|1": ["湖北", "湖南", "江苏", "广东"],
          "shenfen|1": ["农民", "技术工程师"],
          "zhuji|1": ["后瑞", "宝安", "前海", "桃园"],
          "shouru|11160-1001111": Random.natural(11160, 1001111),
          "sex|1": ["男", "女"]
        }
      ]
    }
  });
};

const getUseList = params => {
  return Mock.mock("/getUserList", "get", {
    data: {
      message: "ok",
      status: 200,
      "data|10": [
        {
          "id|+1": 0,
          "roles|1": ["admin", "orderyungong"],
          username: Random.name(),
          "workName|1": [
            "董事长",
            "普通员工",
            "研发管理员",
            "总监",
            "组长",
            "产品经理",
            "人事经理"
          ],
          phone: Random.natural(17603016347, 155571472205),
          createTime: new Date()
        }
      ],
      total: 10,
      page: 1,
      pageSize: 10
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
  getDirecter();
  getUseList();
};

function getSearchParams(val) {
  let index = val.indexOf("?");
  let params = val.slice(index + 1);
  return new URLSearchParams(params);
}

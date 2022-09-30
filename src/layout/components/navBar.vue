<template>
  <div class="tops">
    <RowBar />
    <div v-if="device=='desktop'">
      <span>{{ wehterData.city }}</span
      >&nbsp;
      <span>{{ wehterData.date_y }}</span>
      <span>{{ wehterData.temperature }}</span>
      <!-- <span class="time">{{ time }}</span> -->
    </div>
  </div>
</template>
<script>
import { weather } from "./../api/";

import moment from "moment";

import RowBar from "./rowBar";
import {mapState} from "vuex"
export default {
  data() {
    return {
      time: "",
      wehterData: {},
    };
  },
  components: {
    RowBar,
  },

  mounted() {
    this.getTime();
    this.getWeather({
      cityname: "深圳",
      dtype: "json",
      format: 1,
    });
  },

  computed:{
     ...mapState("app", ["device", "openSidebar"]),
  },

  methods: {
    getTime() {
      setTimeout(() => {
        this.time = moment(new Date()).format("LLLL");
        this.getTime();
      }, 1000);
    },

    getWeather(data) {
      weather(data).then((res) => {
        if (res.data.error_code == 0) {
          this.wehterData = res.data.result.today;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tops {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: #eee;
}

.time {
    margin:0 30px
}
</style>

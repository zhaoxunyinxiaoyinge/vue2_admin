     <template>
  <div class="from">
    <div class="form_box">
      <h2>欢迎登陆商品管理系统！</h2>
      <el-form
        ref="formRef"
        :model="datas"
        :rules="rules"
        :inline="true"
        label-width="100px"
      >
      <el-row>
        <el-form-item label="userNames:" prop="userName">
          <el-input
            type="text"
            v-model="datas.userName"
            prefix-icon="el-icon-user-solid"
          ></el-input>      
        </el-form-item>

      </el-row>

      <el-row> <el-col>
         <el-form-item label="passWords:" prop="password">
          <el-input
            type="password"
            v-model="datas.password"
            prefix-icon="el-icon-s-cooperation"
          ></el-input>
        </el-form-item>
       </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item class="form_button">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button @click="form_reset">重置</el-button>
        </el-form-item>
        </el-col>
      </el-row>
    

        <div class="tips">请输入默认管理员账号:admin,密码:zxy123456.com</div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { getLogin } from "./../api";
import Cookies from "js-cookie"

export default {
  mounted() {},

  data() {
    return {
      datas: {
        userName: "",
        password: "",
        redirect: "",
        otherQuery: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入你的用户名!",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入你的用户名!",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    ...mapMutations('app',['SET_TOKEN']),
    form_reset() {
      this.$refs.formRef.resetFields();
    },

    login() {
      // 调用表单的验证；
      this.$refs.formRef.validate(async (res) => {
        if (!res) return "无法通过验证";
        let { userName, password } = this.datas;
        let ret = await getLogin({ username: userName, password: password });
        if (ret.data.code === 0) {
          let token = ret.data.data[0].token;
          console.log(token,"token");
          this.SET_TOKEN(token);
          Cookies.set('token',token);
          Cookies.set("fdkfjd",259)
          this.$Message({
            message: "登录成功!",
            type: "success",
          });
          this.$router.push("/");    
        } else {
          this.$Message({
            message: "请求失败!",
            type: "warning",
          });
        }
      });
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((cur, next) => {
        if (next != "redirect") {
          cur[next] = query[next];
        } else {
          this.redirect = query.redirect;
        }
        return cur;
      }, {});
    },
  },

  watch: {
    $route: {
      deep: true,
      handler: function(oldVal, newVal) {
        if (newVal) {
          this.otherQuery = this.getOtherQuery(newVal.query);
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
div.from {
  background:url("./img/bg.jpeg")  no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display:flex;
  justify-content:center;
  align-items:center;
 
  .tips {
    font-size: 14px;
    color:rgb(177, 169, 169)
  }
}

 div.form_box {
    height: 300px;
    width:80%;
    background-color: #ffffff;
    border-radius: 10px;
    padding:10px;
    h2 {
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      color: #666;
      text-align: center;
      font-weight: bolder;
    }
    .form_input {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
      .form_button {
        align-self: flex-start;
      }
    }
  }


</style>

<style scoped>
  @media screen and (max-width:750px){
      .el-form {
        text-align:left
      }
  }

    @media screen and (min-width:751px){
   div.form_box {
        width:30%;
      }
  }

</style>

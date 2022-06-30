<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form label-width="100px" :model="dictionData">
      <el-form-item label="字典名称">
        <el-input v-model="dictionData.dict_name"></el-input>
      </el-form-item>

      <el-form-item label="字典类型">
        <el-input v-model="dictionData.dict_type"></el-input>
      </el-form-item>

      <el-form-item label="字典code">
        <el-input v-model="dictionData.dict_code"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio :label="1" v-model="dictionData.dict_status">是</el-radio>
        <el-radio :label="0" v-model="dictionData.dict_status">否</el-radio>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="text" v-model="dictionData.coment"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCommit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { createNewDiction,updateDictList } from "./../../api/index";

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    dictionData: {
      type: Object,
      default() {
        return {};
      },
    },

    type:{
      type:String,
      default:"add"
    }
  },
  data() {
    return {};
  },
  computed: {
    getDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("close", val);
      },
    },
  },
  methods: {
    handleClose() {
      this.getDialogVisible = false;
    },

    handleCommit(){
      this.type=='add' ? this.handleAdd():this.handleEdit();
    },

    handleAdd() {
      createNewDiction(this.dictionData)
        .then((res) => {
          console.log(res,"res")
          if (res.data.code == 0) {
            this.$Message.success("新增成功");
            this.$emit("update:list");
          }
        })
        .catch((e) => {
          this.$Message.error(e);
        })
        .finally(() => {
          this.getDialogVisible = false;
        });
    },

    handleEdit() {
      let {dict_name,dict_status,dict_code,dict_type,coment,id}=this.dictionData;
      updateDictList({dict_name,dict_status,dict_code,dict_type,coment,id})
        .then((res) => {
          if (res.data.code == 0) {
            this.$Message.success("更新成功");
            this.$emit("update:list");
          }
        })
        .catch((e) => {
          this.$Message.error(e);
        })
        .finally(() => {
          this.getDialogVisible = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form :model="outData">
      <el-form-item label="角色名称" label-width="120px">
        <el-input type="text" v-model="outData.role_name"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" label-width="120px">
        <el-radio :label="1" v-model="outData.role_status">是</el-radio>
        <el-radio :label="0" v-model="outData.role_status">否</el-radio>
      </el-form-item>
      <el-form-item label="添加角色" label-width="120px">
        <el-tree
          ref="tree"
          :data="menuData"
          node-key="id"
          show-checkbox
          :props="defaultProps"
        >
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCommit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { addUserRoleItem, updateUserRoleItem } from "./../../api/index";
import _ from "lodash"
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    menuData: {
      type: Array,
      default() {
        return [];
      },
    },
    outData: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default: "add",
    },
    roleList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
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

    handleCommit() {
      this.type == "add" ? this.handleAdd() : this.handleEdit();
    },

    handleAdd() {
      let data = this.outData;
      let arr = this.$refs.tree.getCheckedKeys(false);
      addUserRoleItem({ ...data, menu_id: arr.join(",") }).then((res) => {
        if (res.data.code == 0) {
          this.$Message.success("新增角色成功");
          this.getDialogVisible = false;
          this.$emit("update:list");
        }
      });
    },

    handleEdit() {
      let data = _.cloneDeep(this.outData);
      let arr = this.$refs.tree.getCheckedKeys(false);
      delete data.createdAt;
      delete data.updatedAt;

      updateUserRoleItem({ ...data, menu_id: arr.join(",") }).then((res) => {
        if (res.data.code == 0) {
          this.$Message.success("修改角色成功");
          this.getDialogVisible = false;
          this.$emit("update:list");
        }
      });
    },
  },

  watch: {
    dialogVisible: {
      immediate: true,
      handler(news, old) {
        if (news) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.outData.menu_id);
          });
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped></style>

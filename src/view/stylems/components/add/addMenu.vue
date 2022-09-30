<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <div class="dialog-fixed">
      <el-scrollbar style="height:500px">
        <el-form :model="menuItem" label-width="100px">
          <el-form-item label="上级菜单" style="min-height:50px">
            <el-input
              type="text"
              v-model="menuItem.parentName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio :label="0" v-model="menuItem.isMenu">目录</el-radio>
            <el-radio :label="1" v-model="menuItem.isMenu" :disabled="onlyMu">菜单</el-radio>
            <el-radio :label="2" v-model="menuItem.isMenu" :disabled="onlyMu">按钮</el-radio>
          </el-form-item>

          <el-form-item
            label="菜单图标"
            v-if="menuItem.isMenu == 1 || menuItem.isMenu == 0"
          >
            <SvgList :value="menuItem.icon" @checked="change" />
          </el-form-item>

          <el-form-item label="菜单名称">
            <el-input
              type="text"
              v-model="menuItem.title"
              placeholder="请选择菜单名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="显示排序">
            <el-input
              type="number"
              v-model="menuItem.order"
              placeholder="请选择排序"
            ></el-input>
          </el-form-item>
          <el-form-item label="组件路径" v-if="menuItem.isMenu == 1">
            <el-input
              type="text"
              v-model="menuItem.component"
              placeholder="请选择组件路径"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="权限标识"
            v-if="menuItem.isMenu == 1 || menuItem.isMenu == 2"
          >
            <el-input
              type="text"
              v-model="menuItem.perssion"
              placeholder="权限标识"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="menuItem.isMenu == 1 || menuItem.isMenu == 0"
            label="是否外链
"
          >
            <el-radio :label="1" v-model="menuItem.isOutLink">是</el-radio>
            <el-radio :label="0" v-model="menuItem.isOutLink">否</el-radio>
          </el-form-item>
          <el-form-item label="name名称">
            <el-input type="text" v-model="menuItem.name"></el-input>
          </el-form-item>
          <el-form-item
            label="路由地址"
            v-if="menuItem.isMenu == 1 || menuItem.isMenu == 0"
          >
            <el-input
              type="text"
              v-model="menuItem.path"
              placeholder="请选择路由地址"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="显示状态"
            v-if="menuItem.isMenu == 1 || menuItem.isMenu == 0"
          >
            <el-radio :label="0" v-model="menuItem.hidden">显示</el-radio>
            <el-radio :label="1" v-model="menuItem.hidden">隐藏</el-radio>
          </el-form-item>
          <el-form-item
            label="菜单状态"
            v-if="menuItem.isMenu == 1 || menuItem.isMenu == 0"
          >
            <el-radio :label="1" v-model="menuItem.status">正常</el-radio>
            <el-radio :label="0" v-model="menuItem.status">停用</el-radio>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCommit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import SvgList from "components/svglist/index";
import { addUserMenuItem, updateMenuDetail } from "./../../api/index";

export default {
  name: "addMenus",
  components: {
    SvgList,
  },
  props: {
    title: {
      type: String,
      default: "新增选项",
    },
    type: {
      type: String,
      default: "add",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    menuItem: {
      type: Object,
      default() {
        return {};
      },
    },
    tree: {
      type: Array,
      default() {
        return [];
      },
    },
    onlyMu:{
      type:Boolean,
      deafault:false
    }
  },

  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },

      sufxxIcon: "el-icon-caret-bottom",
      showTree: false,
      value: "",
    };
  },
  computed: {
    getDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("close");
      },
    },
  },
  methods: {
    handleClose() {
      this.getDialogVisible = false;
    },
    handleCommit() {
      let copyData = _.cloneDeep(this.menuItem);
      if (this.type == "edit") {
        delete copyData.parentName;
        updateMenuDetail(copyData).then((res) => {
          if (res.data.code == 0) {
            this.getDialogVisible = false;
            this.$Message.success("修改菜单成功");
            this.$emit("update:menu")
          }
        });
      } else {
        copyData.parentId = copyData.id;
        delete copyData.id;
        addUserMenuItem(copyData).then((res) => {
          if (res.data.code == 0) {
            this.getDialogVisible = false;
            this.$Message.success("新增菜单成功");
          }
        });
      }
    },

    change(val) {
      this.$set(this.menuItem, "icon", val);
    },
  },
};
</script>

<style scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

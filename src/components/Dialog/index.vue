<template>
  <div> 
    <el-dialog title="外层 Dialog" :visible.sync="visible" :before-close="handleClose" >
        <slot name="form"></slot>
   </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: fasle,
    },

    formData:{
        type:Object,
        default(){
            return {}
        }
    }
  },

  computed: {
    dialogVisible: {
      set(val) {
        this.$emit("update:visible",val);
      },
      get() {
        return this.visible;
      },
    },

    getFormData:{
        set(keys){
         this.formData={...this.formData,...keys}
        },
        get(){
            return this.formData
        }
    },

  },

  methods:{
      handleClose(){
          this.dialogVisible=false;
      }
  }

};
</script>

<style lang="less" scoped></style>

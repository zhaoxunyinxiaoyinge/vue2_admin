<template>
  <div style="margin-top:20px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"  
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
        
    };
  },
  props:{
      pageSize:{
          type:Number,
          default:10
      },
      page:{
          type:Number,
          default:1
      },
      total:{
          type:Number,
          default:0
      }
  },
  computed:{
      pageSizes:{
        get(){
            return this.pageSize;
        },
        set(val){
            this.$emit("update:pageSize",val)
        }
      },

      pages:{
          set(){
              return this.page;
          },

          set(val){
              this.$emit("update:page",val)
          }
      }
  },

  methods:{

  handleCurrentChange(val){
        this.page=val;
        this.$emit("update",{page:this.page,pageSize:this.pageSize});
  },

  handleSizeChange(val){
      this.pageSize=val;
          this.$emit("update",{page:this.page,pageSize:this.pageSize});
  }
  }



};
</script>

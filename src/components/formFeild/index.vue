<template>
    <div class="form">
        <el-form :model="form" :inline="inline" ref="form" :label-width="labelWidth">
            <el-form-item :key="index" v-for="(item, index) in formField">
                <span slot="label">{{ item.label }}</span>
                <el-select v-model="form[item.field]" v-if="item.type == 'select'" clearable>
                        <el-option v-for="items in item.options" :label="items[item.option_label]" :value="items[item.option_value]">{{items[item.option_label]}}</el-option>
                </el-select>
              <el-input v-model="form[item.field]" v-if="item.type == 'input'" clearable></el-input>
               <el-input clearable type="text" v-model="form[item.field]" v-if="item.type == 'textArea'"></el-input>
                <el-radio v-if="item.type == 'radio'" v-model="form[item.field]" :label="item.label1" ></el-radio>
                <el-checkbox v-if="item.type == 'checkbox'" v-model="form[item.field]" :true-label="item.label1"
                    :false-label="item.label2"></el-checkbox>
                 <el-date-picker
                  v-if="item.type=='daterange'"
                    v-model="form[item.field]"
                    type="daterange"
                    range-separator="至"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                 </el-date-picker>    
                <Upload  :autoUpload="true" @success="handleSuccess" :fileList="fileList"  v-if="item.type=='image'"></Upload>
                <el-button v-if="item.type=='btn'" icon="el-icon-search" @click="handlequery" type="primary">查询</el-button>
                <el-button v-if="item.type=='btn'" icon="el-icon-refresh" @click="handleReset" type="default">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Upload from "components/upload/upload";
export default {
    name: "filed",
    props: {
        formField: {
            type: Array,
            default: () => {
                return []
            }
        },

        labelWidth:{
            type:String,
            default:''
        },
        inline: {
            type: Boolean,
            default: true
        },
        show:{
            type:Boolean,
            default:false
        },
        formData:{
            type:Object,
            default:()=>{
                return {}
            }
        }    
    },

    data() {
        return {
            form: {},
            fileList:[]
        }
    },

    components:{
        Upload
    },

    methods: {
        handlequery(){
            this.$emit("query",this.form)
        },

       handleReset(){
        this.form=this.$options.data().form;
        this.$emit("query",this.form);
       },

       handleSuccess(res){
           this.form.pic=res;
       },

      initData(){
        this.form={...this.formData};
        this.fileList=[];
        if(this.form.pic){
        this.fileList.push({url:this.formData.pic});    
        }
      }
    },


    watch:{
        show:{
            deep:true,
            immediate:true,
            handler(){
              this.form={};
              this.initData(); 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .form {
        padding:20px
    }
</style>

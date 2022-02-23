
<template>
    <svg :class="getSvgClass" v-on="$listeners">
        <use :xlink:href="getclassName"/>
    </svg>
</template>

<script>

export default {
    props:{
        svgClass:{
            type:String,
            default:""
        },
        className:{
            type:String,
            default:"img" 
        }
    },

    computed:{
        getSvgClass(){
            return  `icon-${this.svgClass}`
        } ,

         getclassName(){
              return `#icon-${this.className}`
         } 
    }
}
</script>

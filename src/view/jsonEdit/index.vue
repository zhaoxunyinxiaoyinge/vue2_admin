<template>
    <div>
      <JsonEdit :value="value" />
    </div>
</template>
<script>
import JsonEdit from "@/components/jsonEdit"
export default {
    name:"jsonEdit",
    data(){
        return {
            value:[{"列1":"值1"},{"列2":"值2"},{"列n":"值n"}]
        }
    },
    components:{JsonEdit}
}
</script>

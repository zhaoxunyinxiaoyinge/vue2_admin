<script>
    export default {
        created(){
            let {params,query}=this.$route;
            this.$router.replace({path:"/"+params.path,query});
        },
        activated(){
             let {params,query}=this.$route;
            this.$router.replace({path:"/"+params.path,query});
        },
        render(h){
            return h();
        }
    }
</script>
<script>
export default {
  name: "icon-title",
  data() {
    return {};
  },
  functional: true,
  props: {
    icon: {
      type: String,
      default() {
        return "";
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon.includes("el-icon")) {
      vnodes.push(<i class={[icon, "sub-el-icon"]} />);
    }

    if (title) {
      vnodes.push(<span class="item" slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped lang="scss">

</style>

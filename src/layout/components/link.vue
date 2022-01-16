<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    type() {
      return 'router-link'
    }
  },

  methods: {
    linkProps(to) {
      return {
        to: to
      }
    }
  }
}
</script>

<style scoped lang="css">
    a:link{
      text-decoration: none;
    }
</style>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: { name: { type: String, required: true } },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1.0em;
  height: 1.0em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<template>
  <div class="body">
    <left-main class="left" />
    <right-main class="right hidden-xs-only" />
  </div>
</template>

<script>
import LeftMain from "./left-main/left-main.vue";
import RightMain from "./right-main/right-main.vue";
export default {
  name: "Index",
  components: {
    LeftMain,
    RightMain,
  },
};
LeftMain;
</script>

<style lang="less" scoped>
.body {
  display: flex;
  justify-content: center;
  .left {
    min-width: 440px;
    width: 70%;
  }
}
.right {
  width: 350px;
  padding-left: 10px;
}
</style>
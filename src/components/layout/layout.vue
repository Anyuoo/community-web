<template>
  <el-container>
    <el-header>
      <app-header />
    </el-header>
    <el-main>
      <app-main />
    </el-main>
    <el-footer>
      <app-footer />
    </el-footer>
  </el-container>
</template>

<script>
import AppHeader from "./app-header/app-header";
import AppFooter from "./app-footer/app-footer";
import AppMain from "./app-main/app-main";

export default {
  name: "Layout",
  components: {
    AppHeader,
    AppFooter,
    AppMain,
  },
};
</script>

<style lang="less" scoped>
.el-main{
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.el-header,.el-footer {
padding: 0;
}


</style>


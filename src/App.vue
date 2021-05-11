<template>
  <div>
    <router-view v-if="isRounterAlive"></router-view>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
export default {
  name: "app",
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
    isRounterAlive: true

    }
  },
  methods:{
    reload(){
      this.isRounterAlive = false
      this.$nextTick(function(){
        this.isRounterAlive = true
      })
    }
  }
};
</script>

<!--基本样式引入-->
<style lang="css" src="./assets/css/common.css"></style>

<style>
body {
  background-color: #f5f5f5;
  margin: 0 auto;
  padding: 0;
}
</style>

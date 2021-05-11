<template>
  <div class="upload">
    <el-tabs tab-position="top">
      <el-tab-pane label="视频上传">
        <video-upload></video-upload>
      </el-tab-pane>
      <el-tab-pane label="图片上传">
        <picture-upload></picture-upload>
      </el-tab-pane>
      <el-tab-pane label="专栏写作"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VideoUpload from "./video-upload.vue";
import PictureUpload from "./picture-upload.vue";
export default {
  name: "Upload",
  components: {
    VideoUpload,
    PictureUpload
  },
};
</script>

<style lang="less" scoped>
.upload {
  width: 80%;
  margin: auto;
}
</style>
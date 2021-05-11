<template>
  <div>
    <el-card shadow="always">
      <el-steps :active="stepActive" align-center>
        <el-step title="上传视频" icon="el-icon-video-camera-solid"></el-step>
        <el-step title="上传封面" icon="el-icon-picture"></el-step>
        <el-step title="填写描述" icon="el-icon-edit"></el-step>
        <el-step title="发布" icon="el-icon-upload"></el-step>
      </el-steps>

      <div class="content">
        <!-- 视频上传 start -->
        <el-upload v-if="stepActive == 0" drag action="">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传视频文件，且不超过2G
          </div>
        </el-upload>
        <!-- 视频上传 end -->
        <!-- 封面上传 start -->
        <div v-if="stepActive == 1">
          <el-upload
            class="cover-uploader"
            action="#"
            :show-file-list="false"
            :on-change="coverChange"
            :auto-upload="false"
          >
            <img v-if="dialogImageUrl" :src="dialogImageUrl" class="cover" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="showCoverDialog">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>

        <!-- 封面上传 end -->
        <div>
              <el-button v-if="stepActive !=0" type="success" @click="back">上一步</el-button>
          <el-button v-if="stepActive !=3" type="primary" @click="next">下一步</el-button>
      
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "VideoUpload",
  data() {
    return {
      // 步骤条
      stepActive: 1,
      dialogImageUrl: "",
      // 封面预览
      showCoverDialog: false,
      //封面文件
      cover: null,
      disabled: false,
    };
  },
  methods: {
    // 上一步
    back(){
      if(this.stepActive >0){
        this.stepActive--
      }
    },
    // 下一步
    next(){
  if(this.stepActive <3){
        this.stepActive++
      }
    },
    // 封面更换
    coverChange(file, fileList) {
      this.cover = file;
      this.dialogImageUrl = file.url;
      console.log(file);
      console.log(fileList);
    },
    handleRemove(file) {
      console.log(file);
    },
    handleCoverPreview(file) {
      this.dialogImageUrl = file.url;
      this.showCoverDialog = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.cover {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
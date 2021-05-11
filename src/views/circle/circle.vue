<template>
  <div>
    
    <!--文件上传组件-->
    <el-dialog
      title="上传"
      :visible.sync="dialogFormVisible2"
      :before-close="closeFileUploadDialog"
    >
      <el-form :model="uploadForm">
        <el-form-item>
          <el-upload
            ref="uploadForm"
            action=""
            :multiple="false"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-change="handleFileChange"
            :on-remove="handleRemove"
            :http-request="uploadFile"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFileUploadDialog">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {UploadVideoCover} from '@/graphql/video.gql'
export default {
  name: "Circle",
  components: {},
  data() {
    return {
      file: {},
      fileList: [],
      dialogFormVisible2: false,
      uploadForm: {}
    };
  },
  methods: {
    //上传文件，获取文件流
    handleFileChange(file) {
      console.log(file);
      this.file = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.file = "";
    },
    beforeUpload(file) {
      console.log(file);
    },
    submitUpload() {
      if (this.file != "") {
        this.$refs.uploadForm.submit();
      } else {
        this.$message({
          message: "请先选择文件!",
          type: "warning",
          duration: "2000",
        });
      }
    },
    deleteFile(savedPath) {
      alert(savedPath);
    },
    downloadFile(savedPath) {
      alert(savedPath);
    },
    // 自定义上传
    uploadFile() {
      console.log("uploading"+this.file)

      this.$apollo.mutate({
        mutation: UploadVideoCover,
        variables: {
          cover: this.file
        }
      }).then(promise=>{
        console.log(promise)
      })
    },
    closeFileUploadDialog() {
      this.dialogFormVisible2 = false;
      this.file = "";
      this.fileList = [];
    },
    showFileUpload(type) {
      console.log(type);
      this.dialogFormVisible2 = true;
      this.file = "";
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <el-card shadow="always">
      <div class="picture-upload">
        <el-upload
          action="#"
          list-type="picture-card"
          :limit="10"
          accept="image/*"
          multiple
          :file-list="picList"
          :on-change="handleChange"
          :auto-upload="false"
          :on-exceed="limitTips"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="removePicture(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-upload>

        <el-button
          type="success"
          style="margin-top: 5px"
          @click="uploadPictures"
          >上 传</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { UploadPictures } from "@/graphql/upload.gql";
export default {
  name: "PictureUpload",
  data() {
    return {
      // 图片预览地址
      dialogImageUrl: "",
      // 图片预览窗口可见性
      dialogVisible: false,
      // 图片列表
      picList: [],
    };
  },
  methods: {
    uploadPictures() {
      if (this.picList == null || this.picList.length < 1) {
        this.$message.warning("请需要选择上传图片");
        return;
      }
      console.log(this.picList);
      const loading = this.$loading({
        lock: true,
        text: "拼命上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // 获取文件信息
      const data = this.picList.map((pic) => pic.raw);
      this.$apollo
        .mutate({
          mutation: UploadPictures,
          variables: {
            pictures: data,
          },
        })
        .then((promise) => {
          const result = promise.data.uploadPictures;
          console.log(result);
          if (result) {
            this.$message({
              type: "success",
              message: `上传成功${result.length}张图片`,
            });
            // 资源重置
            this.picList = [];
          } else {
            this.$message.error("上传失败");
          }
          loading.close();
        })
        .catch((error) => {
          this.$message.error(error.message);
          loading.close();
        });
    },
    // 文件数量提示
    limitTips(files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 状态更新
    handleChange(_pic, picList) {
      this.picList = picList;
    },
    //移除图片
    removePicture(file) {
      // this.$confirm(`确定移除 ${file.name}？`);
      this.picList = this.picList.filter((pic) => pic.uid !== file.uid);
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.picture-upload {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
/deep/.el-upload-list__item-thumbnail {
  text-align: center;
}
</style>
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
        <el-upload
          v-if="stepActive == 0"
          accept="video/*"
          :show-file-list="false"
          :http-request="uploadVideo"
          :on-change="handleVideoChange"
          drag
          action=""
        >
          <i class="el-icon-upload"></i>
          <div
            class="el-upload__text"
            v-html="
              videoSuccess
                ? '视频上传成功，<em>点击重新上传</em>'
                : '将文件拖到此处，或<em>点击上传</em>'
            "
          ></div>
          <div class="el-upload__tip" slot="tip">
            只能上传视频文件，且不超过50M
          </div>
        </el-upload>
        <!-- 视频上传 end -->

        <!-- 封面上传 start -->
        <div v-if="stepActive == 1">
          <el-upload
            class="cover-uploader"
            action="#"
            accept="image/*"
            :show-file-list="false"
            :on-change="handleCoverChange"
            :http-request="uploadVideoCover"
          >
            <img
              class="cover"
              v-if="covers.length > 0"
              :src="covers[covers.length - 1].url"
            />
            <i v-else class="el-icon-plus cover-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 封面上传 end -->

        <!-- 视频描述信息 start -->
        <div v-if="stepActive == 2" class="video-desp">
          <el-form
            :model="videoForm"
            status-icon
            :rules="videoRules"
            ref="videoForm"
            label-width="60px"
          >
            <el-form-item label="标题" prop="title">
              <el-input
                clearable
                type="text"
                maxlength="30"
                show-word-limit
                v-model="videoForm.title"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input
                type="textarea"
                :rows="3"
                maxlength="200"
                show-word-limit
                placeholder="请输入内容"
                v-model="videoForm.desc"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover.name">
              <el-select
                filterable
                :filter-method="queryCovers"
                remote
                v-model="videoForm.cover.name"
                placeholder="请选择"
                @change="handleCoverSel"
              >
                <el-option
                  v-for="item in covers"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                  :loading="loading"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="视频" prop="video.name">
              <el-select
                :filter-method="queryVideos"
                filterable
                remote
                v-model="videoForm.video.name"
                @change="handleVideoSel"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in videos"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                  :loading="loading"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- 视频描述信息 end -->

        <div v-if="stepActive == 3" class="video-mock">
          <video-player class="player" :video="videoMock.video"></video-player>
          <div class="video-mock-content">
            <!-- 头像 -->
            <el-avatar
              class="avatar"
              fit="contain"
              :size="40"
              :src="videoMock.avatar"
            />
            <!-- 文字描述 -->
            <div class="video-mock-text">
              <i class="font-base color-base">{{
                videoMock.title.length > 18
                  ? videoMock.title.substring(0, 18) + "..."
                  : videoMock.title
              }}</i>
              <!-- 发帖时间 -->
              <div class="text-bottom">
                <i class="font-small color-base">{{ videoMock.nickname }}</i>

                <time class="time font-extra-small color-gray-a">{{
                  videoMock.createTime
                }}</time>
              </div>
            </div>
          </div>
        </div>

        <!-- 按钮 start -->
        <div class="btn">
          <el-button
            style="margin-left: 10px; margin-right: 10px"
            v-if="stepActive != 0"
            type="primary"
            @click="back"
            >上一步</el-button
          >
          <el-button
            style="margin-left: 10px; margin-right: 10px"
            v-if="stepActive != 3"
            type="success"
            @click="next"
            >下一步</el-button
          >
          <el-button
            style="margin-left: 10px; margin-right: 10px"
            v-if="stepActive === 3"
            type="success"
            @click="pulishVideo"
            >发 布</el-button
          >
        </div>
        <!-- 按钮end -->
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  UploadVideoCover,
  UploadVideo,
  ListRmdVideoCovers,
  ListRmdVideos,
} from "@/graphql/upload.gql";
import VideoPlayer from "@/components/video-player.vue";
import { GetLoginUser } from "@/graphql/user.gql";
import { PublishVideo } from "@/graphql/video.gql";
export default {
  name: "VideoUpload",
  components: {
    VideoPlayer,
  },
  inject: ["reload"],
  data() {
    return {
      // 步骤条
      stepActive: 0,
      dialogImageUrl: "",
      //
      loading: false,

      // 封面预览
      showCoverDialog: false,
      // 上传成功表示
      videoSuccess: false,
      // 上传视频文件
      video: null,
      // 上传封面文件
      cover: null,
      // 视频详情表单
      videoForm: {
        title: "",
        desc: "",
        video: {
          id: "",
          url: "",
          name: "",
        },
        cover: {
          id: "",
          url: "",
          name: "",
        },
      },
      // 视频详情表单验证
      videoRules: {
        title: [
          { required: true, message: "请输入视频标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请输入视频描述信息", trigger: "blur" },
          {
            min: 5,
            max: 200,
            message: "长度在 5 到 200 个字符",
            trigger: "blur",
          },
        ],
        "video.name": [
          { required: true, message: "请选择上传视频", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "请选择上传视频",
            trigger: "blur",
          },
        ],
        "cover.name": [
          { required: true, message: "请选择视频封面", trigger: "blur" },
          {
            min: 5,
            max: 200,
            message: "请选择视频封面",
            trigger: "blur",
          },
        ],
      },
      //已上传video 选择
      videos: [],
      //已上传cover 选择
      covers: [],
      // 发布展示数据信息
      videoMock: {
        video: {
          coverUrl: "",
          videoUrl: "",
        },
        title: "",
        desc: "",
        avatar: "",
        nickname: "",
        createTime: "",
      },
    };
  },
  methods: {
    // 上一步
    back() {
      if (this.stepActive > 0) {
        this.stepActive--;
      }
    },
    // 下一步
    next() {
      // 编辑步骤
      if (this.stepActive < 3) {
        if (this.stepActive === 2) {
          // 表单填写验证
          this.$refs["videoForm"].validate((valid) => {
            if (valid) {
              this.stepActive++;
            } else {
              this.$message.error("视频信息填写错误！");
            }
          });
        } else {
          this.stepActive++;
        }
      }

      // 发布步骤
      if (this.stepActive === 3) {
        this.getLoginUser();
        this.videoMock.createTime = " 2021-05-02 12:00:00";
        this.videoMock.title = this.videoForm.title;
        this.videoMock.video = {
          videoUrl: this.videoForm.video.url,
          coverUrl: this.videoForm.cover.url,
        };
      }
    },
    // 发布视频
    pulishVideo() {
      const loading = this.$loading({
        lock: true,
        text: "拼命上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const form = {
        title: this.videoForm.title,
        desc: this.videoForm.desc,
        videoUrl: this.videoForm.video.url,
        coverUrl: this.videoForm.cover.url,
      };
      this.$apollo
        .mutate({
          mutation: PublishVideo,
          variables: {
            input: form,
          },
        })
        .then((promise) => {
          const result = promise.data.publishVideo;
          if (result === true) {
            this.$message({
              type: "success",
              message: "视频发布成功",
            });

            this.$router.push({ name: "Learn" });
            this.reload();
            window.location.reload();
          } else {
            this.$message.error("视频发布失败");
          }
          loading.close();
        })
        .catch((error) => {
          this.$message.error("视频发布失败" + error.message);
          loading.close();
        });
    },
    //上传视频
    uploadVideo() {
      // 加载
      const loading = this.$loading({
        lock: true,
        text: "拼命上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$apollo
        .mutate({
          mutation: UploadVideo,
          variables: {
            video: this.video,
          },
        })
        .then((promise) => {
          const result = promise.data.uploadVideo;
          if (result) {
            this.$message({
              type: "success",
              message: "视频上传成功",
            });
            //  设置上传状态
            this.videos.push(result);
            // 表单信息
            this.videoForm.video = result;
            this.videoSuccess = true;
          } else {
            this.$message.error("视频上传失败");
          }

          loading.close();
        })
        .catch((error) => {
          this.$message.error(error.message);

          loading.close();
        });
    },
    // 视频处理
    handleVideoChange(file) {
      this.video = file.raw;
    },
    // 封面更换
    handleCoverChange(file) {
      this.cover = file.raw;
    },
    // 上传封面
    uploadVideoCover() {
      const loading = this.$loading({
        lock: true,
        text: "拼命上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$apollo
        .mutate({
          mutation: UploadVideoCover,
          variables: {
            cover: this.cover,
          },
        })
        .then((promise) => {
          const result = promise.data.uploadVideoCover;
          if (result) {
            this.$message({
              type: "success",
              message: "封面上传成功",
            });
            //  设置上传状态
            this.covers.push(result);
            // 表单信息
            this.videoForm.cover = result;
          } else {
            this.$message.error("封面上传失败");
          }

          loading.close();
        })
        .catch((error) => {
          this.$message.error(error.message);
          loading.close();
        });
    },
    // 查询视频推荐
    queryVideos(query) {
      this.loading = true;
      this.$apollo
        .query({
          query: ListRmdVideos,
        })
        .then((promise) => {
          const result = promise.data.listRmdVideos;
          if (result) {
            // 查询
            if (query === "") {
              this.videos = result;
            } else {
              this.videos = result.filter((video) => {
                return (
                  video.name.toLowerCase().indexOf(query.toLowerCase()) > -1
                );
              });
            }
          } else {
            this.$message.error("获取视频数据失败");
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error("获取视频数据失败" + error.message);
          this.loading = false;
        });
    },
    // 查询封面推荐
    queryCovers(query) {
      this.loading = true;
      this.$apollo
        .query({
          query: ListRmdVideoCovers,
        })
        .then((promise) => {
          const result = promise.data.listRmdVideoCovers;
          if (result) {
            // 查询
            if (query === "") {
              this.covers = result;
            } else {
              this.covers = result.filter((cover) => {
                return (
                  cover.name.toLowerCase().indexOf(query.toLowerCase()) > -1
                );
              });
            }
          } else {
            this.$message.error("获取封面数据失败");
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error("获取封面数据失败" + error.message);
          this.loading = false;
        });
    },
    // 处理封面推荐选择
    handleCoverSel(item) {
      console.log(item);
      this.videoForm.cover = item;
      //mock 封面地址
      this.videoMock.video.cover = item.url;
    },
    // 处理视频推荐选择
    handleVideoSel(item) {
      console.log(item);
      this.videoForm.video = item;
      //mock 视频地址
      this.videoMock.video.url = item.url;
    },
    //获取登录用户
    getLoginUser() {
      this.$apollo
        .query({
          query: GetLoginUser,
        })
        .then((promise) => {
          const result = promise.data.loginUser;
          if (result) {
            this.videoMock.nickname = result.nickname;
            this.videoMock.avatar = result.avatar;
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  // height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-steps {
  padding-bottom: 20px;
}
// 视频上传提示
.el-upload__tip {
  text-align: center;
}
// 按钮
.btn {
  padding-top: 30px;
}
// 封面样式 start
.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader:hover {
  border-color: #409eff;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 320px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.cover {
  width: 320px;
  height: 180px;
}
// 封面 end

.video-desp {
  width: 400px;
}

// 发布 start
.video-mock {
  width: 320px;
  height: 230px;
  padding-top: 15px;
  // 播放器
  .player {
    width: 100%;
    height: 190px;
  }
  // 视频描述以及title
  .video-mock-content {
    height: 50px;
    width: 100%;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    .video-mock-text {
      width: 265px;
      padding-left: 5px;
      .text-bottom {
        width: 100%;
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
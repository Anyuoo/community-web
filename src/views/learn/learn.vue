<template>
  <el-tabs v-model="openedTabName">
    <el-tab-pane class="learn" label="视频推荐" name="recommend">
      <el-card
        class="video-item"
        shadow="hover"
        v-for="(video, index) in recommenedVideos"
        :key="index"
      >
        <video-player :video="video.video"></video-player>
        <div class="video-item-text">
          <el-avatar
            class="avatar"
            fit="contain"
            :size="35"
            :src="video.avatar"
          ></el-avatar>
          <div class="content">
            <i class="font-base color-base">{{ video.title }}</i>
            <!-- 发帖时间 -->
            <div class="title">
              <i class="username font-small color-base">{{ video.nickname }}</i>

              <time class="time font-extra-small color-gray-a">{{
                video.createTime
              }}</time>
            </div>
          </div>
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane class="learn" label="热门视频" name="hot">
      <el-card
        class="video-item"
        shadow="hover"
        v-for="(video, index) in hotVideos"
        :key="index"
      >
        <video-player :video="video.video"></video-player>
        <div class="video-item-text">
          <el-avatar
            class="avatar"
            fit="contain"
            :size="35"
            :src="video.avatar"
          ></el-avatar>
          <div class="content">
            <i class="font-base color-base">{{ video.title }}</i>
            <!-- 发帖时间 -->
            <div class="title">
              <i class="username font-small color-base">{{ video.nickname }}</i>

              <time class="time font-extra-small color-gray-a">{{
                video.createTime
              }}</time>
            </div>
          </div>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import VideoPlayer from "@/components/video-player.vue";

export default {
  name: "Learn",
  components: { VideoPlayer },
  data() {
    return {
      openedTabName: "recommend",
      recommenedVideos: [
        {
          video: {
            poster: "",
            url:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          },
          title: "璀璨星河",
          nickname: "anyu",
          avatar:
            "https://ancf.oss-cn-chengdu.aliyuncs.com/avatar/2020/11/10/27c4bf5d.jpg",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52dd6070-aecd-11ea-b43d-2358b31b6ce6.mp4",
          },
          title: "vue 安装与部署",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52f3cea0-aecd-11ea-b997-9918a5dda011.mp4",
          },
          title: "创建第一个vue应用",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52eec590-aecd-11ea-b244-a9f5e5565f30.mp4",
          },
          title: "数据与方法",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52e63a10-aecd-11ea-b43d-2358b31b6ce6.mp4",
          },
          title: "生命周期",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52e72470-aecd-11ea-b997-9918a5dda011.mp4",
          },
          title: "模板语法-插值",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/98c18710-aecd-11ea-b43d-2358b31b6ce6.mp4",
          },
          title: "模板语法-指令",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/4fe81fd0-aece-11ea-b997-9918a5dda011.mp4",
          },
          title: "class与style绑定",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/98bad050-aecd-11ea-b680-7980c8a877b8.mp4",
          },
          title: "条件渲染",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
      ],
      hotVideos: [
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52eec590-aecd-11ea-b244-a9f5e5565f30.mp4",
          },
          title: "数据与方法",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/4fe81fd0-aece-11ea-b997-9918a5dda011.mp4",
          },
          title: "class与style绑定",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
        {
          video: {
            poster: "",
            url:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52e63a10-aecd-11ea-b43d-2358b31b6ce6.mp4",
          },
          title: "生命周期",
          nickname: "vue",
          avatar: "https://cn.vuejs.org/images/logo.png",
          createTime: "2021-3-22 12:24:56",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.el-tabs {
  width: 80%;
  margin: auto;
}
.learn {
  max-height: 800px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.video-item {
  width: 240px;
  height: 185px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  .video-item-text {
    height: 50px;
    display: flex;
    align-items: center;
    .avatar {
      margin-left: 5px;
      margin-right: 5px;
    }
    .content {
      width: 200px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      .time {
        margin-right: 5px;
      }
    }
  }

  //  flex-wrap: wrap;
}
/deep/.el-card__body {
  // width: 320px;
  padding: 0;
}
</style>
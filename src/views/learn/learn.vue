<template>
  <el-tabs v-model="openedTabName">
    <el-tab-pane
      class="learn"
      label="视频推荐"
      name="recommend"
      v-infinite-scroll="rmdLoad"
      infinite-scroll-disabled="rmdDisabled"
      style="overflow: auto"
    >
      <el-card
        class="video-item"
        shadow="hover"
        v-for="(video, index) in recommenedVideos"
        :key="index"
      >
        <video-player :video="video.node"></video-player>
        <div class="video-item-text">
          <el-avatar
            class="avatar"
            fit="contain"
            :size="35"
            :src="video.node.publisher.avatar"
          ></el-avatar>
          <div class="content">
            <i class="font-base color-base">{{ video.node.title }}</i>
            <!-- 发帖时间 -->
            <div class="title">
              <i class="username font-small color-base">{{
                video.node.publisher.nickname
              }}</i>
              <time class="time font-extra-small color-gray-a">{{
                video.node.createTime
              }}</time>
            </div>
          </div>
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane
      class="learn"
      label="热门视频"
      name="hot"
      v-infinite-scroll="hotLoad"
      infinite-scroll-disabled="hotDisabled"
    >
      <el-card
        class="video-item"
        shadow="hover"
        v-for="(video, index) in hotVideos"
        :key="index"
      >
        <video-player :video="video.node"></video-player>
        <div class="video-item-text">
          <el-avatar
            class="avatar"
            fit="contain"
            :size="35"
            :src="video.node.publisher.avatar"
          ></el-avatar>
          <div class="content">
            <i class="font-base color-base">{{ video.node.title }}</i>
            <!-- 发帖时间 -->
            <div class="title">
              <i class="username font-small color-base">{{
                video.node.publisher.nickname
              }}</i>

              <time class="time font-extra-small color-gray-a">{{
                video.node.createTime
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
import { ListVideos } from "@/graphql/video.gql";
export default {
  name: "Learn",
  components: { VideoPlayer },
  data() {
    return {
      openedTabName: "recommend",
      // 推荐
      recommenedVideos: [],
      rmdPageInfo: {},
      // 热门
      hotVideos: [],
      hotPageInfo: {},
    };
  },
  computed: {
    // 推荐停止加载
    rmdDisabled() {
      return this.rmdPageInfo.hasNextPage === false;
    },
    // 推荐停止加载
    hotDisabled() {
      return this.hotPageInfo.hasNextPage === false;
    },
  },
  methods: {
    // 推荐加载
    rmdLoad() {
      this.$apollo
        .query({
          query: ListVideos,
          variables: {
            size: 6,
            after: this.rmdPageInfo.endCursor,
          },
        })
        .then((promise) => {
          const result = promise.data.listVideos;
          console.log(result);
          if (result) {
            this.recommenedVideos.push(...result.edges);
            this.rmdPageInfo = result.pageInfo;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    hotLoad() {
      this.$apollo
        .query({
          query: ListVideos,
          variables: {
            size: 9,
            after: this.hotPageInfo.endCursor,
          },
        })
        .then((promise) => {
          const result = promise.data.listVideos;
          console.log(result);
          if (result) {
            this.hotVideos.push(...result.edges);
            this.hotPageInfo = result.pageInfo;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
}
/deep/.el-card__body {
  // width: 320px;
  padding: 0;
}
</style>
<template>
  <div
    class="post-list"
    infinite-scroll-disabled="disabled"
    v-infinite-scroll="load"
    style="overflow: auto"
  >
    <el-card v-for="(item, index) in posts" :key="index" hadow="hover">
      <!--帖子信息-->
      <div class="list-item">
        <!-- 头像 -->
        <div class="list-item-avatar">
          <el-avatar
            fit="contain"
            :size="40"
            :src="item.node.publisher.avatar"
          ></el-avatar>
        </div>
        <div class="list-item-body">
          <div class="top">
            <!-- title -->
            <el-link
              primary
              @click="goPostPage(item.node.id)"
              :underline="false"
            >
              {{ item.node.title }}</el-link
            >
            <!-- 图标 -->
            <el-tag type="success" size="small" v-if="item.node.type" round
              >顶置</el-tag
            >
            <el-tag type="danger" size="small" v-if="item.node.type === 1" round
              >热门</el-tag
            >
          </div>
          <div class="list-item-bottom">
            <div>
              <!-- 昵称 -->
              <i class="font-base">{{ item.node.publisher.nickname }}</i>
              <!-- 发帖时间 -->
              <time class="time font-extra-small color-gray-a">{{
                item.node.createTime
              }}</time>
            </div>
            <div>
              <a class="font-small tag" @click="doLike(index)">
                <svg-icon :name="item.node.likeStatus ? 'liked' : 'like'" />
                {{ item.node.likeNum }}</a
              >
              <a class="font-small tag" @click="goPostPage(item.node.id)">
                <svg-icon
                  :name="item.node.cmtStatus ? 'commented' : 'comment'"
                />
                {{ item.node.cmtNum }}</a
              >
              <a class="font-small tag" @click="goPostPage(item.node.id)">
                <svg-icon name="look" />
                {{ item.node.lookNum }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Posts, PostLike } from "@/graphql/post.gql";
export default {
  name: "PostList",
  components: {},
  data() {
    return {
      // 帖子信息
      posts: [],
      // 分页信息
      pageInfo: {
        // endCursor: "",
        // startCursor: "",
        // hasNextPage: false,
        // hasPreviousPage: false,
      },
    };
  },
  computed: {
    // 停止加载
    disabled() {
      return this.pageInfo.hasNextPage === false;
    },
  },
  methods: {
    //点赞
    doLike(index) {
      this.$apollo
        .mutate({
          mutation: PostLike,
          variables: { postId: this.posts[index].node.id },
        })
        .then((promise) => {
          let status = promise.data.postLike;
          this.posts[index].node.likeStatus = status;
          if (status) {
            this.posts[index].node.likeNum++;
          } else {
            if (this.posts[index].node.likeNum > 0) {
              this.posts[index].node.likeNum--;
            } else {
              this.posts[index].node.likeNum = 0;
            }
          }
        });
    },
    load() {
      this.$apollo
        .query({
          query: Posts,
          variables: {
            first: 5,
            after: this.pageInfo.endCursor,
          },
        })
        .then((promise) => {
          let data = promise.data.posts;
          console.log(data);
          let edges = data.edges;
          this.posts.push(...edges);
          this.pageInfo = data.pageInfo;
        });
    },

    //跳转帖子
    goPostPage(postId) {
      // 父组件接受
      this.$emit("openPostTab", postId);
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.el-card__body {
  padding: 10px;
}
/deep/.el-card {
  margin-bottom: 1px;
}
.el-tag {
  margin-left: 5px;
}
.post-list {
  height: 700px;
}
.list-item {
  display: flex;
  height: 60px;
  width: 100%;

  .list-item-avatar {
    margin: auto;
    margin-right: 5px;
  }

  .list-item-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;

    .list-item-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      .time {
        margin-left: 5px;
      }
      .tag {
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <div class="item">
    <!-- 头像 -->
    <div class="avatar">
      <el-avatar fit="contain" :size="40" :src="item.avatar"></el-avatar>
    </div>
    <div class="body">
      <div class="top">
        <!-- title -->
        <el-link primary href="https://element.eleme.io" :underline="false">
          {{ item.title }}</el-link
        >
        <!-- 图标 -->
        <el-tag type="success" size="small" v-if="item.order" round
          >顶置</el-tag
        >
        <el-tag type="danger" size="small" v-if="item.type === 1" round
          >热门</el-tag
        >
      </div>
      <div class="bottom">
        <div>
          <!-- 昵称 -->
          <i class="font-base">{{ item.nickname }}</i>
          <!-- 发帖时间 -->
          <time class="time font-extra-small color-gray-a">{{
            item.createTime
          }}</time>
        </div>
        <div>
          <a class="font-small tag"  @click="doLike">
            <svg-icon
              :iconname="item.likeStatus ? 'icon-liked' : 'icon-like'"
            />
            {{ item.likeNum > 0 ? item.likeNum : 0 }}</a
          >
          <a class="font-small tag" @click="doComment">
            <svg-icon
              :iconname="item.cmtStatus ? 'icon-commented' : 'icon-comment'"
            />
            {{ item.cmtNum > 0 ? item.cmtNum : 0 }}</a
          >
          <i class="font-small tag">
            <svg-icon iconname="icon-look" />
            100</i
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostListItem",
  props: { post: { type: Object } },
  data() {
    return {
      item: {
        // #帖子ID
        id: Number,
        //
        avatar: String,
        // #用户昵称
        nickname: String,
        // #帖子标题
        title: String,
        // #评论数量
        cmtNum: Number,

        // #帖子的点赞数量
        likeNum: Number,
        //
        cmtStatus: Boolean,
        // #帖子的点赞状态
        likeStatus: Boolean,
        type: Number,
        order: Boolean,
        // #帖子创建时间
        createTime: String,
      },
    };
  },
  created() {
    this.item = this.post;
  },
  methods:{
    //点赞
    doLike(){
      //
      this.item.likeStatus = !this.item.likeStatus
    },
    //评论
    doComment(){

    }
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-left: 5px;
}

.item {
  display: flex;
  height: 60px;
  width: 100%;
  .avatar {
    margin: auto;
    margin-right: 5px;
  }

  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;

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
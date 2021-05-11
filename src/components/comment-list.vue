<template>
  <div>
    <!-- 评论列表 start-->
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <ul>
      <li class="cmt-item" v-for="(i, index) in 3" :key="index">
        <div class="cmt-avatar">
          <el-avatar fit="contain" :src="avatar" :size="40" />
        </div>
        <div class="cmt-item-content">
          <!-- cmt top start -->
          <div class="cmt-item-top">
            <i class="font-base"> username</i>
            <i class="font-title">#{{ index + 1 }}</i>
          </div>
          <!-- cmt top end -->
          <!-- cmt content start -->
          <i class="font-small">pinglun</i>
          <!-- cmt footer start -->
          <div class="cmt-item-bottom">
            <div>
              <span class="font-extra-small color-gray-a"
                >发表于 <time>2021-18-08 10:34:37</time></span
              >
            </div>
            <div>
              <i class="font-small tag">
                <svg-icon name="like" />
                66
              </i>
              <i class="font-small tag">
                <svg-icon name="comment" />
                66
              </i>
            </div>
          </div>
          <!-- cmt footer end -->
          <!-- 回复start -->
          <div class="reply-list">
            <ul>
              <li class="reply-item" v-for="(i, index) in 2" :key="index">
                <!-- 评论回复 -->
                <span v-if="i==1">
                  <i class="font-small">userA</i>
                  <i class="font-small">: HELLO</i>
                </span>
                <!-- 评论回复的回复 -->
                <span v-if="i==2 ">
                  <i class="font-small">userA</i>
                  <i class="font-extra-small  color-base"> 回复 </i>
                  <i class="font-small">userB</i>
                  <i class="font-small"
                    >:但是八法时间不放假部分节哀顺变事发后不发表
                    dfjah</i
                  >
                </span>

                <div class="cmt-item-bottom">
                  <div>
                    <time class="font-extra-small color-gray-a"
                      >2021-11-08 10:34:37</time
                    >
                  </div>
                  <div>
                    <i class="font-small tag">
                      <svg-icon name="like" />
                      66</i
                    >
                    <i class="font-small tag">
                      <svg-icon name="comment" />
                      66</i
                    >
                  </div>
                </div>
              </li>
            </ul>
            <!-- 回复输入框 -->
            <el-input size="mini" placeholder="说点什么呢"></el-input>
          </div>
          <!-- 回复end -->
        </div>
      </li>
    </ul>
    <!-- 评论列表 end-->
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="10" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  data() {
    return {
      avatar: "",
      cmtList: [
        {
          content: "hello",
          replyList: [
            { from: "a", content: "" },
            { from: "b", content: "bbb" },
            { from: "c", content: "ccc" },
          ],
        },
        {
          content: "hello",
          replyList: [
            { from: "a", content: "aaa" },
            { from: "b", content: "bbb" },
            { from: "c", content: "ccc" },
          ],
        },
        {
          content: "hello",
          replyList: [
            { from: "a", content: "aaa" },
            { from: "b", content: "bbb" },
            { from: "c", content: "ccc" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
ul {
  padding-inline-start: 0;
}
.tag {
  padding-left: 10px;
}
// 评论列
.cmt-item {
  display: flex;
  margin-top: 10px;

  //头像
  .cmt-avatar {
    margin-right: 10px;
  }
  //评论内容
  .cmt-item-content {
    width: 100%;
    flex-direction: column;
    //评论昵称
    .cmt-item-top {
      display: flex;
      justify-content: space-between;
    }
    //评论时间点赞
    .cmt-item-bottom {
      display: flex;
      justify-content: space-between;
    }
  }
}
//回复
.reply-list {
  background-color: #dee1e6;
  border-radius: 5px;
  .reply-item {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    // border-bottom: 1px solid ;
  }
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
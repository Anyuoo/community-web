<template>
  <div class="content">
    <!-- 帖子内容 start -->
    <el-tabs editale v-model="editTabName" @tab-click="handlePostTabClick" @tab-remove="removePostTab">
      <!-- 帖子列表 start-->
      <el-tab-pane label="帖 子" name="index">
        <el-card>
          <div class="post-sentence">
            <i class="front-base">落霞与孤鹜齐飞，秋水共长天一色。</i>
            <!--发帖-->
            <el-button 
            v-if="isLogin"
            type="text" 
            @click="dialogVisible = true"
              >发帖子</el-button
            >
          </div>
        </el-card>
        <!--    帖子列表展示  -->
        <post-list @openPostTab="addPostTab"></post-list>
      </el-tab-pane>
      <!--帖子列表 end-->

      <!--帖子详情 start-->
      <el-tab-pane
        v-for="(post, index) in postTabs"
        :key="index"
        :name="post.id"
        :label="post.title.substring(0,8)"
        :closable="true"
      >
        <el-card shadow="always">
          <span slot="header">
            <i class="font-title">{{ post.title }}</i>
          </span>
          <!-- 帖子内容markdown -->
          <markdown-it-vue :content="post.content" />
          <!-- 帖子评论列表 -->
          <comment-list></comment-list>
        </el-card>
      </el-tab-pane>
      <!--帖子详情 end-->
    </el-tabs>
    <!-- 帖子内容 end -->

    <!--帖子编辑弹窗 start-->
    <el-dialog title="帖子编辑" :visible.sync="dialogVisible" width="60%">
      <el-form ref="postContent" :model="postContent">
        <el-form-item prop="title">
          <el-input
            v-model="postContent.title"
            name="title"
            placeholder="帖子标题"
            v-if="!mdMode"
          />
          <i v-if="mdMode" class="font-title">{{ postContent.title }}</i>
        </el-form-item>
        <!-- 输入框 -->
        <el-form-item>
          <el-input
            type="textarea"
            :autosize="{ minRows: 20, maxRows: 50 }"
            placeholder="快来发布一个帖子"
            show-word-limit
            maxlength="30000"
            v-model="postContent.content"
            v-if="!mdMode"
          />
          <!-- 帖子编辑markdown start-->

          <markdown-it-vue
            :content="postContent.content"
            @render-complete="hdlCmplete"
            v-if="mdMode"
          />
          <!-- 帖子编辑markdown end-->
        </el-form-item>
      </el-form>

      <!-- 按钮 start-->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="mdMode = !mdMode">
          {{ mdMode ? "编 辑" : "预 览" }}
        </el-button>
        <el-button type="primary" @click="publishPost">发 布</el-button>
      </span>
      <!-- 按钮 end-->
    </el-dialog>
    <!-- 帖子编辑弹窗 end -->
  </div>
</template>

<script lang="js" src="./_left-main.js"></script>

<style lang="less" scoped>
// 每日一句，发布帖子
.post-sentence {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
// 分页居中
.pagination {
  display: flex;
  justify-content: center;
}
/deep/.el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
/deep/.el-dialog__footer {
  padding-top: 0;
}
</style>

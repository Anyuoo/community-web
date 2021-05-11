<template>
  <div>
    <el-dialog custom-class=“msg-dialog” :visible.sync="chartDialogVisible" width="450px" center>
      <span slot="title">
        <i class="font-small">来自</i>
        <i class="font-base">master </i>
      </span>
      <el-card shadow="always" :body-style="{ height: '450px' }">
        <!-- 消息渲染 start-->
        <div v-infinite-scroll v-for="(msg, index) in messages" :key="index">
          <div class="msg-receiver" v-if="msg.fromId === '2'">
            <el-avatar fit="contain" :size="30" :src="fromAvatar" />
            <div class="font-small">{{ msg.content }}</div>
          </div>

          <div class="msg-sender" v-if="msg.fromId === '1'">
            <div class="font-small">{{ msg.content }}</div>
            <el-avatar fit="contain" :size="30" :src="toAvatar" />
          </div>
        </div>
        <!-- 消息渲染 end-->
      </el-card>

      <div slot="footer" class="dialog-footer">
        <el-input class="msg-input" v-model="msgContent" name="msg"></el-input>
        <el-button class="el-icon-s-promotion" type="primary" @click="chartDialogVisible = false"
          >发 送</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MsgChartDialog",
  props: {
    chartId: { tpye: Number, required: true },
    visible: { tpye: Number, required: true },
  },
  data() {
    return {
      //聊天对话窗口
      chartDialogVisible: false,
      cid: "",
      // 消息发送
      msgContent: "",
      fromAvatar: "", 
      toAvatar: "", 
      // 接受消息
      messages: [
        { fromId: "1", toId: "2", content: "你好" },
        { fromId: "2", toId: "1", content: "你是谁？" },
        { fromId: "1", toId: "2", content: "我是小黑" },
        { fromId: "2", toId: "1", content: "？？？" },
      ],
    };
  },
  created() {},
  watch: {
    chartId(val) {
      this.cid = val;
    },
    //   展开对话
    visible(val) {
      this.chartDialogVisible = val > 0;
    },
  },
};
</script>

<style lang="less" scoped>
.msg-dialog /deep/.el-dialog__header  {
  padding: 0 !important;
}

.msg-dialog /deep/.el-dialog__body {
  padding: 0 !important;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  .msg-input {
    margin-right: 5px;
  }
}
// 消息发送者样式
.msg-sender {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .el-avatar {
    margin-left: 5px;
  }
}
// 消息接受者样式
.msg-receiver {
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 5px;
  }
}
</style>
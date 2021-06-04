<template>
  <div>
    <el-menu menu-trigger="hover" mode="horizontal" :router="true">
      <!-- 左边导航 -->
      <div class="left-nav">
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/discovery">发现</el-menu-item>
        <el-menu-item index="/circle">圈子</el-menu-item>
        <el-menu-item index="/learn">学习</el-menu-item>
      </div>
      <!-- 搜索框 -->
      <div>
        <el-input
          v-model="search"
          class="search-input hidden-sm-and-down"
          placeholder="搜点什么呢"
          size="small"
          type="text"
        >
          <el-button
            slot="suffix"
            class="search-btn"
            icon="el-icon-search"
            size="small"
          ></el-button>
        </el-input>
      </div>

      <!-- 右边导航 -->
      <div class="right-nav">
        <!-- 注册 -->
        <el-menu-item index="/register" v-cloak v-if="loginUser == null"
          >注册</el-menu-item
        >
        <!-- 登录 -->
        <el-menu-item index="/login" v-cloak v-if="loginUser == null"
          >登录</el-menu-item
        >
        <!-- 投稿 -->
        <el-menu-item index="/upload" v-if="loginUser != null" v-cloak>
          投稿
        </el-menu-item>
        <!-- 消息控件方法 -->
        <el-menu-item @click="showMsgDrawer" v-if="loginUser != null" v-cloak>
          消息
          <el-badge is-dot />
        </el-menu-item>
        <!-- 头像下拉框 -->
        <el-menu-item v-if="loginUser != null" v-cloak>
          <el-dropdown trigger="click" placement="bottom">
            <div class="avatar-wrapper">
              <el-avatar
                fit="contain"
                :size="40"
                :src="loginUser == null ? '' : loginUser.avatar"
              ></el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <el-link :underline="false" @click="goUserProfile"
                  >个人主页</el-link
                >
              </el-dropdown-item>

              <el-dropdown-item divided>
                <el-link :underline="false" @click="goResourcePage"
                  >我的资源</el-link
                >
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span style="display: block" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </div>
    </el-menu>
    <!-- 消息中心抽屉 -->
    <msg-drawer :showMsgDrawer="show" />
  </div>
</template>

<script>
import { onLogout } from "@/vue-apollo";
import MsgDrawer from "../../msg-drawer";
import { GetLoginUser } from "@/graphql/user.gql";
export default {
  name: "AppHeader",
  components: { MsgDrawer },
  data() {
    return {
      // 登录用户信息
      loginUser: {},
      search: "",
      // 窗口动态显示值 show > 0
      show: 0,
    };
  },
  created() {
    this.getLoginUser();
  },

  methods: {
    // 注销登录
    logout() {
      onLogout(this.$apolloProvider.defaultClient);
      this.loginUser = null;
      this.$router.push({ path: this.redirect || "/" });
    },
    //获取登录用户
    getLoginUser() {
      this.$apollo
        .query({
          query: GetLoginUser,
        })
        .then((promise) => {
          this.loginUser = promise.data.loginUser;
        });
    },
    // 显示消息弹窗
    showMsgDrawer() {
      return this.show++;
    },
    //跳转用户信息页
    goUserProfile() {
      this.$router.push({
        name: "UserProfile",
        params: { account: this.loginUser.account },
      });
    },
    // 投稿
    goUploadPage() {
      this.$router.push({
        name: "VideoUpload",
      });
    },
    // 资源页
    goResourcePage() {
      this.$router.push({
        name: "Resource",
      });
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .is-active {
  color: #1c88cf;
  font-weight: bolder;
  border-bottom-color: #fff;
}
.el-menu-item:hover {
  font-weight: bolder;
}
.el-menu-item:focus {
  background: #fff !important;
  color: #1c88cf !important;
  font-weight: bolder;
}

.el-menu {
  height: 56px;
  display: flex;
  justify-content: space-around;

  .left-nav,
  .right-nav {
    display: flex;
    justify-content: space-between;
  }
  .el-menu-item {
    width: 80px;
    font-size: 16px;
    background-color: #fff !important;
  }

  .search-input {
    line-height: 56px;
    width: 200px;
    .search-btn {
      border: 0;
    }
  }
  .avatar-wrapper {
    padding-bottom: 15px;
  }
}
// 显隐设置
[v-cloak] {
  display: none;
}
</style>

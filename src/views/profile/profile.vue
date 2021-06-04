<template>
  <div class="user-profile">
    <el-page-header @back="goBack" content="个人主页" />
    <el-card :body-style="{}">
      <el-tabs
        tab-position="left "
        v-model="currentTabName"
        style="height: 100%"
        @tab-click="chooseTab"
      >
        <el-tab-pane label="个人信息" name="userInfo">
          <div class="user-info">
            <!-- 头像 -->
            <div class="user-info-avatar" @click="avatarToggleShow">
              <el-tooltip
                content="点击修改头像"
                placement="bottom"
                effect="light"
              >
                <el-avatar
                  fit="contain"
                  :size="80"
                  :src="userInfo.avatar"
                ></el-avatar>
              </el-tooltip>
            </div>
            <!-- 头像编辑 -->
            <image-upload
              field="img"
              @crop-success="cropAvatarSuccess"
              v-model="showAvatarEdit"
              :width="300"
              :height="300"
              img-format="png"
            ></image-upload>
            <div class="user-info-item">
              <i class="color-base">昵称：</i
              ><i class="color-normal">{{ userInfo.nickname }}</i>
            </div>

            <div class="user-info-item">
              <i class="color-base">账号：</i
              ><i class="color-normal">{{ userInfo.account }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base">邮箱：</i
              ><i class="color-normal">{{ userInfo.email }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base">电话：</i
              ><i class="color-normal">{{ userInfo.mobile }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base">性别：</i
              ><i class="color-normal">{{
                userInfo.gender === "MALE" ? "男" : "女"
              }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base">真实姓名：</i
              ><i class="color-normal">{{ userInfo.realName }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base">出生日期：</i
              ><i class="color-normal">{{ userInfo.birthday }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base">注册时间：</i
              ><i class="color-normal">{{ userInfo.createTime }}</i>
            </div>
            <div class="user-info-item">
              <i class="color-base"
                >获赞数：
                <el-link type="primary" :underline="false">12</el-link>
              </i>
              <i class="color-base"
                >关注者：
                <el-link type="primary" :underline="false">45</el-link></i
              >
              <i class="color-base"
                >关注了：
                <el-link type="primary" :underline="false">78</el-link></i
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="userUpdate">
          <el-form
            label-width="80px"
            :model="userInfoForm"
            ref="userInfoForm"
            :rules="userInfoFormRules"
          >
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="userInfoForm.nickname"></el-input>
            </el-form-item>

            <el-form-item label="账号" prop="account">
              <el-input v-model="userInfoForm.account">
                <template slot="append">@ancf</template></el-input
              >
            </el-form-item>
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="userInfoForm.realName"></el-input>
            </el-form-item>

            <el-form-item label="出生日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="userInfoForm.birthday"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="性别">
              <el-radio-group v-model="userInfoForm.gender">
                <el-radio label="MALE">男</el-radio>
                <el-radio label="FEMALE">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitUserInfoForm('userInfoForm')"
                >确认修改</el-button
              >
            </el-form-item>
          </el-form></el-tab-pane
        >
        <el-tab-pane class="security" label="安全中心" name="security">
          <!-- 登录手机 start -->
          <div class="sec-item">
            <h3>登录手机</h3>
            <el-divider></el-divider>
            <el-form
              ref="mobileForm"
              :model="mobileForm"
              label-width="80px"
              :rules="mobileFormRules"
            >
              <el-form-item label="原手机号"
                ><b>{{ userInfo.mobile }}</b></el-form-item
              >
              <!--emial-->
              <el-form-item label="新手机号" prop="mobile">
                <el-input
                  v-model="mobileForm.mobile"
                  placeholder="请输入新手机号码"
                  type="text"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input
                  v-model="mobileForm.code"
                  name="code"
                  placeholder="请输入验证码"
                >
                  <el-button
                    slot="append"
                    type="primary"
                    @click="sendMobileCode()"
                    >获取验证码</el-button
                  >
                </el-input>
              </el-form-item>
              <div class="ack-btn">
                <el-button
                  type="primary"
                  @click="submitMobileForm('mobileForm')"
                  >确认修改</el-button
                >
              </div>
            </el-form>
          </div>
          <!-- 登录手机号 end -->
          <!-- 绑定邮箱 start -->
          <div class="sec-item">
            <h3>绑定邮箱</h3>
            <el-divider></el-divider>
            <el-form
              ref="emailForm"
              :model="emailForm"
              label-width="80px"
              :rules="emailFormRules"
            >
              <el-form-item label="原邮箱"
                ><b class="font-base">{{ userInfo.email }}</b></el-form-item
              >
              <!--emial-->
              <el-form-item label="新邮箱" prop="email">
                <el-input
                  v-model="emailForm.email"
                  name="email"
                  placeholder="请输入邮箱"
                  type="text"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input
                  v-model="emailForm.code"
                  name="code"
                  placeholder="请输入验证码"
                >
                  <el-button
                    slot="append"
                    type="primary"
                    @click="sendEmailCode()"
                    >获取验证码</el-button
                  >
                </el-input>
              </el-form-item>
              <div class="ack-btn">
                <el-button type="primary" @click="submitEmailForm('emailForm')"
                  >确认修改</el-button
                >
              </div>
            </el-form>
          </div>
          <!-- 绑定邮箱 end -->
          <!-- 登录密码 start -->
          <div class="sec-item">
            <h3>登录密码</h3>
            <el-divider></el-divider>
            <el-form
              ref="passForm"
              :model="passForm"
              label-width="80px"
              :rules="passFormRules"
            >
              <el-form-item label="新密码" prop="pass">
                <el-input
                  v-model="passForm.pass"
                  name="pass"
                  show-password
                  type="text"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  v-model="passForm.checkPass"
                  name="checkPass"
                  type="text"
                  show-password
                >
                </el-input>
              </el-form-item>
              <div class="ack-btn">
                <el-button type="primary" @click="submitPassForm('passForm')"
                  >确认修改</el-button
                >
              </div>
            </el-form>
          </div>
          <!-- 登录密码 end -->
        </el-tab-pane>
        <el-tab-pane label="我的收藏"></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="js" src="./_profile.js"></script>

<style lang="less" scoped>
.user-profile {
  margin: auto;
  width: 80%;
  min-width: 650px;
  display: flex;
  flex-direction: column;
  .el-page-header {
    margin-left: 20px;
    margin-bottom: 10px;
  }
}
.setting-box {
  height: 500px;
  width: 500px;
  background-color: cornsilk;
  border-radius: 6px;
  margin: 0 auto;
  padding: 30px auto;
}
.el-page-header {
  margin-left: 50px;
  margin-bottom: 10px;
}

.el-tab-pane {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-divider {
  margin-top: 10px;
}

//个人信息
.user-info {
  width: 40%;
  min-width: 300px;
  display: flex;
  flex-direction: column;

  .user-info-avatar {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
  .user-info-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
}
.avatar-uploader {
  display: flex;
  justify-content: center;
}
//安全中心
.security {
  .sec-item {
    min-width: 400px;
    margin-bottom: 15px;
  }
}
//确认按钮
.ack-btn {
  display: flex;
  justify-content: center;
}
</style>

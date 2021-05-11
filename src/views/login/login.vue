<template>
  <div class="login">
    <div class="content">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        auto-complete="on"
        class="login-form"
      >
        <h3 class="title">An Community Forum</h3>
        <el-form-item prop="principal">
          <el-input
            v-model="loginForm.principal"
            name="principal"
            placeholder="请输入邮箱或手机号"
            type="text"
            prefix-icon="el-icon-s-custom"
          />
        </el-form-item>
        <!--password-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            name="password"
            placeholder="请输入密码"
            show-password
          >
            <svg-icon slot="prefix" name="password" />
          </el-input>
        </el-form-item>
        <!--验证码-->
        <div class="verify-code">
          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              name="code"
              placeholder="请输入验证码"
            />
          </el-form-item>
          <identify-code :changeCode.sync="code"></identify-code>
        </div>

        <el-form-item>
          <el-button
            :loading="loading"
            @click="login('loginForm')"
            type="primary"
            style="width: 250px"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div>
        未注册AnCF账号？
        <el-button type="text" @click="goRegisterPage">立即注册</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="js" src="./_login.js"></script>

<style lang="less" scoped src="./_login.less"></style>

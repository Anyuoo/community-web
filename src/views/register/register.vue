<template>
  <div class="register">
    <div class="register-body">
      <div class="title">
        <h1>An Community Forum</h1>
      </div>
      <div class="content">
        <div class="info-section"></div>
        <div class="input-section">
          <div>
            <el-form
              ref="registerForm"
              :model="registerForm"
              label-width="80px"
              :rules="formRules"
            >
              <!--emial-->
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="registerForm.email"
                  name="email"
                  placeholder="请输入邮箱"
                  type="text"
                >
                  <el-select
                    v-model="registerForm.emailType"
                    slot="append"
                    placeholder="@qq.com"
                  >
                    <el-option label="@qq.com" value="@qq.com" />
                    <el-option label="@gmail.com" value="@gmail.com" />
                  </el-select>
                </el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item label="验证码" prop="code">
                <el-input
                  v-model="registerForm.code"
                  name="code"
                  placeholder="请输入验证码"
                >
                  <el-button slot="append" type="primary" @click="getCode()"
                    >获取验证码</el-button
                  >
                </el-input>
              </el-form-item>
              <!--password-->
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="registerForm.password"
                  name="password"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
              <!--checkPassword-->
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input
                  class="ack-btn"
                  v-model="registerForm.checkPassword"
                  name="checkPassword"
                  placeholder="请输入确认密码"
                  show-password
                />
              </el-form-item>
              <el-button
                :loading="loading"
                @click="register('registerForm')"
                type="primary"
                style="width: 300px; margin-left: 30px"
              >
                立即注册
              </el-button>
            </el-form>
          </div>
          <div>
            已有AnCF账号？<el-button type="text" @click="goLoginPage"
              >立即登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" src="./_register.js"></script>

<style lang="less" scoped src="./_register.less"></style>

<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img
        class="logo"
        src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
        alt=""
      />
      <h2 class="title">图书管理系统后台</h2>
    </div>
    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input placeholder="用户名" v-model:value="loginForm.account">
           <template v-slot:prefix>
              <UserOutlined />
            </template>
         </a-input>
            
          </div>
          <div class="item"><a-input placeholder="密码" v-model:value="loginForm.password">
           <template v-slot:prefix>
             <LockOutlined />
            </template>
          </a-input>
          </div>
          <div class="item"><a href="">忘记密码</a></div>
          <div class="item"><a-button type="primary" @click="login">登录</a-button></div>
        </a-tab-pane>

        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input placeholder="账户" v-model:value="regForm.account">
            <template v-slot:prefix>
              <UserOutlined />
            </template>
         </a-input>   
      
          </div>
          <div class="item"><a-input placeholder="密码" v-model:value="regForm.password">
           <template v-slot:prefix>
             <LockOutlined />
            </template>
          </a-input>
          </div>
          <div class="item"><a-input placeholder="邀请码" v-model:value="regForm.inviteCode">
           <template v-slot:prefix>
             <MailOutlined />
            </template>
          </a-input></div>

          <div class="item"><a-button @click="register" type="primary">注册</a-button></div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

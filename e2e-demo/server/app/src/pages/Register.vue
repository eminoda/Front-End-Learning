<template>
  <div>
    <van-nav-bar
      title="注册 Register"
      right-text="登录"
      @click-right="$router.push('/login')"
    />
    <van-form>
      <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="user.telephone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="user.sms"
        name="短信验证码"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            class="smsBtn"
            size="small"
            :disabled="!canSend"
            type="primary"
            @click="sendCode"
            >{{ smsText }}</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          class="t-register-btn"
          round
          block
          type="info"
          @click="onSubmit"
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        telephone: '',
        password: '',
        sms: ''
      },
      timer: 10,//60,
      canSend: true,
      smsText: '发送验证码'
    }
  },
  methods: {
    onClickRight() {
      this.$router.push('/login')
    },
    sendCode() {
      this.canSend = false
      if (this.timer == 0) {
        this.canSend = true
        this.timer = 10
        this.smsText = '发送验证码'
        return;
      }
      setTimeout(() => {
        this.timer--
        this.smsText = `${this.timer}`
        this.sendCode()
      }, 1 * 1000)
    },
    onSubmit() {
      document.cookie = `token=abcdefg`    
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.smsBtn {
  width: 100px;
}
</style>
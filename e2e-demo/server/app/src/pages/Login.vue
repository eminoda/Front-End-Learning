<template>
  <div>
    <van-nav-bar
      title="登录 Login"
      right-text="注册"
      @click-right="$router.push('/register')"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    onClickRight() {
      this.$router.push('/login')
    },
    onSubmit() {
      setTimeout(() => {
        if (this.user.username == '前端雨爸' && this.user.password == '123456') {
          this.$router.push('/')
        } else {
          Dialog({ message: '用户名 or 密码错误' });
        }
      }, 1 * 1000)
    }
  }
}
</script>

<style>
</style>
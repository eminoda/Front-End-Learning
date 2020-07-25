<template>
  <div>
    <van-nav-bar
      title="首页 Home"
      right-text="登录"
      left-arrow
      @click-right="onClickRight"
      @click-left="$router.back(-1)"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onClickRight() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
module.exports = {
  // '@disabled': true,
  'login page loaded test': function (browser) {
    // 跳转页面
    browser.url('http://127.0.0.1:8080/#/login').waitForElementVisible('body');
    // 验证页面
    browser.expect.element('.van-nav-bar__title.van-ellipsis').text.to.equal('登录 Login');
  },
  'login successed test': function (browser) {
    // 输入用户名，密码
    browser.setValue('form [name="用户名"]', '前端雨爸').setValue('form [name="密码"]', '123456').click('form [type="submit"]');
    // 等待接口请求
    browser.pause(1 * 1000);
    // 判断登录成功后，跳转首页
    browser.expect.element('.van-nav-bar__title.van-ellipsis').text.to.equal('首页 Home');
  },
  'login failed test': function (browser) {
    // 跳转页面
    browser.url('http://127.0.0.1:8080/#/login').waitForElementVisible('body');
    // 输入用户名，密码
    browser.setValue('form [name="用户名"]', 'eminoda').setValue('form [name="密码"]', '54321').click('form [type="submit"]');
    // 等待接口请求
    browser.pause(1 * 1000);
    // 校验错误信息
    browser.expect.element('[role="dialog"] .van-dialog__message').text.to.equal('用户名 or 密码错误');
  },
};

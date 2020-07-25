const dbService = {
  findTokenByTelephone(telephone) {
    return 'abcdefg';
  },
  findSmsCodeByTelephone(telephone) {
    return '1234';
  },
};

module.exports = {
  'register page loaded test': function (browser) {
    browser.url('http://127.0.0.1:8080/#/register').waitForElementVisible('body');
    browser.expect.element('.van-nav-bar__title.van-ellipsis').text.to.equal('注册 Register');
  },
  'send smsCode successed test': function (browser) {
    browser
      .setValue('form [name="用户名"]', '前端雨爸')
      .setValue('form [name="手机号"]', '18700000000')
      .setValue('form [name="密码"]', '123456')
      .click('form .smsBtn');
    browser;
    browser
      .pause(1 * 1000)
      .expect.element('form .smsBtn')
      .to.have.attribute('disabled');
  },
  //   'send smsCode reset test': function (browser) {
  //     browser
  //       .pause(11 * 1000)
  //       .expect.element('form .smsBtn')
  //       .to.not.have.attribute('disabled');
  //   },
  'register successed test': function (browser) {
    const telephone = '18700000000';
    // 输入用户名，密码
    browser
      .setValue('form [name="用户名"]', '')
      .setValue('form [name="手机号"]', '')
      .setValue('form [name="密码"]', '')
      .setValue('form [name="用户名"]', '前端雨爸')
      .setValue('form [name="手机号"]', telephone)
      .setValue('form [name="密码"]', '123456')
      .setValue('form [name="短信验证码"]', dbService.findSmsCodeByTelephone(telephone))
      .click('form .t-register-btn');
    browser.pause(1 * 1000);
    browser.expect.element('.van-nav-bar__title.van-ellipsis').text.to.equal('首页 Home');
    browser.expect.cookie('token', '127.0.0.1').to.equal('abcdefg');
  },
};

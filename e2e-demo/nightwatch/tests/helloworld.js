module.exports = {
  '@disabled': true,
  'Demo test baidu.com': function (browser) {
    browser
      .url('https://www.baidu.com/')
      .waitForElementVisible('body')
      .assert.titleContains('百度一下，你就知道')
      .assert.visible('#kw')
      .setValue('#kw', '前端雨爸')
      .assert.visible('input[type=submit]')
      .click('input[type=submit]')
      .end();
  },
};

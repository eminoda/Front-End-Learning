## 测试用例快速入门

每个测试用例文件都是一个简单的对象字面量对象，其值接受一个 browser 浏览器对象，我们能类似 jquery 通过链式进行逻辑判断和执行。

### browser 方法

- 访问链接

  ```js
  browser.url('http://www.baidu.com');
  ```

- 等待元素出现

  ```js
  browser.waitForElementVisible('body');
  ```

- 将值设置到指定输入框

  ```js
  browser.setValue('input[type=search]', 'nightwatch');
  ```

- 点击事件

  ```js
  browser.click('button[type=submit]');
  ```

- 结束

  ```js
  browser.end();
  ```

### assert 断言判断

- 页面 title 标签是否包含某内容

  ```js
  .assert.titleContains('Ecosia')
  ```

- 页面是否出现某标签内容

  ```js
  .assert.visible('input[type=search]')
  ```

- 某标签是否存在指定文本

  ```js
  .assert.containsText('.mainline-results', 'Nightwatch.js')
  ```

### BDD(Behavior Driven Development) 行为驱动开发

- 设置浏览器能力

  ```
  this.desiredCapabilities = {};
  ```

- Enable this if the current test is a unit/integration test (i.e. no Webdriver session will be created)

  ```js
  // this.unitTest = false
  ```

- Set this to false if you'd like the browser window to be kept open in case of a failure or error (useful for debugging)

  ```js
  this.endSessionOnFail = true;
  ```

- Set this to false if you'd like the rest of the test cases/test steps to be executed in the event of an assertion failure/error

  ```js
  this.skipTestcasesOnFail = true;
  ```

- Set this to true if you'd like this test suite to be skipped by the test runner

  ```js
  this.disabled = false;
  ```

- 延迟执行

  ```js
  this.timeout(1000);
  ```

- 定时重复执行

  ```js
  this.retryInterval(100);
  ```

- how many time to retry a failed testcase inside this test suite

  ```js
  this.retries(3);
  ```

- how many times to retry the current test suite in case of an assertion failure or error

  ```js
  this.suiteRetries(2);
  ```

- 生命周期

  ```js
  before(function (browser) {
    this.homepage = browser.page.home();
  });
  //...
  after((browser) => browser.end());
  ```

- 普通测试用例

  ```js
  test('startHomepage', () => {
    this.homepage.navigate();
    this.homepage.expect.section('@indexContainer').to.be.not.visible;
  });
  ```

- 指定用例执行

  ```js
  test.only('startHomepage', () => {
    this.homepage.navigate();
  });
  ```

- skipped testcase: equivalent to: test.skip(), it.skip(), and xit()

  ```js
  xtest('async testcase', async (browser) => {
    const result = await browser.getText('#navigation');
    console.log('result', result.value);
  });

  test('version dropdown is enabled', (browser) => {
    const navigation = this.homepage.section.navigation;
    const navbarHeader = navigation.section.navbarHeader;

    navbarHeader.expect.element('@versionDropdown').to.be.enabled;
  });
  ```

## selectors 选择器方式

- XPath

  ```js
  browser
    .useXpath() // every selector now must be xpath
    .click("//tr[@data-recordid]/span[text()='Search Text']");
  ```

- Css

  ```js
  browser
    .useCss() // we're back to CSS now
    .setValue('input[type=text]', 'nightwatch');
  ```

### 针对 browser 的断言

```js
// expect element <body> to be present in 1000ms
browser.expect.element('body').to.be.present.before(1000);

// expect element <#lst-ib> to have css property 'display'
browser.expect.element('#lst-ib').to.have.css('display');

// expect element <body> to have attribute 'class' which contains text 'vasq'
browser.expect.element('body').to.have.attribute('class').which.contains('vasq');

// expect element <#lst-ib> to be an input tag
browser.expect.element('#lst-ib').to.be.an('input');

// expect element <#lst-ib> to be visible
browser.expect.element('#lst-ib').to.be.visible;

browser.end();
```

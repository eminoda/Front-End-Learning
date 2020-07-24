## Cannot find module 'geckodriver'

问题描述：

```
Error: An error occurred while trying to start the Nightwatch Runner: Cannot find module 'geckodriver'
```

解决方案：

- 配置文件设置 geckodriver 驱动，但没有 npm install
- 驱动配置错误，其实可能需要 chromedriver
  ```js
  webdriver: {
   start_process: true,
   port: 9090,
   server_path: require('chromedriver').path,
   cli_args: [],
  },
  ```

## Invalid port

```
Error: GeckoDriver process exited with code: 1
   Invalid port. Exiting...
```

这可能不是端口冲突，我尝试在已有启动的端口开启服务，但依旧有效。

最后通过修改浏览器配置项：

```js
desiredCapabilities: {
   browserName: 'chrome', // firefox
},
```

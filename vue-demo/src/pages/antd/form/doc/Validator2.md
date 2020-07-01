## 废话有些多，后来我发现一个更简单的办法

将 v-decorator 指令的定义“写活”：

```js
buildDecorator(id, options) {
    const formValues = this.form2.getFieldsValue()
    if (id == 'username') {
    options.rules[0].required = !formValues.email
    }
    if (id == 'email') {
    options.rules[0].required = !formValues.username
    }
    return [id, options]
}
```

每当数据更新时触发指令调用 buildDecorator 方法，内部实时获取 form 表单值，动态修改规则，从而达到上述效果。

另外，这样还会有这样几个好处：

- 代码可以实现更多场景（比如：结合 form 相关 api，实现表单值的联动、适应更多复杂的业务校验规则）
- label 左侧的 \* 号也变成动态化
- 不用再维护 validateFields 回调方法中的 fieldNames 属性

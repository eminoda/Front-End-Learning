## 表单动态规则校验

通过表单 a-form 组件自带的 v-decorator 指令，可以很方便的实现表单项的校验，以及 change 事件监听。

```html
<a-form-item>
  <a-input v-decorator="formItems.username.decorator" />
</a-form-item>
```

```js
// vue data
this.formItems.username = [
  'username',
  {
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
];
```

但是可能会遇到表单内，有部分表单项 **二选一** 的校验情况。比如：下面的表单注册示例（用户名 or 邮箱只提交一项即可）

这时，就需要当用户输入用户名后，移除邮箱的校验；反之，输入邮箱时，移除用户名校验。同时，如果两者都输入时，又需要保持对应的校验逻辑。

那怎么实现呢？下面说下相关细节：

#### 1. 怎么收集表单值？

使用 validateFields 方法，其内部的回调中 values 对象就是当前表单所有输入的值：

```js
this.form.validateFields((err, values) => {
  if (!err) {
    this.$message.info('提交成功');
  }
});
```

#### 2. 如何收集指定表单项？

上面这方法相比都用过，但它有个细节，可以在回调方法的第一个参数列表中添加 **fieldNames** 数组属性，用来自定义哪些字段需要校验并收集。

```js
Function([fieldNames: string[]], [options: object], callback: Function(errors, values))
```

```js
this.form.validateFields(this.formFields, (err, values) => {
  //...
});
```

#### 3. 最后如何动态化？

即：修改 A，B 非必填，修改 B，A 非必填。

创建表单对象时，设置 onValuesChange 表单值监听属性事件：

```js
this.$form.createForm(this, { onValuesChange: this.onValuesChange });
```

在 onValuesChange 事件中按照逻辑，动态更新 formFields 字段，最后将 formFields 传给 validateFields 即可：

```js
// 监听表单字段值的更新
onValuesChange(props, value, values) {
    const formFields = this.initFormFields();
    // 根据字段逻辑，移除对应字段校验
    if (values.username && !values.email) {
        props.form.resetFields(['email']);
        formFields.splice(formFields.indexOf('email'), 1)
    } else if (!values.username && values.email) {
        props.form.resetFields(['username']);
        formFields.splice(formFields.indexOf('username'), 1)
    }
    this.formFields = formFields;
}
```


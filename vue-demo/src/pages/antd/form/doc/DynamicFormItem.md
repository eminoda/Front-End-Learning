## 动态表单

复杂的后端管理系统，逃不掉表单项的动态增减，结合 Antd 就会有这几个问题：

- 怎么在已经写好的 Form 表单中，增添新的表单元素？
- 怎么友好的添加新表单字段？甚至是一批字段？
- 这些字段怎么纳入原先的 validate 校验体系？

我参考官网的 **[动态增减表单项-示例](https://www.antdv.com/components/form-cn/)** ，再“绞尽脑汁”准备了还算过得去的 demo。

下面看下效果图，同时我会做简单的说明：

![示例](./dynamic-demo.gif)

### 如何动态添加元素？

往页面上添加元素到是不难，现在前端框架都是基于数据驱动的。

所以只要维护一个（数组）变量（例中为：dynamicGroup），然后根据修改逻辑，往这个数组中增减元素，最后通过 v-for 动态渲染出对应的表单标签即可。

```html
<!-- 每个 a-row 就是相同一组的元素；a-col 展示不同字段 -->
<a-row v-for="(dynamicFields, index) of dynamicGroup" :key="index">
  <a-col>
    <!-- form-item 字段1-->
  </a-col>
  <a-col>
    <!-- form-item 字段2-->
  </a-col>
</a-row>
```

### 怎么友好添加新的表单字段？

在 dynamicGroup 动态元素集合中，我放的是“一批”动态的字段 dynamicFields（也是数组类型）。

```js
// data
{
    dynamicGroup: [],
    dynamicFields: [
    {
        fieldName: 'username',
        //...
    },
    {
        fieldName: 'nickname',
        //...
    }
}
```

然后在对应的添加逻辑中，直接将预设的 dynamicFields 规则作为新元素放到 dynamicGroup 中：

```js
addDynamicGroup() {
    this.dynamicGroup.push(this.dynamicFields)
}
```

如果你每次添加的操作中，包含一批字段就可以维护在 dynamicFields 中，如果只有一个字段，就维护一个数组就行。

然后每个 dynamicFields 元素，可以维护 \<a-form-item> 常用的属性（比如：label、placeholder...）

```js
{
    fieldName: 'username',
    label: '用户名',
    placeholder: '请输入用户名',
}
```

### 怎么和表单校验联动处理？

你应该注意到：我在 dynamicFields 中的每个字段对象中定义了一个 decorator function 方法（而非 key-value）

```js
{
    fieldName: 'username',
    label: '用户名',
    placeholder: '请输入用户名',
    // 有意为之
    decorator(key) {
        return [key, {
            rules: [{
            required: true,
            message: '请输入用户名'
            }]
        }]
    }
}
```

原因就是，每批增加的表单项“们”都是相互独立的，而验证需要交给 v-decorator 实现，而这个指令需要接受一个“唯一值”：id，所以这里将 key 动态化。

这样最后 form 的验证就能根据不同的 key 进行独一无二的校验。

```html
<a-input :placeholder="item.placeholder" v-decorator="item.decorator(`tree[${index}][${item.fieldName}]`)" />
```

注意到，因为每次成批添加，每批包含多个字段。所以这个 key 需要符合复杂对象的定义形式（antd 会帮我们解析到 form values）：

```js
`tree[${index}].${item.fieldName}`;
```

**友情提示**，一个数组结构内包含一个复杂对象采用上述结构，如果你用了如下形式是回显不了值的：

```js
`tree[${index}][${item.fieldName}]`; //我是在实际开发中被坑了好久才醒悟的

// 然后又在项目里写下了如此代码（目前还没时间删掉 --||）
for (let i = 0; i < tree.length; i++) {
  const item = tree[i];
  for (let key in item) {
    self.form.setFieldsValue({
      [`tree[${i}][${key}]`]: item[key],
    });
  }
}
```

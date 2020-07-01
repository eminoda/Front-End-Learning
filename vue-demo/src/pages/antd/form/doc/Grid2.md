### 不含 label 的表单项

我们会在 form 上设置统一的 label-col，wrapper-col：

```html
<a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 5 }">
  <!-- 表单内容 -->
</a-form>
```

但可能某单个表单项的 label 不需要设置，导致布局错乱（表单项会往左侧置顶）。

我们可以针对不含 label 的 **\<a-form-item>** 单独设置布局属性，不同的是需要设置 offset 偏移量：

```html
<a-form-item :wrapper-col="{ span: 3, offset: 3 }">
  <!-- 表单内容 -->
</a-form-item>
```

对比如下示例：

# 原生js弹窗(模态框)插件封装

## 例子
可以去example文件夹下查看例子
[例子的gitPage地址](https://mtt3366.github.io/image-lazy-load-plugin/example/index.html)
## 博客说明原理
[插件组件封装系列：图片懒加载的插件封装](https://juejin.cn/post/6988026736382312485/)
## 使用
引入：
```html
<script src="dist/LazyImage.min.js"></script>
```
也支持commonjs和es6module规范

在需要加载的 ` img ` 标签上添加 ` 'lazy-image' ` （默认，可自行修改）属性。然后将 ` img ` 标签的 ` opacity ` 设置为`0`，可根据需要添加默认的占位符。执行这个方法 ` LazyImage() ` 就可以把页面中需要延迟加载的图片做延迟加载。

支持自定义配置：

+  ` context ` ： ` document `  指定上下文
+  ` attr ` ： ` 'lazy-image' `  具备哪个属性的 ` img ` 需要做延迟加载（属性值是真实图片地址）
+  ` threshold ` ： ` 1 ` 何时出现在视口中再出发加载 ` 1 ` 代表完全， ` 0 ` 代表刚出现
+  ` speed ` ： ` 300 `  出现真实图片动画的过渡时间
+  ` callback ` ： ` Function.prototype `  图片加载成功后触发的回调函数

支持的方法：
+  ` refresh() ` ：对所有新加入的图片进行重新的懒加载设置

例如：

```js
const lz = LazyImage({
    threshold:0.5,
    context:box
});
//新加入图片dom后
lz.refresh()
```

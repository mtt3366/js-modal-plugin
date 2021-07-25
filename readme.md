# 原生js弹窗(模态框)插件封装
使用原生js实现一个可在生产环境使用的模态框插件

## 例子
示例在代码仓库的example文件夹下，[点此查看示例-gitPage](https://mtt3366.github.io/js-modal-plugin/example/index.html)
## 博客说明原理
[插件组件封装系列：ModalPlugin插件封装-juejin](https://juejin.cn/post/6988941752556060686/)
## 使用

引入：
```html
<link rel="stylesheet" href="css/modalplugin.css">
<script src="dist/modalplugin.min.js"></script>
```
也支持commonjs和es6module规范

使用：
```js

M({
    title: '登录管理系统',
    template: `<div class="box">
        <div class="from">
            <span>用户名：</span>
            <input type="text" id="username">
        </div>
        <div class="from">
            <span>密码：</span>
            <input type="password" id="userpass">
        </div>
    </div>`,
    buttons: [{
        text: 'cancle',
        click(self) {
            self.close();
        }
    }, {
        text: 'confirm',
        click(self) {
            let username = document.querySelector('#username'),
                userpass = document.querySelector('#userpass');
            console.log(username.value, userpass.value);
            self.close();
        }
    }],
});
```
```js
let m2 = M({
    template: `我们今天实现了插件组件封装`,
    buttons: [{
        text: '确定',
        click(self) {
            self.close();
        }
    }],
    // 周期函数「回调函数：用户需要处理的事情都要写在两个回调函数中」
    onopen: self => {
        console.log('已经打开', self);
    },
    onclose() {
        console.log('已经关闭', this);
    },
    drag: true
});
//周期函数「发布订阅：可以灵活的给某一个事件订阅自己想要执行的方法，可以是多个，也可以在其他的位置」
m2.ondragstart.on(self => {
    console.log('拖拽开始1', self);
});
m2.ondragstart.on(self => {
    console.log('拖拽开始2', self);
});
m2.ondraging.on(self => {
    console.log('拖拽中...');
});
m2.ondragend.on(self => {
    console.log('拖拽结束');
});
```
###  api

插件支持的配置信息（基于不同的配置信息，实现不同的功能）：
- ` title[string] ` 标题
- ` template[string] `  自定义的内容或者模板（基于ES6的模板字符串，拼接更丰富的内容结构）
- ` buttons[array] `  自定义按钮（组）
  ` [{text:'确定',click:[callback]},...] `
- ` modal[boolean] `  控制遮罩层是否显示 默认是 ` true `
- ` drag[boolean] `  是否允许拖拽 默认是 ` true `
- ` onopen[function] `  打开
- ` onclose[function] `  关闭

拖拽的生命周期函数（当前操作的某个节点上，允许用户自定义处理的事情）
（发布订阅）
- 拖拽开始  ` ondragstart `
- 拖拽中  ` ondraging `
- 拖拽结束  ` ondragend `
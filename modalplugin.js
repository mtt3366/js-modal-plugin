(function () {
    //封装插件的时候,需要支持很多配置项,有的配置项不传递有默认值,此时我们千万不要一个个定义形参,用对象的方式传形参,好处是可以不穿,而且可以不用考虑顺序
    function ModalPlugin(options) {
        return new init(options)
    }
//想使用创建对象的方式创建实例new ModalPlugin()或当做普通函数执行也能创建实例ModalPlugin(),需要这样做
    ModalPlugin.prototype = {
        constructor: ModalPlugin
    }

    function init(options) {
        //接下来将所有的操作全部写在init里面
        //参数初始化:传递进来的配置项替换默认的配置项
        options = Object.assign({
            title:'系统提示',
            template:null,
            frag:true,
            buttons:[{
                text:'确定',
                click(){
                }
            }]
        },options)

    }
    init.prototype = ModalPlugin.prototype;
    // 浏览器直接导入,这样的方法是暴露到全局的
    window.ModalPlugin = ModalPlugin;
    //如果还需要支持ES6Module/CommonJS模块导入规范,在react项目当中,vue项目当中也想用
    if (typeof module !== 'undefined' && module.exports !== 'undefined') {//如果module不存在,typeof不会出错,会返回undefined
        module.exports = ModalPlugin;//CommonJS规范,只有在webpack环境下才支持
    }
})()

//使用:
ModalPlugin({
    //提示的标题信息
    title:'系统提示',
    //内容模板 字符串 /模板字符串/DOM元素对象
    template:null,
    //是否开启拖拽
    frag:true,
    //自定义按钮信息
    buttons:[{
        //按钮文字
        text:'确定',
        click(){
            //this:当前实例
        }
    }]
})


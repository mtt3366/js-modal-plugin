(function () {
    function ModalPlugin() {
        return new init()
    }
//想使用创建对象的方式创建实例new ModalPlugin()或当做普通函数执行也能创建实例ModalPlugin(),需要这样做

    //类的原型: 公共的属性方法
    ModalPlugin.prototype = {
        constructor: ModalPlugin
    }

    function init() {}
    init.prototype = ModalPlugin.prototype;
    // 浏览器直接导入,这样的方法是暴露到全局的
    window.ModalPlugin = ModalPlugin;
    //如果还需要支持ES6Module/CommonJS模块导入规范,在react项目当中,vue项目当中也想用
    if (typeof module !== 'undefined' && module.exports !== 'undefined') {//如果module不存在,typeof不会出错,会返回undefined
        module.exports = ModalPlugin;//CommonJS规范,只有在webpack环境下才支持
    }
})()

//使用:


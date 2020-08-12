(function () {
    function ModalPlugin() {

    }

    window.ModalPlugin = ModalPlugin;
    //如果还需要支持ES6Module/CommonJS模块导入规范,在react项目当中,vue项目当中也想用
    if (typeof module !== 'undefined' && module.exports !== 'undefined') {//如果module不存在,typeof不会出错,会返回undefined
        module.exports = ModalPlugin;//CommonJS规范,只有在webpack环境下才支持
    }
})()

//使用:


(function () {
    //封装插件的时候,需要支持很多配置项,有的配置项不传递有默认值,此时我们千万不要一个个定义形参,用对象的方式传形参,好处是可以不穿,而且可以不用考虑顺序
    function ModalPlugin(options) {
        return new init(options)
    }

//想使用创建对象的方式创建实例new ModalPlugin()或当做普通函数执行也能创建实例ModalPlugin(),需要这样做
    ModalPlugin.prototype = {
        constructor: ModalPlugin,
        //相当于大脑,可以控制先干什么在干什么(命令模式)
        init() {
            this.creatDom()
        },
        //创建DOM结构
        creatDom() {
            let {title, template, button} = this.options
            //如果用creatElement插入DOM,每一次动态插入,都会导致DOM的回流,非常消耗性能,所以最外面使用createElement创建,内部使用字符串的方式拼写进去,创建好了之后放到最外层的容器当中,只引起一次回流
            let frag = document.createDocumentFragment()
            let dpnDialog = document.createElement('div')
            dpnDialog.className = 'dpn-dialog'
            dpnDialog.innerHTML = `
              <div class="dpn-title">
                ${title}
                <i class="dpn-close"></i>
              </div>
              <div class="dpn-content">
                ${template}
              </div>
              ${button.length > 0
                ? `<div class="dpn-handle">
                      ${button.map((item,index) => {
                    return `<button index="${index}">${item.text}</button>`
                }).join('')}
                   </div>`
                : ''
            }
              `
            frag.appendChild(dpnDialog)

            let dpnModel = document.createElement('div')
            dpnModel.className = 'dpn-model'
            frag.appendChild(dpnModel)
            document.body.appendChild(frag)//使用frag只需要往页面中插入一次,减少回流次数
            frag = null

            this.dpnDialog = dpnDialog//挂载到实例上,便于其他方法的控制隐藏,并且是私有的实例,
            this.dpnModel = dpnModel
        },

    }

    function init(options) {
        //接下来将所有的操作全部写在init里面
        //参数初始化:传递进来的配置项替换默认的配置项
        options = Object.assign({
            title: '系统提示',
            template: null,
            frag: true,
            buttons: [{}]
        }, options)
        //把信息挂载到实例上: 在原型的各个方法中,只要this是实例,都可以调用到这些信息
        this.options = options;
        this.init()
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
    title: '系统提示',
    //内容模板 字符串 /模板字符串/DOM元素对象
    template: null,
    //是否开启拖拽
    frag: true,
    //自定义按钮信息
    buttons: [{
        //按钮文字
        text: '确定',
        click() {
            //this:当前实例
        }
    }]
})


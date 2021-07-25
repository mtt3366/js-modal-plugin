/*
 * 插件支持的配置信息(基于不同的配置信息，实现不同的功能)： 
 *    + title[string] 标题
 *    + template[string] 自定义的内容或者模板(基于ES6的模板字符串,拼接更丰富的内容结构)
 *    + buttons[array] 自定义按钮(组)
 *      [{text:'确定',click:[callback]},...]
 *    + modal[boolean] 控制遮罩层是否显示 默认是true
 *    + drag[boolean] 是否允许拖拽 默认是true
 *    + onopen[function] 打开
 *    + onclose[function] 关闭
 * 拖拽的生命周期函数「当前操作的某个节点上，允许用户自定义处理的事情」
 *   「发布订阅」
 *    + 拖拽开始 ondragstart
 *    + 拖拽中 ondraging
 *    + 拖拽结束 ondragend
 */
import utils from './lib/utils';

function ModalPlugin(config) {

}
ModalPlugin.prototype = {
    version: '1.0.0',
    constructor: ModalPlugin
};

/* 暴露API */
// 定义每一个接口的规则
const props = {
    title: {
        type: 'string',
        default: '系统温馨提示'
    },
    template: {
        type: 'string',
        required: true
    },
    buttons: {
        type: 'array',
        default: []
    },
    modal: {
        type: 'boolean',
        default: true
    },
    drag: {
        type: 'boolean',
        default: true
    },
    onopen: {
        type: 'function',
        default: () => {}
    },
    onclose: {
        type: 'function',
        default: () => {}
    }
};
const proxyModal = function proxyModal(options) {
    //判断传入的options是否是对象,
    !options || typeof options !=='object' ? options = {} : null;
    // init params
    let config = {};

    //遍历规则,处理参数
    for (const key in props) {
        const rule = props[key]
        let optValue = options[key], //传入的参数
            {
                type,
                default: defaultValue,
                required
            } = rule;
        // options没有传递key这一项：验证是否为必传 && 取参数默认值
        if (typeof optValue === "undefined") {
            if (required) throw new TypeError(`${key} must be required!`);
            config[key] = defaultValue;
            return;
        }
        // options有传递key这一项：验证值的格式 && 取传递进来的值「扩展：对象深度合并」
        if (utils.toType(optValue) !== type) throw new TypeError(`${key} must be an ${type}!`);
        config[key] = utils.merge(defaultValue, optValue);
    }
    return new ModalPlugin(config);
};
if (typeof window !== "undefined") {
    window.M = window.ModalPlugin = proxyModal;
}
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = proxyModal;
}
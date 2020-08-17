!function(){
//使用:
    const modal1 = ModalPlugin({
        //提示的标题信息
        title: '系统提示',
        //内容模板 字符串 /模板字符串/DOM元素对象
        template: null,
        //自定义按钮信息
        buttons: [{
            //按钮文字
            text: '确定了',
            click() {
                //this:当前实例
                this.close()
            }
        }, {
            //按钮文字
            text: '取消',
            click() {
                //this:当前实例
                this.close()
            },

        }]
    })
    modal1.on('open',()=>{
        console.log('我被打开了1')
    })
    modal1.on('open',()=>{
        console.log('我被打开了2')
    })
    modal1.on('close',()=>{
        console.log('我被关闭了')
    })
    modal1.open()
}()

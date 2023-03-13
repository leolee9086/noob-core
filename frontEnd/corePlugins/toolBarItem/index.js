import {Plugin,kernelApi,frontEndApi} from 'siyuan'

export default class toolBarItem extends Plugin{
    constructor(){
        super()
        this.设置接口()
        this.注册自带按钮()
    }
    注册自带按钮(){
        this.注册顶栏按钮('left',{
            图标:"#iconRefresh",
            提示:"刷新界面",
            点击回调函数:()=>{
                this.reload()
            }
        })
    }
    设置接口(){
        this.设置插件接口函数(
            {
                "中文名":"注册顶栏按钮",
                "英文名":"registToolBarItem",
                "功能":"在窗口顶栏增加一个按钮",
                "参数":{
                    位置:"控制按钮出现在窗口的哪一侧",
                    配置:{
                        文字或者label:"按钮的文字提示",
                        图标或icon:"按钮显示的图标,可以通过注册图标接口添加可用的图标",
                    }
                },
                "返回值":"没有返回值",
                "其他":"注册的顶栏按钮会在插件被关闭时移除",
          
            },
            (...args)=>{frontEndApi.layout.customToolBar.registItem(...args)}
        )
    }
    reload(){
        //这里是无法使用window.location.reload()的,这只会让插件失效而无法让主界面重载。
        //只能通过frontEndApi来重新加载。
        //在桌面环境下，这样做会让所有界面重新载入
        frontEndApi.reload()
    }
    onunload(){
        this.清理注册项()
    }
}
import { noob核心后端服务端口号,获取可用端口号,写入端口记录 } from "./util/port.js";
import {wss} from  "./util/ws.js"
import { addEventBridge } from "./eventBridge/serverSide.js";
import EventBridge from "./eventBridge/index.js";
import { 显示状态消息 } from "./../util/statusWrap.js";
import { requireDep,noobCorePath } from "./util/requirePolyfill.js";
import {loadCoreServicies} from '../serviciesHandler/index.js'
let express = requireDep('express')
//这一段是创建一个服务器用于后端服务
//下面这个服务器在工作空间服务端口号+1上启动。
//只有在electron环境下才会工作
let app = express()
let noobServer
let promiseListen = ()=>{
    return new Promise((resolve, reject) => {
        try{
            noobServer= app.listen(
            noob核心后端服务端口号,()=>{
                console.log(`noob事件服务在${noob核心后端服务端口号}上已启动`)
                resolve('true')
            }
        )
        }catch(e){
            reject(e)
        }
    })
}
await promiseListen()
wss(noobServer)
addEventBridge(noobServer)
let 主窗口事件桥 = new EventBridge("noobMain","noobMain")
主窗口事件桥.on("status__msg",(data)=>{
    显示状态消息(data.msg)
})
主窗口事件桥.handler("time",(data)=>{
    return  new Date().getTime()
})
主窗口事件桥.handler("port",async(data)=>{
    let 端口记录名= data.msg
    if(!端口记录名){return ''}
    
    let 端口号= await 获取可用端口号()
    await 写入端口记录(端口记录名,端口号)
    return  端口号
})
显示状态消息('noob事件服务器就绪')
显示状态消息(`noob服务功能可用,安装位置为${noobCorePath},开始加载服务`)
let apiPath=require('path').join(window.siyuan.config.system.workspaceDir,"data/snippets/noobcore/frontEnd/noobApi/util/kernelApi.js")
app.use('/kernelApi',express.static(apiPath))
await loadCoreServicies(app)
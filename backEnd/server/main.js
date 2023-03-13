import { coreDir } from "../../file/noobFile.js";
import { noob核心后端服务端口号 } from "./util/port.js";
import {wss} from  "./util/ws.js"
import { addEventBridge } from "./eventBridge/serverSide.js";
import EventBridge from "./eventBridge/index.js";
import { 显示状态消息 } from "./status/index.js";
let path = require('path')
let requireDep =(name)=> require(path.join(coreDir,'node_modules',name))
let express = requireDep('express')
//这一段是创建一个服务器用于后端服务
//下面这个服务器在工作空间服务端口号+1上启动。
//只有在electron环境下才会工作
let app = express()
let noobServer = app.listen(
    noob核心后端服务端口号,()=>{
        console.log(`noob核心服务在${noob核心后端服务端口号}上已启动`)
    }
)
wss(noobServer)
addEventBridge(noobServer)
let 主窗口事件桥 = new EventBridge("noobMain")
主窗口事件桥.on("status__msg",(data)=>{
    显示状态消息(data.msg)
})

主窗口事件桥.handler("time",(data)=>{
    return  new Date().getTime()
})
显示状态消息('noob事件服务器就绪')
显示状态消息('noob服务功能可用,开始加载服务')
import { coreDir } from '../../file/noobURL.js'
import { Service } from './serviceWindow.js'
import { requireDep } from '../server/util/requirePolyfill.js'
import { noob核心后端服务端口号, 思源核心服务端口号 } from '../server/util/port.js'
import { clear } from './clear.js'
import { noobCorePath } from '../server/util/requirePolyfill.js'
clear()
let fs=require('fs')
let path = require('path')
let express = requireDep('express')
export let loadCoreServicies =async (app)=>{
    console.log('开始加载核心服务')
    let 核心服务文件夹 =require('path').join(noobCorePath,'backEnd','coreServicies')
    let 核心服务列表 = fs.readdirSync(核心服务文件夹)
    for  (let i=0,len=核心服务列表.length;i<len;i++){
        console.log(`正在加载核心服务${核心服务列表[i]}`)
        let 服务文件夹 = require('path').join(核心服务文件夹,核心服务列表[i])
        console.log(服务文件夹)
        app.use(
            `/service/${核心服务列表[i]}`,
            express.static(服务文件夹+'/')
        )
        let id = 核心服务列表[i]
        let options={
            id,
            URL:window.location.origin.replace(思源核心服务端口号,noob核心后端服务端口号)+`/service/${核心服务列表[i]}/`,
            path:path.join(核心服务文件夹,核心服务列表[i]),
            frame:true,
            TimeOut:5000,
            stayAlive:true,
            corePath:noobCorePath
        }
        await Service.New(options)
    }
}
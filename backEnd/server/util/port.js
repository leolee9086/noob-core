import { portPath } from '../../../file/noobFile.js'
import { readJsonSync } from './json.js'
export async function 获取可用端口号(端口号){
    return new Promise((resolve, reject) => {
        let http = require('http')
        let 测试服务 = http.createServer()
        let 可用端口号 = 端口号||3000
        测试服务.on(
            'listening',()=>{
                测试服务.close(()=>{
                    resolve(可用端口号)
                })
                
            }
        )
        测试服务.on(
            'error',async(error)=>{
                if(error.code==='EADDRINUSE'){
                    resolve(await 获取可用端口号(可用端口号+1))
                }
                else{
                    reject(error)
                }
            }
        )
        测试服务.listen(端口号)
    })
}
export function 写入端口记录(记录名,端口号){
    let 端口记录文件名 = portPath
    let json = readJsonSync(端口记录文件名)
    json[记录名]=端口号
    require('fs').writeFileSync(端口记录文件名,JSON.stringify(json,undefined,2),'utf-8')
}
export let 思源核心服务端口号 = window.location.port

export let noob核心后端服务端口号 = await 获取可用端口号(parseInt(window.location.port)+1)

export let noob依赖服务端口号 = noob核心后端服务端口号+1
export function 初始化端口文件(){
    写入端口记录('noob核心后端服务端口号',noob核心后端服务端口号)
    写入端口记录('思源核心服务端口号',思源核心服务端口号)
    写入端口记录('noob依赖服务端口号',noob依赖服务端口号)
}
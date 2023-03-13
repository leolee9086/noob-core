import { requireDep } from '../../server/util/requirePolyfill.js'
let 插件注册表 = []
let path = require('path')
let fs = require('fs')
export function 扫描所有插件位置(文件夹配置){
    文件夹配置.forEach(
        文件夹项目=>{
            扫描插件文件夹(文件夹项目.路径,文件夹项目.插件分组)
        }
    )
}
export function 扫描插件文件夹(文件夹,插件分组){
    let 文件列表 = require('fs').readdirSync(文件夹)
    文件列表.forEach(
        路径名=>{
            if(判断是否插件(文件夹,路径名)){
                if(!插件注册表.find(item=>{
                    item.插件名 ===路径名
                })){
                    插件注册表.push({
                        插件名:路径名,
                        插件分组:插件分组,
                        依赖插件组:[],
                        插件路径:path.join(文件夹,路径名)
                    })
                }
            }
        }
    )
}
export function 判断是否插件(文件夹,路径名){
    return(fs.existsSync(path.join(文件夹,路径名,'plugin.json')))
}
export function 排序插件(){
    插件注册表= 插件注册表.sort(
        (a,b)=>{
            return a.依赖插件组.indexOf(b.插件名)?1:-1
        }
    )
}
export function 伺服插件(app){
    let router = requireDep("express").Router()
    插件注册表.forEach(
        插件配置=>{
        router.get(`/plugins/${插件配置.插件路径}`,require('express').static(插件配置.插件路径))
        }
    )
}

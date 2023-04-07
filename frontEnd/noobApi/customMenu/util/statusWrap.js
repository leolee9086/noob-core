let uiStatusURL =import.meta.resolve('../../status/index.js')

if(import.meta.url.indexOf('esm.sh')){
    uiStatusURL='https://esm.sh/siyuan-noob/status/index.js'
}
let module = await import(uiStatusURL)
let 界面状态 = module.界面状态
export {界面状态 as 界面状态 }
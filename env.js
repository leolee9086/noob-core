import { readDir } from "./frontEnd/polyfills/fs"
import { currentThemeURL } from "./file/siyuanURL"
//判断是否代码片段文件夹中有noob的核心存在
let isInTheme=await(async () => {
    let themeRes = await readDir(currentThemeURL)
    if(!themeRes.indexOf('nooocore')){
        return false
    }else{
        let noobres = await readDir(currentThemeURL+'noobcore')
        if(!noobres.indexOf('index.js')){
            return true
        }
    }

})
export let noobenv={
    isInTheme
}
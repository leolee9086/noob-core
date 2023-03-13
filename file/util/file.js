import { coreDir } from '../noobFile.js'
let requireDep =(name)=> require(require('path').join(coreDir,'node_modules',name))
export async function  initFile(path){
    if(path.indexOf('\.')<0){
        initDir(path)
    }
    else if(!require('fs').existsSync(path)){
        if(!require('fs').existsSync(require('path').dirname(path))){
            requireDep('mkdirp').mkdirpNativeSync(require('path').dirname(path))
        }
        require('fs').writeFileSync(path,'')
    }
}
export function initDir(path){
    if(!require('fs').existsSync(path)){
        requireDep('mkdirp').mkdirpNativeSync(path)
    }
}
export async function initAllFile(){
    let fileModule = await import('../noobFile.js')
    for(let Interface of Object.getOwnPropertyNames(fileModule)){
        console.log(Interface+'位于'+fileModule[Interface])
        initFile(fileModule[Interface])
    }
}
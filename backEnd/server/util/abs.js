export let toAbsolute=(path)=>{
    return require('path').join(window.siyuan.config.system.workspaceDir,path)
}
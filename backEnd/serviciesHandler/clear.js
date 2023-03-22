const workspaceDir = window.siyuan.config.system.workspaceDir
export  function clear(){
    const {webContents}  =require("@electron/remote")
    console.log(webContents.getAllWebContents())
    webContents.getAllWebContents().forEach(
        webcontent=>{
            webcontent.send('closeAll',{workspaceDir:workspaceDir})
        }
    )
}
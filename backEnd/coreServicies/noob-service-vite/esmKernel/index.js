import { shellCmd, shellRun } from "../util/shell.js"
const path = require("path")
let esmPath =  path.join(selfPath,'/esmkernel')
let kernelPath = path.join(esmPath,'esmsh-win64.exe')
let cachePath = path.join(workspaceDir,'temp','noobTemp','esm').replace(/\\/g,"/")
console.log()
export  function esm(port){
    let json = require('fs').readFileSync(esmPath+'/config.json')
    json=JSON.parse(json)
    json.port=port
    json.origin=`http://127.0.0.1:${port}`
    require('fs').writeFileSync(esmPath+'/config.json',JSON.stringify(json))
    return shellCmd(kernelPath.replace(/\\/g,"/"),`--config=${esmPath+'/config.json'}`)
}
export {cachePath as cachePath}
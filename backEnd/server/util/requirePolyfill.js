import { coreDir } from '../../../file/noobURL.js'
const path = require('path')
const workspaceDir = window.siyuan.config.system.workspaceDir
export let  requireDep =(name)=> require(path.join(workspaceDir,coreDir,'node_modules',name))

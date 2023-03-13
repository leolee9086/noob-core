import { coreDir } from '../../../file/noobFile.js'
const path = require('path')
export let  requireDep =(name)=> require(path.join(coreDir,'node_modules',name))

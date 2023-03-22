const nodeUrl = require('url')
const path = require('path')
const metaPath = import.meta.url.startsWith('file://')?nodeUrl.fileURLToPath(import.meta.url):""
const corePath = path.resolve(metaPath,"../../../../")
export let  requireDep =(name)=> require(path.join(corePath,'node_modules',name))
export {corePath as noobCorePath} 

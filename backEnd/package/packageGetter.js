import { npmRegistry } from "../util/constants.js";
import { packageDir } from "../file/noobFile.js";
import { requireDep } from "../server/util/requirePolyfill.js";
let fs = require('fs')
let path = require('path')
let zlib = require('zlib')
const tar = requireDep('tar');

export default async function 下载npm包(
  包名,
  版本号,
  npm注册表地址 = npmRegistry
) {
  let 响应 = await fetch(npm注册表地址 + "/" + 包名);
  if (响应.status === 200) {
    let 包属性 = await 响应.json();
    let 版本属性
    if(!版本号){
      版本属性 =获取npm包最新版本(包属性)
    }else{
      版本属性 = 包属性.versions[版本号]
    }
    下载包(版本属性.dist.tarball,版本属性.name+'-'+版本属性.version);
  }
}
export async function 下载包(文件url,文件夹名) {
  let res = await fetch(文件url);
  let targetPath  =path.join(packageDir,文件夹名)
  let UA  =new Uint8Array((await res.arrayBuffer()))
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  let z =zlib.createGunzip().pipe(
    tar.x({
      C: targetPath,
    })
  )
  z.write(UA)
}
export function 获取npm包最新版本(包属性) {
  let 最新版本 = { publish_time: 0 };
  for (let 版本号 of Object.getOwnPropertyNames(包属性.versions)) {
    if (包属性.versions[版本号].publish_time > 最新版本.publish_time) {
      最新版本 = 包属性.versions[版本号];
    }
  }
  return 最新版本;
}

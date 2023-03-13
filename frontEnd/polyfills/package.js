import { Archive } from "../../node_modules/libarchive.js/main.js";
import { writeFile } from "./fs.js";
Archive.init({
  workerUrl: "../../../node_modules/libarchive.js/dist/worker-bundle.js",
});

export class npm {
  constructor(registry) {
    this.registry = registry;
  }
  async 获取包属性(包名) {
    let 包地址 = this.registry + "/" + 包名;
    let res = await fetch(包地址);
    return await res.json();
  }
  async 获取包最新版本属性(包名) {
    let 包属性 = await this.获取包属性(包名);
    function a(包属性) {
      let 最新版本 = { publish_time: 0 };
      for (let 版本号 of Object.getOwnPropertyNames(包属性.versions)) {
        if (包属性.versions[版本号].publish_time > 最新版本.publish_time) {
          最新版本 = 包属性.versions[版本号];
        }
      }
      return 最新版本;
    }
    return a(包属性);
  }
  async 下载包最新版本(包名, 目标文件夹) {
    let 最新版本 = await this.获取包最新版本属性(包名);
    let tarballRes = await fetch(最新版本.dist.tarball);
    let blob = await tarballRes.blob();
    let file = new File([blob], 包名 + "@" + 最新版本.version, {
      lastModified: Date.now(),
    });
    let archive = await Archive.open(file);
    const filesObj = await archive.getFilesObject();
    await writePackage(
      filesObj,
      目标文件夹 + "/" + 包名 + "@" + 最新版本.version
    );
  }
  downloadLatest = this.下载包最新版本;
}
export async function writePackage(filesObj, dist) {
  console.log(filesObj);
  let fileArray = flatten(filesObj);
  for (let i = 0, len = fileArray.length; i < len; i++) {
    console.log(fileArray[i]);
    await writeFile(
      await fileArray[i].extract(),
      dist + "/" + fileArray[i]._path,
      true
    );
  }
}
export function flatten(filesObj) {
  let array = [];
  let flat = (subObj) => {
    Object.getOwnPropertyNames(subObj).forEach((name) => {
      if (subObj[name] && subObj[name]._path) {
        array.push(subObj[name]);
      } else {
        flat(subObj[name]);
      }
    });
  };
  flat(filesObj);
  console.log(array);
  return array;
}

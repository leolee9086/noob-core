import { workspaceDir } from "../../file/siyuanFile.js";
let mimes
export let readFile = async (file) => {

    let res = await fetch("/api/file/getFile", {
      method: "POST",
      body: JSON.stringify({
        path: file,
      }),
    });
    let mime = await res.headers.get("Content-Type");
    if (isText(mime)) {
      return await res.text();
    } else {
      let buf = await Buffer.from(await res.arrayBuffer());
      return buf;
    }
 
};
mimes=JSON.parse(await readFile('/data/snippets/noobcore/frontEnd/polyfills/mimeDb.json'))

let mimetype = {}
Object.getOwnPropertyNames(mimes).forEach(
  type=>{
    let extensions=    mimes[type]['extensions']
    if(extensions){
      extensions.forEach(
        extension=>{
          mimetype[ extension]=type
        }
      )
    }
  }
)
export let writeFile = async(content,path,flag)=>{
  if(!flag){
  let extension=path.split('\.').pop()
  let blob = new Blob([content], {
    type: mimetype[extension]||'text/plain',
  });
  let file = new File([blob], path.split('/').pop(), { lastModified: Date.now() });
  return await writeFileDirectly(file,path)

  }else{
  return await writeFileDirectly(content,path)
  }
}
export let writeFileDirectly=async(file,path)=>{
  let data = new FormData();
  data.append("path", path);
  data.append("file", file);
  data.append("isDir", false);
  data.append("modTime", Date.now());
let res = await fetch("/api/file/putFile", {
    method: "POST",
    body: data,
  });
  return await res.json()

}
export let readDir =async (path)=>{
  let 请求响应 = await fetch(path)
  let 临时dom = new DOMParser().parseFromString(await 请求响应.text(),"text/html")
  let 文件链接数组 = 临时dom.querySelectorAll('a')
  let 文件URL数组 = []
  文件链接数组.forEach(
    a=>{文件URL数组.push(a.getAttribute('href'))}
  )
  return 文件URL数组
}
export let exists = (data,path)=>{
  console.log('这个方法还没写完,先别用')
}
export let mkdir = (data,path)=>{
  console.log('这个方法还没写完,先别用')
}
export function isText(mime) {
  if (mime.startsWith("text")) {
    return true;
  }
  if (mime == "application/json") {
    return true;
  } else return false;
}
const fs={
  readFile,writeFile,readDir,exists,mkdir
}
export default fs
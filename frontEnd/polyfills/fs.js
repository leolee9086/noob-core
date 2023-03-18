import mimes from "./mimeDb.js";
export let readFile = async (file) => {
  let res = await fetch("/api/file/getFile", {
    method: "POST",
    body: JSON.stringify({
      path: file,
    }),
  });
  if (res.status !== 200) {
    console.error(`${file}读取错误`);
  }
  let mime = await res.headers.get("Content-Type");
  if (isText(mime)) {
    return await res.text();
  } else {
    let buf = await res.arrayBuffer();
    return buf;
  }
};

let mimetype = {};
Object.getOwnPropertyNames(mimes).forEach((type) => {
  let extensions = mimes[type]["extensions"];
  if (extensions) {
    extensions.forEach((extension) => {
      mimetype[extension] = type;
    });
  }
});
export let writeFile = async (content, path, flag) => {
  if (!flag) {
    let extension = path.split(".").pop();
    let blob = new Blob([content], {
      type: mimetype[extension] || "text/plain",
    });
    let file = new File([blob], path.split("/").pop(), {
      lastModified: Date.now(),
    });
    return await writeFileDirectly(file, path);
  } else {
    return await writeFileDirectly(content, path);
  }
};
export let writeFileDirectly = async (file, path) => {
  let data = new FormData();
  data.append("path", path);
  data.append("file", file);
  data.append("isDir", false);
  data.append("modTime", Date.now());
  let res = await fetch("/api/file/putFile", {
    method: "POST",
    body: data,
  });
  return await res.json();
};
export let readDir = async (path) => {
  let 请求响应 = await fetch(path);
  let 临时dom = new DOMParser().parseFromString(
    await 请求响应.text(),
    "text/html"
  );
  let 文件链接数组 = 临时dom.querySelectorAll("a");
  let 文件URL数组 = [];
  文件链接数组.forEach((a) => {
    文件URL数组.push(a.getAttribute("href"));
  });
  return 文件URL数组;
};
export let exists = (path) => {
  if(window.require){
    return require('fs').existsSync(window.siyuan.config.system.workspace+'/'+path)
  }
  return new Promise((resolve, reject) => {
    fetch("/api/file/getFile", {
      method: "POST",
      body: JSON.stringify({
        path: path,
      }),
    })
      .then((res) => {
        return res.status;
      })
      .then((status) => {
        console.log(status);
        if (status == 404) {
          console.log("此处无法绕过404错误,所以不要纠结了");
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
};
export let mkdir = async (path) => {
  let data = new FormData();
  data.append("path", path);
  data.append("file", "");
  data.append("isDir", true);
  data.append("modTime", Date.now());
  let res = await fetch("/api/file/putFile", {
    method: "POST",
    body: data,
  });
  return await res.json();
};
export function isText(mime) {
  if (mime && mime.startsWith("text")) {
    return true;
  }
  if (mime == "application/json") {
    return true;
  }
  if (mime == "application/x-javascript") {
    return true;
  } else return false;
}
let fs = {
  readFile,
  writeFile,
  readDir,
  exists,
  mkdir,
};

export default fs;
export let initFile = async (path, data) => {
  if (!(await exists(path))) {
    if (data === undefined) {
      await writeFile("", path);
    } else {
      await writeFile(data, path);
    }
  }
};

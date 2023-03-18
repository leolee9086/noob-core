
let fs=require("fs")
let path=require("path")

export let getIcon=(_path)=>{
    if (fs.existsSync(path.join(_path, "favicon.png"))) {
        return path.join(_path, "favicon.png")
    } else if (fs.existsSync(path.join(_path, "favicon.ico"))) {
        return  path.join(_path, "favicon.ico")
    } else if (fs.existsSync(path.join(_path, "favicon.svg"))) {
        return  path.join(_path, "favicon.svg")
    } else {
        return  window.location.origin + "/stage/icon.png"
    }
}
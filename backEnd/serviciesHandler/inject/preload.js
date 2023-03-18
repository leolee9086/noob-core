let { ipcRenderer } = require("electron");
let path = require("path");
let fs = require("fs");
let remote = require(path.join(
  process.resourcesPath,
  "/app/node_modules",
  "@electron/remote"
));
let { app } = remote;
const appDir = path.dirname(app.getAppPath());
const isDevEnv = process.env.NODE_ENV === "development";
const appVer = app.getVersion();
const confDir = path.join(app.getPath("home"), ".config", "siyuan");
const windowStatePath = path.join(confDir, "windowState.json");
const portJSONPath = path.join(confDir, "port.json");
const workspaceJSONPath = path.join(confDir, "workspace.json");
const Bridge = require("../../server/eventBridge/indexcjs.js");
ipcRenderer.on("closeAll", () => {
  window.close();
});
ipcRenderer.on("reload", () => {
  window.close();
});
ipcRenderer.on("buildBridge", (event, msg) => {
  Object.defineProperties(window, {
    bridge: {
      value: new Bridge(msg.id, msg.id, msg.port),
      writable: false,
    },
    kernelPort:{
        value:msg.kernelPort,
        writable:false
    },
    selfPath:{
        value:msg.path,
         writable:false
    },
    workspaceDir:{
        value:msg.workspaceDir,
         writable:false
    }
  });
  window.require.setExternalBase(path.join(msg.path,'/node_modules'))
  window.require.setExternalDeps(path.join(msg.workspaceDir,msg.corePath,'/node_modules'))

  //开始发送计时信号,超时之后窗口会被关闭
  setInterval(() => {
    bridge.call(msg.id+'-main',"tiktok",'测试');
  }, 1000);
});

window.workspaceDir = JSON.parse(fs.readFileSync(workspaceJSONPath)).pop();
console.log(window.workspaceDir)
window.waitTime = 1000;

window.addEventListener(
  "error",
  () => {
    ipcRenderer.send("error", {});
  },
  true
);

window.ipcRenderer = ipcRenderer;
window.remote = remote;


//让服务可以require自己文件夹里的内容
let re = null
let realRequire = null
if (window.require) {
        const fs = require("fs")
        const path = require("path")
        const Module = require('module')
        if (!window) {
                const window = global
        }
        if (window.require.cache) {
                realRequire = window.require
        }
        if (realRequire) {
                const path = require("path")
                re = function (moduleName, base) {
                        if (module) {
                                let _load = module.__proto__.load
                                if (!module.__proto__.load.hacked) {
                                        module.__proto__.load = function (filename) {
                                                let realfilename = filename
                                                try {
                                                        (_load.bind(this))(filename)
                                                } catch (e) {
                                                        if (e.message.indexOf('Cannot find module') >= 0 && e.message.indexOf(filename) >= 0) {
                                                                if (global.ExternalDepPathes) {
                                                                        let flag
                                                                        let modulePath
                                                                        global.ExternalDepPathes.forEach(depPath => {
                                                                                if (fs.existsSync(path.join(depPath, moduleName))) {
                                                                                        if (!flag) {
                                                                                                console.file_warn ? console.file_warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`) : console.warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`)
                                                                                                filename = path.join(depPath, filename);
                                                                                                try{
                                                                                                        (_load.bind(this))(filename)
                                                                                                
                                                                                                flag = true
                                                                                                }catch(e){

                                                                                                }
                                                                                        } else {

                                                                                                console.warn(`模块${moduleName}在${modulePath}已经找到,请检查外部路径${path.join(depPath, moduleName)}是否重复安装`)
                                                                                        }

                                                                                }
                                                                        });
                                                                        if (!flag) {
                                                                                console.error(e)
                                                                                throw new Error(`无法加载模块${realfilename}`)

                                                                        }

                                                                }
                                                                else {
                                                                        console.error(e)
                                                                        throw new Error(`无法加载模块${realfilename}`)
                                                                }
                                                        }
                                                        else {

                                                                throw (e)
                                                        }

                                                }
                                        }


                                        module.__proto__.load.hacked = true
                                }

                        }
                        if (!window.realRequire) {
                                window.realRequire = realRequire
                        }
                        let workspaceDir
                        let that = window
                        if (base) {
                                moduleName = path.resolve(base, moduleName)
                        }
                        workspaceDir=window.workspaceDir

                        if (workspaceDir) {
                                if (this) {
                                        that = this
                                }
                                try {
                                        if (that.realRequire) {
                                                let _module = that.realRequire(moduleName)
                                                return _module
                                        }
                                        else {
                                                let _module = window.realRequire(moduleName)
                                                return _module
                                        }
                                } catch (e) {
                                        if (e.message.indexOf('Cannot find module') >= 0) {
                                                if (!(moduleName.startsWith("/") || moduleName.startsWith("./") || moduleName.startsWith("../"))) {
                                                        if (global.ExternalDepPathes) {
                                                                let flag
                                                                let modulePath
                                                                global.ExternalDepPathes.forEach(depPath => {
                                                                        if (fs.existsSync(path.join(depPath, moduleName))) {
                                                                                if (!flag) {
                                                                                        console.file_warn ? console.file_warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`) : console.warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`)
                                                                                        moduleName = path.join(depPath, moduleName)
                                                                                        modulePath = path.join(depPath, moduleName)
                                                                                        flag = true
                                                                                } else {

                                                                                        console.warn(`模块${moduleName}在${modulePath}已经找到,请检查外部路径${path.join(depPath, moduleName)}是否重复安装`)
                                                                                }

                                                                        }
                                                                });
                                                        }
                                                } else {
                                                        moduleName = path.resolve(module.path, moduleName)
                                                }
                                                if (that && window.noob && window.noob.plugin && that instanceof window.noob.plugin) {
                                                        try {
                                                                moduleName = path.resolve(that.selfPath, moduleName)
                                                                return window.require(moduleName)
                                                        }
                                                        catch (e) {
                                                                throw e
                                                        }
                                                }
                                                try {

                                                        let _module
                                                        _module = that.realRequire(moduleName)
                                                        return _module
                                                }
                                                catch (e) {
                                                        throw e
                                                }
                                        }
                                        else {
                                                throw e

                                        }
                                }
                        }
                        else return window.require(moduleName)
                }
        }

}
if (window.require && re) {
        window.require = re
        window.realRequire = realRequire
        if (window.realRequire && window.realRequire.cache) {
                window.realRequire.cache.electron.__proto__.realRequire = realRequire.cache.electron.__proto__.require
                window.realRequire.cache.electron.__proto__.require = re
        }
        window.require.setExternalDeps = (path) => {
                if (!window.ExternalDepPathes) {
                        window.ExternalDepPathes = []
                }
                if (path && !window.ExternalDepPathes.indexOf(path) >= 0) {
                        window.ExternalDepPathes.push(path)
                        window.ExternalDepPathes = Array.from(new Set(window.ExternalDepPathes))
                }
        }
      
        window.require.setExternalBase = (path) => {
                if (!window.ExternalDepPathes) {
                        window.ExternalDepPathes = []
                }
                if (!window.ExternalBase) {
                        window.ExternalBase = path
                        window.ExternalDepPathes.push(path)
                }
                else {
                        console.error('不能重复设置外部依赖路径')
                }
        }
        /*window.requireInstall = function (moduleName) {
                if (!window.ExternalBase) {
                        console.error('未设置外部依赖位置')
                        return
                }
                try {
                        return require(moduleName)
                } catch (e) {
                        console.log(e, window.require)
                        npmCmd(`--registry https://registry.npmmirror.com install ${moduleName} `, window.ExternalBase).then(w => {
                                console.log(w.data)
                                //  window.location.reload()
                        }).catch(
                                e => {
                                        console.error(e.data)
                                }
                        )
                }
        }*/
}


import addEsmSurrport from "./esmKernel/esmProxy.js";
import { esm } from "./esmKernel/index.js";
const vite = require("vite");
const fs = require("fs");
const path = require("path");
const express = require("express");
const eventBridge = window.bridge;
const corePluginsPath = path.join(corePath, "frontEnd", "corePlugins");
let middlewares = [];
let app = express();
let ports = JSON.parse(
  fs.readFileSync(path.join(workspaceDir, "temp", "noobTemp", "port.json"))
);
let port = ports.noob编译服务端口号;
let esmPort = ports.noob依赖服务端口号;
let esmProcesser = esm(esmPort);
console.log(esmPort)
export {esmPort as esmPort}
/*function cors(req, res, next) {
  var oneof = false;
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    oneof = true;
  }
  if (req.headers["access-control-request-method"]) {
    res.header(
      "Access-Control-Allow-Methods",
      req.headers["access-control-request-method"]
    );
    oneof = true;
  }
  if (req.headers["access-control-request-headers"]) {
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"]
    );
    oneof = true;
  }
  if (oneof) {
    res.header("Access-Control-Max-Age", 60 * 60 * 24 * 365);
  }

  if (oneof && req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }

}*/
let cors = require("cors");
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.originalUrl.endsWith("/")) {
    let flag,_entry
    [
      "index.js",
      "index.ts",
      "index.cjs",
      "main.js",
      "main.ts",
      "main.cjs",
      "/src/main.ts",
    ].forEach((entry) => {
      if (
        fs.existsSync(
          path.join(workspaceDir, "data", req.originalUrl, entry)
        ) ||
        fs.existsSync(path.join(workspaceDir, "conf", req.originalUrl, entry))
      ) {
        flag=true
        _entry=entry
      }
    });
    if(flag){
      res.redirect(req.originalUrl + _entry);
      return;
    }else{
      console.log(req)
      if(req.headers.connection!=="Upgrade"){
        next()
      }
    }
  } 
  else {
    next();
  }
});
app.get("/noobApi/core/corePath", cors, (req, res, next) => {
  console.log(req);
  res.end(corePath);
});
app.get("/noobApi/plugins/listCorePlugins", (req, res, next) => {
  //  res.header("content-type", 'application/json,utf-8');
  let dirList = fs.readdirSync(corePluginsPath);
  let pluginList = [];
  dirList.forEach((dir) => {
    pluginList.push({
      name: dir,
      meta: JSON.parse(
        fs.readFileSync(path.join(corePluginsPath, dir, "plugin.json"))
      ),
      package: JSON.parse(
        fs.readFileSync(path.join(corePluginsPath, dir, "package.json"))
      ),
      path: path.join(corePluginsPath, dir),
      url:
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        port +
        `/core/frontEnd/corePlugins/${dir}`,
    });
  });
  res.json({
    msg: 0,
    data: pluginList,
  });
});
let viteserver;

//使用vite重新伺服snippets,这样之后代码片段内的文件就可以获得vite服务支持了
let coreMiddleware = await vite.createServer({
  server: {
    fs: {
      allow: [workspaceDir, corePath],
    },
    hmr: false,
    port:port
  },
  appType: "custom",
  root: corePath,
  base: `/core/`,
  envFile: true,
  configFile: path.join(
    corePath,
    "backEnd",
    "coreServicies",
    "noob-service-vite",
    "vite.config.js"
  ),

  cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
  resolve: {
    alias: [
      {
        find: "siyuan",
        replacement: "../core/frontEnd/noobApi/index.js",
      },
      {
        find: "noob",
        replacement: "../core/frontEnd/noobApi/index.js",
      },
      {
        find: "siyuan-noob",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
    ],
  },
});
console.log(coreMiddleware);
app.use("/core", coreMiddleware.middlewares);
let snippetsMiddleware = await vite.createServer({
  server: {
    fs: {
      allow: [workspaceDir],

    },
    hmr: false,
    port:port
  },
  appType: "custom",
  root: path.join(workspaceDir, "data", "snippets"),
  base: `/snippets/`,
  configFile: path.join(
    corePath,
    "backEnd",
    "coreServicies",
    "noob-service-vite",
    "vite.config.js"
  ),
  envFile: true,
  cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
  resolve: {
    alias: [
      {
        find: "siyuan",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
      {
        find: "noob",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
      {
        find: "siyuan-noob",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
      {
        find: "svelte",
        replacement:
          "../../../../core/backEnd/coreServicies/noob-service-vite/node_modules/svelte",
      },
     
    ],
  },
});
app.use("/snippets", snippetsMiddleware.middlewares);
let appearanceMiddleware = await vite.createServer({
  server: {
    fs: {
      allow: [workspaceDir],
    },
    hmr: false,
    port:port
  },
  appType: "custom",
  root: path.join(workspaceDir, "conf", "appearance"),
  base: `/appearance/`,
  configFile: path.join(
    corePath,
    "backEnd",
    "coreServicies",
    "noob-service-vite",
    "vite.config.js"
  ),
  envFile: true,
  cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
  resolve: {
    alias: [
      {
        find: "siyuan",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
      {
        find: "siyuan-noob",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
      {
        find: "noob",
        replacement: "../../../../core/frontEnd/noobApi/index.js",
      },
      {
        find: "svelte",
        replacement:
          "../../../../core/backEnd/coreServicies/noob-service-vite/node_modules/svelte",
      },
    
    ],
  },
});
app.use("/appearance", appearanceMiddleware.middlewares);
addEsmSurrport(app, esmPort);

viteserver = app.listen(port, () => {
  console.log("vite服务器启动");
});
eventBridge.on("console", (msg) => {
  document.body.insertAdjacentHTML(
    "beforebegin",
    `<div>${JSON.stringify(msg)}</div>`
  );
});
/*
const VConsole =require('vconsole')
const vConsole = new VConsole();
console.log(vConsole)
*/

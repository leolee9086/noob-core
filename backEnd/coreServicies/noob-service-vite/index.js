
const vite = require("vite");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bridge = window.eventBridge;
const corePluginsPath = path.join(
  workspaceDir,
  "data",
  "snippets",
  "noobCore",
  "frontEnd",
  "corePlugins"
);
let middlewares = [];
let app = express();
let ports =JSON.parse(fs.readFileSync(path.join(workspaceDir,'temp','noobTemp','port.json')))
let port = ports.noob编译服务端口号

function cors(req, res, next) {
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
}
app.use(cors);
app.use((req,res,next)=>{
  next()
});

let corePluginsList = fs.readdirSync(corePluginsPath);
let viteserver
//为每一个核心插件创建中间件，能够给每个插件不同的vite配置
//赶脚有点麻烦，之后再弄算了
/*for await (let pluginName of corePluginsList) {

  if (fs.existsSync(path.join(corePluginsPath, pluginName, "index.js"))) {
    let vitemiddleware;
    if (
      fs.existsSync(path.join(corePluginsPath, pluginName, "vite.config.js"))
    ) {
      vitemiddleware = await vite.createServer({
        server: {
          middlewareMode: true,
          fs: {
            allow: [".."],
          },
        },
        appType: "custom",
        root: path.join(corePluginsPath, pluginName),
        base: `/snippets/noobcore/frontEnd/corePlugins/${pluginName}/`,
        configFile: path.join(corePluginsPath, pluginName, "vite.config.js"),
        envFile: true,
        cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
      });
    } else {
      vitemiddleware = await vite.createServer({
        server: {
          middlewareMode: true,
          fs: {
            allow: [
              "..",
              path.join(
                workspaceDir,
                "data",
                "snippets",
                "noobCore",
                "frontEnd"
              ),
            ],
          },
          hmr:{
            server: app,
            }        },
        appType: "custom",
        root: path.join(corePluginsPath, pluginName),
        base: `/snippets/noobcore/frontEnd/corePlugins/${pluginName}/`,
        configFile: false,
        envFile: true,
        cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
        resolve: {
          alias: [
            {
              find: "siyuan",
              replacement: "/noobcore/frontEnd/noobApi/index.js",
            },
          ],
        },
        build: {
          rollupOptions: {
            input: "./main.js",
          },
        },
      });
    }
    console.log(vitemiddleware);
    middlewares.push(vitemiddleware);
    app.use(
      `/snippets/noobcore/frontEnd/corePlugins/${pluginName}`,
      vitemiddleware.middlewares
    );
  }
}*/
//使用vite重新伺服snippets
let snippetsMiddleware = await vite.createServer({
  server:{
    fs:{
    allow:[workspaceDir]
    },
    hmr:false

  },  
  appType: "custom",
  root: path.join(workspaceDir, "data", "snippets"),
  base: `/snippets/`,
  configFile:path.join(workspaceDir,"data", "snippets","vite.config.js"),
  envFile: true,
  cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
  resolve: {
    alias: [
      {
        find: "siyuan",
        replacement: "/noobcore/frontEnd/noobApi/index.js",
      },
    ],
  },
});
let appearanceMiddleware= await vite.createServer({
  server:{
    fs:{
    allow:[workspaceDir]
    },
    hmr:false
  },  

  appType: "custom",
  root: path.join(workspaceDir, "conf", "appearance"),
  base: `/appearance/`,
  configFile:path.join(workspaceDir,"data", "snippets","vite.config.js"),
  envFile: true,
  cacheDir: path.join(workspaceDir, "temp", "noobTemp", ".vite"),
  resolve: {
    alias: [
      {
        find: "siyuan",
        replacement: "../../../../snippets/noobcore/frontEnd/noobApi/index.js",

      },
      {
        find:"svelte",
        replacement:"../../../../snippets/noobcore/backEnd/coreServicies/noob-service-vite/node_modules/svelte"

      }
    
    ],
  },
  
});

app.use(
  "/snippets",
  cors,
  snippetsMiddleware.middlewares
);
app.use(
  "/appearance",
  cors,
  appearanceMiddleware.middlewares
);
viteserver= app.listen(port, () => {
  console.log("vite服务器启动");
});
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
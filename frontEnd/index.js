import pluginLoader from './pluginsHandler/loader/index.js'
//由于无论如何必须获取到Tab等的原型才能够继续执行之后的代码,所以这里会直接打开日记


await pluginLoader.loadCorePlugins()
await pluginLoader.loadThemePlugins()
await pluginLoader.loadDevPlugins()
await pluginLoader.loadCustomPlugins()
pluginLoader.run()
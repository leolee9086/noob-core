import pluginLoader from './pluginsHandler/loader/index.js'
await pluginLoader.loadCorePlugins()
await pluginLoader.loadThemePlugins()
await pluginLoader.loadCustomPlugins()
pluginLoader.run()

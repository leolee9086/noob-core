import pluginLoader from './pluginsHandler/loader'
await pluginLoader.loadCorePlugins()
await pluginLoader.loadThemePlugins()
await pluginLoader.loadCustomPlugins()
pluginLoader.run()

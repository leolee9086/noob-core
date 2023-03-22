import {
  currentThemeURL,
  snippetsURL,
  snippetsDir,
} from "./siyuanURL.js";
export let coreURL =snippetsURL + "/noobcore";
//核心插件文件夹路径
export let corePluginURL = coreURL + "/frontEnd/corePlugins";
//主题插件文件夹路径
export let themePluginURL = currentThemeURL + "/themePlugins";
//插件接口文档路径
export let pluginReadmeURL = snippetsURL + "/noobReadMe";
//用户插件路径
export let customPluginURL = snippetsURL +'/noobCustomPlugins'

//插件核心文件夹路径
export let coreDir =  snippetsDir + "/noobcore";
export let tempDir = "/temp/noobTemp";
export let portPath = tempDir + "/port.json";
export let noobConfigDir = "/conf/noobConf";
export let pluginsConfigPath = noobConfigDir + "/customPlugins.json";
export let backEndDir =  coreDir + "/backEnd";
export let customPluginDir = snippetsDir +'/noobCustomPlugins'

export let pluginReadmeDir= snippetsDir + "/noobPluginsReadme";

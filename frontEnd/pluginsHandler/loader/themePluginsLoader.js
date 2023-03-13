import pluginsRegistry from "../registry/index.js";
import { themePluginURL } from "../../../file/noobURL.js";
import { readFile, readDir } from "../../polyfills/fs.js";
let PluginList = await readDir(themePluginURL);
export let loadThemePlugins = async () => {
  for await (let pluginURL of PluginList) {
    pluginsRegistry.loadPlugin(
      themePluginURL + "/" + pluginURL,
      pluginURL.replace("/", ""),
      '/conf/'+themePluginURL + "/" + pluginURL,
      'theme'
    );
  }
};

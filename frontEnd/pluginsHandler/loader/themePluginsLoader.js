import pluginsRegistry from "../registry/index.js";
import { themePluginURL } from "../../../file/noobURL.js";
import { readFile, readDir } from "../../noobApi/polyfills/fs.js";
let PluginList = await readDir(themePluginURL);
let url = new URL(import.meta.url)
export let loadThemePlugins = async () => {
  for await (let pluginURL of PluginList) {

    pluginsRegistry.loadPlugin(
      url.origin+  themePluginURL + "/" + pluginURL,
      pluginURL.replace("/", ""),
      '/conf/'+themePluginURL + "/" + pluginURL,
      'theme'
    );
  }
};

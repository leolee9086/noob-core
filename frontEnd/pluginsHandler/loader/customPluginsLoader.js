import pluginsRegistry from "../registry/index.js";
import { customPluginURL } from "../../../file/noobURL.js";
import { readFile, readDir } from "../../polyfills/fs.js";
let PluginList = await readDir(customPluginURL);
let url = new URL(import.meta.url)

export let loadCustomPlugins = async () => {
  for await (let pluginURL of PluginList) {
    pluginsRegistry.loadPlugin(
      url+   customPluginURL + "/" + pluginURL,
      pluginURL.replace("/", ""),
      '/data/'+customPluginURL+'/' + pluginURL,
      'custom'
    );
  }
};

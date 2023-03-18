import pluginsRegistry from "../registry/index.js";
import { corePluginURL } from "../../../file/noobURL.js";
import { readFile, readDir } from "../../polyfills/fs.js";
let corePluginList = await readDir(corePluginURL);
let corePluginConfig = {};
let url = new URL(import.meta.url)
export let loadCorePlugins = async() => {
  for await (let pluginURL of corePluginList) {
  console.log(pluginsRegistry['corePlugins'])
  let json = JSON.parse(
    await readFile("/data" + corePluginURL + "/" + pluginURL + "plugin.json")
  );
  if (json.depends && json.depends.forEach) {
    json.depends.forEach((name) => {
      if (!corePluginConfig[name]) {
        pluginsRegistry.loadPlugin(
          `${url.origin}/snippets/noobcore/frontEnd/corePlugins/${name}`, 
          name,
          '/data'+corePluginURL + "/" + name + "/",
          'core');
        pluginsRegistry['corePlugins'][name] = true;
      }
    });
  }
  if (!pluginsRegistry[pluginURL.replace("/", "")]) {
    pluginsRegistry.loadPlugin(
      `${url.origin}/snippets/noobcore/frontEnd/corePlugins/${pluginURL}`,
      pluginURL.replace("/", ""),
      '/data'+corePluginURL + "/" + pluginURL,
      'core'
    );
    pluginsRegistry['corePlugins'][pluginURL.replace("/", "")] = true;
  }
}};

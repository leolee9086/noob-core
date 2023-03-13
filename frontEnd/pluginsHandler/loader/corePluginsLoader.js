import pluginsRegistry from "../registry/index.js";
import { corePluginURL } from "../../../file/noobURL.js";
import { readFile, readDir } from "../../polyfills/fs.js";
let corePluginList = await readDir(corePluginURL);
let corePluginConfig = {};
for await (let pluginURL of corePluginList) {
  let json = JSON.parse(
    await readFile("/data" + corePluginURL + "/" + pluginURL + "plugin.json")
  );
  if (json.depends && json.depends.forEach) {
    json.depends.forEach((name) => {
      if (!corePluginConfig[name]) {
        pluginsRegistry.loadPlugin(
          corePluginURL + "/" + name + "/", 
          name,
          '/data'+corePluginURL + "/" + name + "/",
          'core');
        pluginsRegistry[name] = true;
      }
    });
  }
  if (!pluginsRegistry[pluginURL.replace("/", "")]) {
    pluginsRegistry.loadPlugin(
      corePluginURL + "/" + pluginURL,
      pluginURL.replace("/", ""),
      '/data'+corePluginURL + "/" + pluginURL,
      'core'
    );
    pluginsRegistry[pluginURL.replace("/", "")] = true;
  }
}
/*corePluginList.forEach(async (pluginURL) => {
  let json = JSON.parse(
    await readFile("/data" + corePluginURL + "/" + pluginURL + "plugin.json")
  );
  if (json.depends && json.depends.forEach) {
    json.depends.forEach((name) => {
      if (!corePluginConfig[name]) {
        pluginsRegistry.loadPlugin(corePluginURL + "/" + name + "/", name);
        pluginsRegistry[name] = true;
      }
    });
  }

  pluginsRegistry.loadPlugin(
    corePluginURL + "/" + pluginURL,
    pluginURL.replace("/", "")
  );
  pluginsRegistry[pluginURL.replace("/", "")] = true;
});*/
export let loadCorePlugins = () => {};

import fs from "../../noobApi/polyfills/fs.js";
import pluginsRegistry from "../registry/index.js";
let metaURL = import.meta.url;
let origin = new URL(metaURL).origin;
let corePluginList = await (
  await fetch(origin + "/noobApi/plugins/listCorePlugins")
).json();
corePluginList = corePluginList.data;
export let loadCorePlugins = async () => {
  for await (let pluginInfo of corePluginList) {
    let json = pluginInfo.meta;
    console.log(json);
    if (json.depends && json.depends.forEach) {
      json.depends.forEach((name) => {
        if (!pluginsRegistry[name]) {
          let infor = corePluginList.find((item) => {
            return item.name == name;
          });
          console.log(name, infor, corePluginList);
          if (infor) {
            pluginsRegistry.loadPlugin(
              infor.url,
              infor.name,
              infor.path,
              "core"
            );
          }
          pluginsRegistry[name] = true;
        }
      });
    }
    await load(pluginInfo)
  }
};

async function load(pluginInfo) {
  if (!pluginsRegistry[pluginInfo.name]) {
    pluginsRegistry.loadPlugin(
      pluginInfo.url,
      pluginInfo.name,
      pluginInfo.path,
      "core"
    );
    pluginsRegistry[pluginInfo.name] = true;
    await fs.mkdir("conf", "noobConf", pluginInfo.name);
  }
}

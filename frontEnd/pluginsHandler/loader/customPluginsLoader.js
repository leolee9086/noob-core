import pluginsRegistry from "../registry/index.js";
import { customPluginURL,noobConfigDir } from "../../../file/noobURL.js";
import fs, {  readDir } from "../../noobApi/polyfills/fs.js";
let pluginSet={}
if(await fs.exists(noobConfigDir+'/plugins.json')){
   pluginSet = await fs.readFile(noobConfigDir+'/plugins.json')
  pluginSet= JSON.parse(pluginSet)
}
let PluginList = await readDir(customPluginURL);
let url = new URL(import.meta.url)
export let loadCustomPlugins = async () => {
  for await (let pluginURL of PluginList) {
    let pluginInfo= buildInfo(pluginURL)
    pluginsRegistry.loadPlugin(
      ...pluginInfo
    );
  }
};
export function buildInfo(pluginURL){
  console.log(pluginSet)
  return[
       url.origin+  customPluginURL + "/" + pluginURL,
         pluginURL.replace("/", ""),
        '/data/'+customPluginURL+'/' + pluginURL,
    'custom',
   (pluginSet[pluginURL.replace("/", "")]&&pluginSet[pluginURL.replace("/", "")]['actived'])?0:1
  ]
}

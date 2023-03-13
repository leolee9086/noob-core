import siyuan from "./getSiyuan.js";
import { Plugin } from "siyuan";
import { readFile } from "../../polyfills/fs.js";
window._registry = {};

Object.defineProperties(window, {
  Plugin: {
    value: Plugin,
    writable: false,
  },
  initPlugin: {
    value: async (pluginClass, pluginName, pluginURL, pluginPath,type) => {
      if (window._registry[pluginName]) {
        console.error(`
        已经存在来自${window._registry[pluginName]["selfURL"]}的插件${pluginName}
        来自${pluginURL}的插件加载错误
        `);
        return;
      }
      window._registry[pluginName] = {};
      window._registry[pluginName].selfURL = pluginURL;
      window._registry[pluginName].selfPath = pluginPath;
      window._registry[pluginName].type=type

      window._registry[pluginName].instance = new pluginClass();
    },
    writable: false,
  },
  siyuan: {
    value: siyuan,
    writable: false,
  },
});

window._noobRegistry = {};
Object.defineProperties(window, {

  initPlugin: {
    value: async (
      pluginClass,
      pluginName,
      pluginURL,
      pluginPath,
      type,
      delayInit
    ) => {
      if (window._noobRegistry[pluginName]) {
        console.error(`
        已经存在来自${window._noobRegistry[pluginName]["selfURL"]}的插件${pluginName}
        来自${pluginURL}的插件加载错误
        `);
        return;
      }
      console.log(pluginURL);
      window._noobRegistry[pluginName] = {};
      window._noobRegistry[pluginName].selfURL = pluginURL;
      window._noobRegistry[pluginName].selfPath = pluginPath;
      window._noobRegistry[pluginName].type = type;
      console.log(delayInit)
      if (!delayInit ) {
        window._noobRegistry[pluginName].instance = new pluginClass();
        window._noobRegistry[pluginName]._constructor =
          window._noobRegistry[pluginName].instance.__proto__;
      }else{
        window._noobRegistry[pluginName]._constructor = pluginClass
      }
      window._noobRegistry[pluginName].meta = await (
        await fetch(pluginURL + "/plugin.json")
      ).json();
    },
    writable: false,
  },
});
let initPlugin = window.initPlugin;
export { initPlugin as initPlugin };
export default initPlugin;

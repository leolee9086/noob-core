window._registry = {};
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
      if (window._registry[pluginName]) {
        console.error(`
        已经存在来自${window._registry[pluginName]["selfURL"]}的插件${pluginName}
        来自${pluginURL}的插件加载错误
        `);
        return;
      }
      console.log(pluginURL);
      window._registry[pluginName] = {};
      window._registry[pluginName].selfURL = pluginURL;
      window._registry[pluginName].selfPath = pluginPath;
      window._registry[pluginName].type = type;
      console.log(delayInit)
      if (!delayInit ) {
        window._registry[pluginName].instance = new pluginClass();
        window._registry[pluginName]._constructor =
          window._registry[pluginName].instance.__proto__;
      }else{
        window._registry[pluginName]._constructor = pluginClass
      }
      window._registry[pluginName].meta = await (
        await fetch(pluginURL + "/plugin.json")
      ).json();
    },
    writable: false,
  },
});
let initPlugin = window.initPlugin;
export { initPlugin as initPlugin };
export default initPlugin;

import "./defineGlobal.js";
let loaded = {};
export function loadPlugin(插件地址, 插件名, 插件路径,类别,延迟启动) {
  let pluginLoader = document.getElementById("pluginLoader");
  if (!pluginLoader) {
    pluginLoader = document.createElement("script");
    pluginLoader.setAttribute("type", "module-shim");
    pluginLoader.setAttribute("async", "module");
    pluginLoader.setAttribute("id", "pluginLoader");
    document.head.appendChild(pluginLoader);
  }
  if (!loaded[插件名]) {
    pluginLoader.textContent += `
    await (async()=>{
    try{
      let module =await import('${插件地址}')
      let pluginName = '${插件名}' 
      let pluginClass = module['default']
      await window.initPlugin(pluginClass,'${插件名}','${插件地址}','${插件路径}','${类别}',${延迟启动})
  }catch(e){
      if(e=='TypeError: pluginClass is not a constructor'){
          console.error("从'${插件地址}'加载插件${插件名}失败:",'请将插件插件类设为默认导出,并确保类名与包名对应',e)
      }
      else if(e=="ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor"){
          console.error("从'${插件地址}'加载插件${插件名}失败:",'插件类构造函数必须调用super()',e)
      }
      else{
          console.error("从'${插件地址}'加载插件${插件名}失败:",e)
      }
  }
})();`;
    loaded[插件名] = true;
  }
}
export async function run() {
  document.querySelectorAll('[type="module-shim"]').forEach((el) => {
    el.setAttribute("type", "module");
    el.remove();
    document.head.appendChild(el);
  });
}
let registry = {
  loadPlugin,
  run,
  corePlugins: {},
};
export default registry;

import { readFile, writeFile } from "../../polyfills/fs.js";
let importMapContent = await readFile(
  "/data/snippets/noobcore/frontEnd/pluginsHandler/registry/importMap.json"
);
let script = document.createElement("script");
script.innerHTML = importMapContent;
script.setAttribute("type", "importMap");
let 插件iframe = document.createElement("iframe");
插件iframe.setAttribute(
  "src",
  `/snippets/noobCore/frontEnd/pluginsHandler/registry/pluginRegistry.html`
);
插件iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
插件iframe.setAttribute("style", "display:none");

document.body.appendChild(插件iframe);
插件iframe.contentDocument.head.appendChild(script);

let registry = {
  loadPlugin,
  run,
};
export default registry;
let loaded = {};
export function loadPlugin(插件地址, 插件名, 插件路径) {
  let pluginLoader = 插件iframe.contentDocument.getElementById("pluginLoader");
  if (!pluginLoader) {
    pluginLoader = document.createElement("script");
    pluginLoader.setAttribute("type", "module-shim");
    pluginLoader.setAttribute("async", "module");
    pluginLoader.setAttribute("id", "pluginLoader");
    插件iframe.contentDocument.head.appendChild(pluginLoader);
  }
  if (!loaded[插件名]) {
    pluginLoader.textContent += `
    try{
  let module_${插件名} = await import('${插件地址 + "index.js"}');
  let pluginName_${插件名} = '${插件名}' 
  let pluginClass_${插件名} = module_${插件名}['default']
  
      await window.initPlugin(pluginClass_${插件名},'${插件名}','${插件地址}','${插件路径}')
  }catch(e){
      if(e=='TypeError: pluginClass_${插件名} is not a constructor'){
          console.error("从'${插件地址}'加载插件${插件名}失败:",'请将插件插件类设为默认导出',e)
      }
      else if(e=="ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor"){
          console.error("从'${插件地址}'加载插件${插件名}失败:",'插件类构造函数必须调用super()',e)
      }
      else{
          console.error("从'${插件地址}'加载插件${插件名}失败:",e)
      }
  }`;
    loaded[插件名] = true;
  }
  /* let script = document.createElement("script");
  script.setAttribute("type", "module-shim");
  script.setAttribute("async", "module");
  script.setAttribute("id", "pluginLoader");  
  script.textContent = `
    let module = await import('${插件地址+'index.js'}');
    let pluginName = '${插件名}' 
    let pluginClass = module['default']
    try{
        await window.initPlugin(pluginClass,'${插件名}','${插件地址}','${插件路径}')
    }catch(e){
        if(e=='TypeError: pluginClass is not a constructor'){
            console.error("从'${插件地址}'加载插件${插件名}失败:",'请将插件插件类设为默认导出',e)
        }
        else if(e=="ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor"){
            console.error("从'${插件地址}'加载插件${插件名}失败:",'插件类构造函数必须调用super()',e)
        }
        else{
            console.error("从'${插件地址}'加载插件${插件名}失败:",e)
        }
    }
    `;
  插件iframe.contentDocument.head.appendChild(script);*/
}
export async function run() {
  if (插件iframe.contentWindow.initPlugin) {
    插件iframe.contentDocument
      .querySelectorAll('[type="module-shim"]')
      .forEach((el) => {
        el.setAttribute("type", "module");
        el.remove();
        插件iframe.contentDocument.head.appendChild(el);
      });
    return;
  } else {
    let a = 插件iframe.contentDocument.getElementById("GlobalDefine");
    a.remove();
    a.setAttribute("type", "module");
    let src =
      "/data/snippets/noobcore/frontEnd/pluginsHandler/registry/defineGlobal.js";
    let content = await readFile(src);
    a.removeAttribute("src", "");
    a.innerHTML = content;
    插件iframe.contentDocument.head.appendChild(a);
    setTimeout(run, 100);
  }
}

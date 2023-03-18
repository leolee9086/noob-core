import { Plugin, kernelApi, frontEndApi } from "siyuan";
import { mergeConfig } from "./util/config.js";
import { configPageBinder } from "./util/configPageBinder.js";
console.log(window)
let customPanel = (地址) => {
  return `<div class="fn__flex fn__flex-1  fn__flex-column">   
    <iframe   
    class="fn__flex-1" 
    style=" max-height:calc(100% - 200px)" 
    src="${地址}" data-src="" border="0" 
    frameborder="no" 
    framespacing="0" 
    allow-modals="true"
    allowfullscreen="true"
    allowpopups="true"
    ></iframe  >   
</div> 
    `;
};
let uncircleString = (from,...args)=>{
  let cache = [];
  let str = JSON.stringify(from, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              return;
          }
          cache.push(value);
      }
      return value;
  });
  cache = null;
  str =JSON.stringify(JSON.parse(str),...args) 
  return str

}
export default class configPage extends Plugin {
  constructor() {
    super();
    console.log(this);
    this.设置页标题 = "插件设置";
    this.注册顶栏按钮("left", {
      图标: "#iconSettings",
      提示: "打开插件开关页面",
      点击回调函数: () => {
        this.openSetting();
      },
    });
    this.注册插件接口();
    this.刷新设置()
  }
  async 刷新设置(){
    await this.getConfig();
    this.config = mergeConfig(this.config, window._registry);
    await this.saveConfig();

  }
  async openSetting() {
    await this.getConfig();
    console.log(window._registry);
    this.config = mergeConfig(this.config, window._registry);
    let oldConfig = uncircleString(this.config);
    let html = "";
    Object.getOwnPropertyNames(this.config).forEach((plugin) => {
      html += `
      <label class="b3-label fn__flex">
      <div class="fn__flex-1">
          ${plugin}
          <div data-plugin="${plugin}" class="b3-label__text"></div>
      </div>
      <div class="fn__space"></div>
      
      `;
      if (window._registry[plugin].type == "custom") {
        html += `
        <input class="b3-switch fn__flex-center" id="plugin_${plugin}" type="checkbox" ${
          this.config[plugin]["actived"] ? "checked" : ""
        }>
      `;
      }
      html += "</label>";
    });

    this.confgPanel = html;
    this.dialog = new frontEndApi.layout.Dialog({
      title: "noob插件设置",
      content: html,
      width: "90vw",
      destroyCallback: async () => {
        console.log(this.config, window._registry);
        if (oldConfig !== uncircleString(this.config)) {
          await this.saveConfig();
          window.parent.location.reload();
        }
      },
    });
    this.dialog.initElement();
    this.dialog.element.querySelector(".b3-dialog__container").style.maxWidth =
      "1280px";
    this.dialog.element
      .querySelectorAll('[type="checkbox"]')
      .forEach((checkBox) =>
        checkBox.addEventListener("change", (event) => {
          let plugin = event.target.id.replace("plugin_", "");
          this.config[plugin]["actived"] = !this.config[plugin]["actived"];
          event.stopPropagation();
          event.preventDefault();
        })
      );
    this.dialog.show();
    Object.getOwnPropertyNames(this.config).forEach(async (name) => {
      try {
        let url = this.config[name]["selfPath"] + "/plugin.json";
        let meta = await frontEndApi.workspace.readFile(url);
        this.dialog.element.querySelector(`[data-plugin="${name}"]`).innerText
        this.dialog.element.querySelector(`[data-plugin="${name}"]`).innerText =
          JSON.parse(meta).describe;
          this.dialog.element.querySelector(`[data-plugin="${name}"]`).addEventListener('click',()=>{
            if(window._registry[name]&&window._registry[name].instance.configPage){
              window._registry[name].instance.configPage.mount(this.dialog)
            }
          })
      } catch (e) {
        console.error(e)
      }
    });
  }
  注册插件接口() {
    this.设置插件接口函数(
      {
        中文名: "打开网页页签",
        英文名: "openPage",
        功能: "打开一个网页页签,常用于打开设置页签或者打开文件之类",
        参数: {
          地址: "页签所在的地址",
          关闭回调或callback: "页签关闭时的回调函数",
        },
        返回值: "没有返回值",
        其他: "页签不会像其他思源页签一样下次打开之后保持,它会被去掉",
      },
      (url, title, icon, callBack) => {
        let Tab = frontEndApi.layout.Tab;
        let 设置页签 = new Tab({
          panel: customPanel(url || "about:blank"),
          title: title,
          icon: icon,
          callBack: callBack,
        });
        window.parent.siyuan.layout.centerLayout.children[0].addTab(设置页签);
      }
    );
    this.设置插件接口函数(
      {
        中文名: "获取设置",
        英文名: "getConfig",
        功能: "返回插件文件夹中的config.json的内容",
        参数: "没有参数",
        返回值: "返回一个对象, 其内容为解析之后的插件设置内容",
        其他: "可以通过调用saveConfig接口来获取设置,需要注意的是存在多个窗口时需要注意设置保存可能有延迟",
      },
      async function getConfig ()  {
        let config = await frontEndApi.workspace.readFile(
          this.selfPath + "config.json"
        );
        try{
        this.config = JSON.parse(config);
        }catch(e){
          this.config={}
        }
        console.log(this.config,this)

      }
    );
    this.设置插件接口函数(
      {
        中文名: "生成设置页",
        英文名: "buildConfigPage",
        功能: "通过配置创建一个设置页",
        参数: "配置页参数",
        返回值: "返回配置页对象",
        其他: `可以通过this.configPage对象来配置设置页渲染函数,configPage对象应当提供一个mount接口,对话框元素将会被传入这个位置,你可以在此对它进行一些修改`,
      },
      async function buildConfig (options)  {
        this.configPage= new configPageBinder(this,options)
        return this.configPage
      }
    )
    this.设置插件接口函数(
      {
        中文名: "保存设置",
        英文名: "saveConfig",
        功能: "将插件的config对象保存到插件文件夹中的config.json文件",
        参数: "没有参数",
        返回值: "返回一个对象, 其内容为解析之后的插件设置内容",
        其他: "可以通过调用getConfig接口来获取设置,需要注意的是存在多个窗口时需要注意设置保存可能有延迟",
      },
      async function saveConfig  () {
        let res = await frontEndApi.workspace.writeFile(
          uncircleString(this.config || {}, undefined, 2),
          this.selfPath + "config.json"
        );
        return res;
      }
    );
  }
}

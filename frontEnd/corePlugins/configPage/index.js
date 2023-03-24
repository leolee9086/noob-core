import { Plugin, frontEndApi } from "siyuan";
import { noobConfigDir } from "../../../file/noobURL.js";
import { mergeConfig } from "./util/config.js";
import { configPageBinder } from "./util/configPageBinder.js";
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
export let uncircleString = (from, ...args) => {
  let cache = [];
  let str = JSON.stringify(from, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return;
      }
      cache.push(value);
    }
    return value;
  });
  cache = null;
  str = JSON.stringify(JSON.parse(str), ...args);
  return str;
};
export default class configPage extends Plugin {
  constructor() {
    super();
    this.设置页标题 = "插件设置";
    this.注册顶栏按钮("left", {
      图标: "#iconSettings",
      提示: "打开插件开关页面",
      点击回调函数: () => {
        this.openSetting();
      },
    });
    this.注册插件接口();
  }
  async 刷新设置() {
    this.config= await this.getNoobConfig('plugins');
    this.config = mergeConfig(this.config, window._noobRegistry);
    await this.saveNoobConfig('plugins',this.config);
  }
  async openSetting() {
    await this.刷新设置();
   // await this.getConfig();
    this.config = mergeConfig(this.config, window._noobRegistry);
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
      if (window._noobRegistry[plugin].type == "custom") {
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
        console.log(this.config, window._noobRegistry);
        if (oldConfig !== uncircleString(this.config)) {
          await this.saveNoobConfig('plugins',this.config)
         
          //window.parent.location.reload();
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
          window._noobRegistry[plugin]["actived"]=this.config[plugin]["actived"] 
          this.config[plugin]["actived"] ?this.noobMountPlugin(plugin):this.noobUnmountPlugin(plugin)
          event.stopPropagation();
          event.preventDefault();
        })
      );
    this.dialog.show();
    Object.getOwnPropertyNames(this.config).forEach(async (name) => {
      try {
        let meta = window._noobRegistry[name].meta;
        this.dialog.element.querySelector(`[data-plugin="${name}"]`).innerText;
        this.dialog.element.querySelector(`[data-plugin="${name}"]`).innerText =
          meta.describe;
        this.dialog.element
          .querySelector(`[data-plugin="${name}"]`)
          .addEventListener("click", () => {
            if (
              window._noobRegistry[name] &&
              window._noobRegistry[name].instance.configPage
            ) {
              window._noobRegistry[name].instance.configPage.mount(this.dialog);
            }
          });
      } catch (e) {
        console.error(e);
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
      async function getConfig() {
        let config = await frontEndApi.workspace.readFile(this.configPath);
        try {
          this.config = JSON.parse(config);
        } catch (e) {
          this.config = {};
        }
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
      async function buildConfig(options) {
        this.configPage = new configPageBinder(this, options);
        return this.configPage;
      }
    );
    this.设置插件接口函数(
      {
        中文名: "保存设置",
        英文名: "saveConfig",
        功能: "将插件的config对象保存到插件文件夹中的config.json文件",
        参数: "没有参数",
        返回值: "返回一个对象, 其内容为解析之后的插件设置内容",
        其他: "可以通过调用getConfig接口来获取设置,需要注意的是存在多个窗口时需要注意设置保存可能有延迟",
      },
      async function saveConfig() {
        let res = await frontEndApi.workspace.writeFile(
          uncircleString(this.config || {}, undefined, 2),
          this.configPath
        );
        return res;
      }
    );
    this.设置插件接口函数(
      {
        中文名:"保存系统设置",
        英文名:"saveNoobConfig",
        功能:"保存针对工作空间启动noob时的设置",
        参数:{
          key:"需要保存的参数名称",
          value:"需要保存的参数值,只能接受能够以json序列化的值"
        },
        返回值:"返回一个对象,其内容为解析之后的对应系统设置文件内容",
        其他:"不建议滥用这个接口,它应该是用于存储系统级别的配置"
      },
      async function saveNoobConfig(key,value){
        console.log(noobConfigDir+'/'+key+'.json')
       await frontEndApi.workspace.writeFile(uncircleString(value,undefined,2),noobConfigDir+'/'+key+'.json')
      }
    )
    this.设置插件接口函数(
      {
        中文名:"保存系统设置",
        英文名:"getNoobConfig",
        功能:"获取针对工作空间启动noob时的设置",
        参数:{
          key:"需要获取的参数名称",
        },
        返回值:"返回一个对象,其内容为解析之后的对应系统设置文件内容",
        其他:"不建议滥用这个接口,它应该是用于读取系统级别的配置"
      },
      async function getNoobConfig(key){
       return JSON.parse(await frontEndApi.workspace.readFile(noobConfigDir+'/'+key+'.json'))
      }
    )
    this.设置插件接口函数(
      {
        中文名:"开启插件",
        英文名:"noobMountPlugin",
        功能:"实例化某个插件,开启它的功能",
        参数:{
          name:"需要实例化的插件名称",
        },
        返回值:"返回插件的实例",
        其他:"不建议滥用这个接口,它应该是用于插件系统本身的管理功能"
      },
       function noobRunPlugin(name){
        let constructor =window._noobRegistry[name]._constructor.constructor
        window._noobRegistry[name].instance=new constructor()
        let instance =window._noobRegistry[name].instance
        instance.onMounted?instance.onMounted():null
        return window._noobRegistry[name].instance
      }
    )
    this.设置插件接口函数(
      {
        中文名:"关闭插件",
        英文名:"noobUnmountPlugin",
        功能:"反实例化某个插件,尽可能关闭它的功能",
        参数:{
          name:"需要反实例化的插件名称",
        },
        返回值:"返回插件的实例",
        其他:"不建议滥用这个接口,它应该是用于插件系统本身的管理功能"
      },
       function noobClosePlugin(name){
        let instance =window._noobRegistry[name].instance
        instance.onUnmounted?instance.onUnmounted():null
        window._noobRegistry[name].instance=undefined
      }
    )
  }
}

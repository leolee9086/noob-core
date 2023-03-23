import { Plugin, frontEndApi, kernelApi } from "siyuan";
import { uncircleString } from "../configPage";
export default class bazaar extends Plugin {
  constructor() {
    super();
    this.获取集市内容();
    this.getConfig()
    this.注册顶栏按钮("left", {
      icon: "#iconBazaar",
      label: "集市管理",
      callback: () => {
        this.显示集市();
      },
    });
  }
  async 显示集市() {
    let html = await this.生成集市页面();
    this.dialog = new frontEndApi.layout.Dialog({
      title: "noob集市",
      content: html,
      width: "90vw",
      destroyCallback: async () => { },
    });
    this.dialog.initElement();
    this.dialog.element.querySelector(".b3-dialog__container").style.maxWidth =
      "1280px";
    this.dialog.show();
    this.bindDialogEvent()
  }
  bindDialogEvent() {
    this.dialog.element.addEventListener(
      'click', async (e) => {
        if (e.target.id && e.target.id.startsWith('plugin_')) {
          let packageName = e.target.id.split('_').pop()
          if (e.target.id.startsWith('plugin_trash_')) {
            await kernelApi.removeFile(
              {
                path: '/data/snippets/noobCustomPlugins/' + packageName.replace('noob-plugin-', '')
              }
            )
            this.noobClosePlugin(packageName.replace('noob-plugin-', ''))
            window.location.reload()
            return
          }
          await this.npm.downloadLatest(
            packageName,
            'data/snippets/noobCustomPlugins',
            packageName.replace('noob-plugin-', '')
          )
        }
      }
    )
  }
  async 生成集市页面() {
    let html = ``;
    let plugins = JSON.parse(
      await frontEndApi.workspace.readFile(
        this.configDir + "/bazaarContent/plugins.json"
      )
    );
    console.log(plugins);
    for await (let packgeName of plugins.packages) {
      let res = await fetch(`https://registry.npmmirror.com/${packgeName}`);
      let json = await res.json();
      let 按钮 = await this.生成npm包按钮(packgeName, json);
      let siteURL = this.config.registry.indexOf('npmmirror') ? 'https://npmmirror.com' : 'https://npmjs.com'
      html += `
      <label class="b3-label fn__flex config__item">
      <div class="fn__flex-1">
          ${packgeName}
          <div><a href="https://npmmirror.com/${packgeName}">前往插件包页面</a></div>
          <div><a href="https://npmjs.com/${packgeName}">goto the plugin package page on npmjs</a></div>
          <div data-plugin="${packgeName.replace("noob-plugin-", "")}" class="b3-label__text">${json.description}</div>
      </div>
      <div class="fn__space"></div>
      ${按钮}
          </label>
`;
    }
    return html;
  }
  async 生成npm包按钮(packgeName, remotePackageInfo) {
    let pluginName = packgeName.replace("noob-plugin-", "");
    console.log(pluginName, window._registry);
    if (!window._registry[pluginName]) {
      return `<button class="b3-button b3-button--outline fn__size200" id="plugin_download_${packgeName}">
                    <svg><use xlink:href="#iconDownload"></use></svg>下载
       </button>`;
    } else {
      let packageInfo = JSON.parse(
        await frontEndApi.workspace.readFile(
          window._registry[pluginName].selfPath + "/package.json"
        )
      );
      let currentVersion = packageInfo.version;
      let remoteVersions = remotePackageInfo.versions;
      let remoteLatiset = await this.npm.获取包最新版本属性(packgeName);
      if (this.npm.compareVersion(currentVersion, remoteLatiset) < 0) {
        return `<button class="b3-button b3-button--outline fn__size200" id="plugin_Upgrade_${packgeName}">
        <svg><use xlink:href="#iconUplaod"></use></svg>升级
</button><button class="b3-button b3-button--outline fn__size200" id="plugin_trash_${packgeName}">
<svg><use xlink:href="#iconTrashcan"></use></svg>卸载
</button> `;
      } else {
        return `<button class="b3-button b3-button--outline fn__size200" id="plugin_Refresh_${packgeName}">
        <svg><use xlink:href="#iconRefresh"></use></svg>重置
</button><button class="b3-button b3-button--outline fn__size200" id="plugin_trash_${packgeName}">
<svg><use xlink:href="#iconTrashcan"></use></svg>卸载
</button> `;
      }
    }
  }
  async 获取集市内容() {
    if (await frontEndApi.workspace.exists(this.configPath)) {
      try {
        await this.getConfig();
      } catch (e) { }
    } else {
      this.config = (await import("./defaultConfig.js"))["default"];
    }
    let npm = new frontEndApi.bazaar.npm(this.config.registry);
    await npm.downloadLatest(
      this.config.bazaarName[0],
      this.configDir,
      "/bazaarContent"
    );
    this.npm = npm;
  }
}

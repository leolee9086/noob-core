let 接口注册表 = [];
export class Plugin {
  constructor() {
    Object.defineProperty(this, "name", {
      value: this.constructor.name,
      writable: false,
    });
    this.checkSuper();
    if(window.require){
      this.说明文档路径 =require('path').join(
        window.parent.siyuan.config.system.workspaceDir ,
        "/data/snippets/noobPluginsReadme/" ,
        this.name +
        "_readme.md")
      this.清理文档()
    }
  }
  get selfURL(){
    return window._registry[this.name]['selfURL']
  }
  get selfPath(){
    return window._registry[this.name]['selfPath']
  }
  get configPath(){
    return `conf/noobConf/${this.name}/config.json`
  }
  get configDir(){
    return `conf/noobConf/${this.name}`
  }
  清理文档(){
    require('fs').writeFileSync(this.说明文档路径,'')
  }
  checkSuper() {
    if (!this) {
      throw new Error("抱歉,但是插件必须调用super方法");
    }
  }
  设置插件接口函数(接口配置, 接口值) {
    let 接口必要说明列表 = [
      "中文名",
      "英文名",
      "功能",
      "参数",
      "返回值",
      "其他",
    ];
    let flag = true;
    if (!接口配置) {
      console.error(`由${this.name}提供的接口未提供接口配置,接口值为${接口值}`);
      flag = false;

      return;
    }
    接口必要说明列表.forEach((说明项目) => {
      if (!接口配置[说明项目]) {
        console.error(
          `由${this.name}提供的接口未提供${说明项目}说明,接口值为${接口值}`
        );
        flag = false;
      }
    });
    if (typeof 接口值 !== "function") {
      console.error(
        `由${this.name}提供的接口并非函数,接口值为${接口值},请注意检查`
      );
      flag = false;
    }
    if (!flag) {
      throw new Error(`接口注册错误,插件${this.name}加载失败`);
      return;
    }
    let 被占用名称 = "",
      占用插件 = "";
    if (
      接口注册表.find((item) => {
        if (item.中文名 == 接口配置.中文名) {
          被占用名称 = item.中文名;
        }
        if (item.英文名 == 接口配置.英文名) {
          被占用名称 = item.中文名;
        }
        return item.中文名 == 接口配置.中文名 || item.英文名 == 接口配置.英文名;
      })
    ) {
      console.error(
        `接口注册错误,插件${this.name}加载失败,名称${被占用名称}已经被${占用插件}占用`
      );
    }
    Plugin.prototype.接口注册表.push({
      接口值: 接口值,
      供应插件: this,
      接口配置: 接口配置,
    });
    Plugin.prototype[接口配置.中文名] = 接口值;
    Plugin.prototype[接口配置.英文名] = 接口值;
    if (window.parent.require) {
      let 现有文档内容;
      this.说明文档路径 = this.说明文档路径.replace(/\\/g, "/");
      if (require("fs").existsSync(this.说明文档路径)) {
        现有文档内容 = require("fs").readFileSync(this.说明文档路径, "utf-8");
      } else {
        现有文档内容 = "";
      }
      现有文档内容 += `
## ${this.name}:${接口配置.中文名}

中文:${接口配置.中文名}

英文名:${接口配置.英文名}

### 功能说明

${接口配置.功能}

### 参数

\`\`\`js
${JSON.stringify(接口配置.参数,undefined,2)}
\`\`\`

### 返回值

${接口配置.返回值}

### 其他

${接口配置.返回值}
            `;
      if (window.parent.require&&现有文档内容) {
        require("fs").writeFileSync(this.说明文档路径, 现有文档内容);
      }
    }
  }
}
Plugin.prototype.接口注册表 = 接口注册表;

import { Plugin, frontEndApi } from "siyuan";
import { uncircleString } from "../configPage";
export default class bazaar extends Plugin {
  constructor() {
    super();
    this.获取集市内容();
  }

  async 获取集市内容() {
    if (await frontEndApi.workspace.exists(this.configPath)) {
      try {
        await this.getConfig();
      } catch (e) {}
    } else {
      this.config = (await import("./defaultConfig.js"))["default"];
    }
    let npm = new frontEndApi.bazaar.npm(this.config.registry);
    await npm.downloadLatest(
      this.config.bazaarName[0],
      this.configDir,
      "/bazaarContent"
    );
    let plugins = await frontEndApi.workspace.readFile(
      this.configDir+ "/bazaarContent/plugins.json"
    );
    console.log(plugins);
  }
}

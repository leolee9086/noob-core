import { Plugin, frontEndApi } from "siyuan";


export default class bazzar extends Plugin {
  constructor() {
    super();
    this.获取集市内容();
  }
  async 获取集市内容() {
    await this.getConfig();
    let npm = new frontEndApi.bazzar.npm(this.config.registry)
    await npm.downloadLatest(
        this.config.bazzarName[0],
      "/temp/noobTemp/packages"
    );
  }
}



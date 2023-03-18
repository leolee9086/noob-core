import { Plugin, frontEndApi } from "siyuan";


export default class bazaar extends Plugin {
  constructor() {
    super();
    this.获取集市内容();
  }
  async 获取集市内容() {
    await this.getConfig();
    let npm = new frontEndApi.bazaar.npm(this.config.registry)
    await npm.downloadLatest(
        this.config.bazaarName[0],
        this.selfPath,
      '/bazaarContent'
    );
    let plugins =await frontEndApi.workspace.readFile(this.selfPath+'/bazaarContent/plugins.json')
    console.log(plugins)
    
  }
}



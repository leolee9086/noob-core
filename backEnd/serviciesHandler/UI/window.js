import { toAbsolute } from "../../server/util/abs.js";
import { coreDir } from "../../../file/noobURL.js";
import { noob核心后端服务端口号,思源核心服务端口号 } from "../../server/util/port.js";
import {eventBridge} from "../../server/eventBridge/index.js"
const { BrowserWindow, screen } = require("@electron/remote");
const path = require("path");
//继承事件触发器
export class serverHost {
  constructor(options) {
    //调用super之后,才能够使用this
    this.options = options;
    //加载entry,也就是index.html
    this.reload();
    //自杀计数
    this.tictok()
  }
  tictok(){
    this.timer = setTimeout(
        ()=>{
            try{
            this.host.webContents.destroy()
            if(this.options.stayAlive){
                this.reload()
            }
            this.tictok()
            }catch(e){}
        },this.options.TimeOut||5000
    )
  }
 
  reload() {
    let { options } = this;
    let host = new BrowserWindow({
      width: screen.getPrimaryDisplay().size.width / 2,
      height: screen.getPrimaryDisplay().workAreaSize.height / 2,
      frame: options.frame,
      icon: options.icon,
      show: false,
      webPreferences: {
        preload: path.join(
          toAbsolute(coreDir),
          'backEnd',
          "serviciesHandler",
          "inject",
          "preload.js"
        ),
        nativeWindowOpen: true,
        nodeIntegration: true,
        webviewTag: true,
        webSecurity: false,
        contextIsolation: false,
      },
    });
    //使host能够使用remote模块
    require("@electron/remote")
      .require("@electron/remote/main")
      .enable(host.webContents);
    //host挂载到实例中
    this.host = host;
    this.host.loadURL(options.URL);
    this.host.webContents.send('buildBridge',{
        id:options.id,
        TimeOut:options.TimeOut||5000,
        port:noob核心后端服务端口号,
        kernelPort:思源核心服务端口号,
        path:options.path,
        corePath:options.corePath,
        workspaceDir:window.siyuan.config.system.workspaceDir
    })
    this.mainBridge =new eventBridge(options.id+'-main',options.id+'-main')
    console.log('允许服务信息发送,子服务控制台信息将在此显示')
    this.mainBridge.on('tiktok',()=>{
        clearTimeout(this.timer)
    })
  }
  show() {
    console.log(this.host);
    try {
      if (this.host && !this.host.isDestroyed()) {
        this.host.show();
      } else {
        this.reload();
        this.host.show();
      }
    } catch (e) {
      console.error(e);
    }
  }
  
}
export default serverHost;

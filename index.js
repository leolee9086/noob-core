//如果在app环境，创建运行时服务器
import { readFile } from "./frontEnd/polyfills/fs.js";
let isAppMain =
  siyuan.layout.leftDock ||
  siyuan.layout.rightDock ||
  siyuan.layout.topDock ||
  siyuan.layout.bottomDock
    ? true
    : false;
if (isAppMain) {
  //这里是对各种文件和文件夹进行校验和初始化./file/util/init.js
  isAppMain ? await import("./file/init.js") : null;
}

if (window.require) {
  //测试
  //siyuan工作空间的子窗口不会有dock,所以可以通过这个来判断当前窗口是不是dock
  //下面这个服务器仅仅用来伺服代码作为运行时编译和事件通讯使用.
  //有关事件通讯后台的代码可以参考data\snippets\noobcore\server\eventBridge
  //这是一个简单的websocket远程调用的实现
  //额，所以说这玩意是新手向
  isAppMain ? await import("./backEnd/index.js") : null;
}
setTimeout(async() => {
  //这里是为了等待vite开发服务器的启用，在此之后，vite接管了noob前端的伺服
  //注意，除了本来自带的依赖之外，只有在noob-service-esm设置白名单上的依赖才能够被插件引入
  let ports =JSON.parse(await readFile("/temp/noobTemp/port.json"))
  let vitePort=ports.noob编译服务端口号
  import(`http://127.0.0.1:${vitePort}/core/frontEnd/index.js`);
});

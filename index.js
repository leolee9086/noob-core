//如果在app环境，创建运行时服务器
await import ('./frontEnd/index.js')

if (window.require) {
  //测试
  //为了区分,无论是核心还是插件,前端入口用index.js,后端部分入口用main.js.
  
  //siyuan工作空间的子窗口不会有dock,所以可以通过这个来判断当前窗口是不是dock
  let isAppMain =
    siyuan.layout.leftDock ||
    siyuan.layout.rightDock ||
    siyuan.layout.topDock ||
    siyuan.layout.bottomDock
      ? true
      : false;
  if (isAppMain) {
    //这里是对各种文件和文件夹进行校验和初始化

    isAppMain ? await import( "./file/init.js") : null;
    //下面这个服务器仅仅用来伺服代码作为运行时编译和事件通讯使用.
    //有关事件通讯后台的代码可以参考data\snippets\noobcore\server\eventBridge
    //这是一个简单的websocket远程调用的实现
    //有关代码编译，noob在运行时会拉起一个vite开发服务器和一个esm.sh服务器用于编译代码和拉取依赖
    //所以你的代码可以任意引入远程依赖
    //额，所以说这玩意是新手向
    isAppMain ? await import( "./backEnd/index.js") : null;
  }
}

## 安装方式

### 通过 npm 安装

```bash
npm install siyuan-noob
```

### 使用压缩包安装

直接从 noobcore 的压缩包或者别的什么地方，找到 noobApi 中的 index.js

引入它就可以了。

### 最小安装方式：

直接使用 import 从 esm.sh 引入 noobApi（如果你的网络状况良好的话应该挺快的）

```js
import {
  Plugin,
  frontEndApi,
  kernelApi,
} from "https://esm.sh/siyuan-noob@<版本号>";
```

注意别用 latest 标签,最近可能改得比较频繁,最好手动确认一下哪个版本比较稳再说,原本naive的功能都恢复了之后会尽量稳了再更新.

这样安装之后会缺少一些高级功能，但是对于简单使用来说，完全够用啦~~~

如果你要指定版本号,将<版本号> 改为具体的版本号即可.

esmsh 版本号判断有点延迟,所以最好直接指定版本号避免问题出现.

受到 vue 之类的启发,noob 的各个功能模块也是尽可能"渐进式"的,引入 noobAPI 实现最基本的功能注入, 引入整个 frontEnd(相比 api 多了 pluginHandler 和几个核心插件)可以实现最基础的插件开关和更新等,引入整个 noobcore 则可以实现依赖伺服、插件代码条件编译、vite 的部分功能以及子服务（应用）模块。这是基于思源本身有多个环境，运行状况比较复杂而确定的架构方式。

plugin 类之后会实现简单的子我管理,也就是自动创建一个开关用于开启和关闭.

#### 在主题中使用

上面说的安装方式在主题当中都是可用的。

### 有关体积

绝大部分体积来自 libarchive.js(用于实现无后端环境的包解压)，作者自己也在考虑要不要将它分离到另外一个子功能包 siyuan-pollyfills，必要时再引入，但是这样可能会无法实现插件类的自我的自我更新功能和压缩包文件操作功能，所以还在考虑当中。

如果有更好的方案的话欢迎到 GitHub 提出.

## 依赖

使用了以下依赖

### libarchive.js

用于解压 tarball 包，你可以使用它来下载和解压 zip，纯前端，所以在 docker 版的思源中应该也可以使用

## 类型

由于作者的 ts 非常菜，这个包完全使用 js 书写，如果你需要类型提示（友情提醒，大概只有核心 api 的提示有用吧），在你的项目中的 tsconfig.json 引入 noob.d.ts 即可.

## 使用

### Plugin 类的使用不是必须的

noob 的 plugin 类并没有什么魔法操作，只有在配合 pluginhandler（这是另外一个包）和 noob-core 的一些核心插件的时候才会发挥一点别的作用，所以如果你直接使用 noob 的 api 的话，可以不用使用它，有时候问题反而会变得更简单。

### kernelApi 虽然很多，但是最好不要太依赖它们

思源的开发速度非常快，所以如果不是已经确定下来的 api（也就是在 siyuan-note 的 github 仓库文档中列出）的话，最好不要大量使用它们。

### frontEndApi 导出主要实现的接口

#### 自定义块标菜单

使用入口：frontEndApi.menus.gutterMenu

使用方式:

```js
//初级
let { gutterMenu } = frontEndApi.menus.gutterMenu;
gutterMenu.registMenuItem({
  icon: "#iconConfig", //提供了render的时候不会生效
  label: this.name, //提供了render的时候不会生效
  callback: () => {
    console.log("这是一个菜单");
  },
});

//相对高级
gutterMenu.registMenuItem({
  判定函数: () => {
    //没有修改时间,说明这个块从来没有被更新过
    return siyuan.menus.menu.element.innerHTML.indexOf("Modified");
  },
  render: (options) => {
    let element = document.createElement("button");
    element.setAttribute("class", "b3-menu__item");
    element.innerHTML = `
        <div class="fn__flex-1">
        ${options.plugin.name}
        </div>
        <span class="fn__space"></span>
        <span class="b3-menu__label">
          <div>
            <input style="box-sizing: border-box"  class="b3-switch fn__flex-center"  type="checkbox" ${
              //假设你有一个监听序列叫这个
              this.watched[gutterMenu.status.currentBlockID] ? "checked" : ""
            }>
          </div>
        </span>
        `;
    element.addEventListener("click", () => {
      element.querySelector("input").value =
        !element.querySelector("input").value;
      this.watched[gutterMenu.status.currentBlockID] =
        element.querySelector("input").value;
    });
    //下面这个也可以没有吧
    setTimeout(() => {
      window.siyuan.menus.menu.element.style.top =
        parseInt(window.siyuan.menus.menu.element.style.top) -
        element.clientHeight +
        "px";
    });
    return element;
  },
});
```

#### 自定义文档树菜单

参考自定义块标菜单

status|菜单状态项包含了

```js
{
当前块id:'实际上就是当前点击项的文档id',
当前文档id:'跟上面那个一样',
当前笔记本id:'当前点击项的笔记本id'
}
```

需要注意文档 id 可能是个空哒

#### 自定义图片菜单

参考自定义块标菜单

status|菜单状态项包含了

```js
{
  图片容器: "就是图片所在的元素";
}
```

#### 自定义块链接菜单

参考自定义块标菜单

status|菜单状态项包含了

```js
{
  引用目标id : 判定元素.getAttribute("data-id"),
  引用类型 : 判定元素.getAttribute("data-subtype"),
 所在块id:获取最近上级块id(判定元素),
}
```

#### 自定义超链接菜单(这个好像忘记加进来了暂时)

参考自定义块标菜单

#### 自定义面包屑菜单

参考自定义块标菜单,位置可能有点不好理解,头图右上角那个,其实它在面包屑最后对吧
status|菜单状态项包含了

```js
{
  当前块id;
}
```

#### 自定义状态栏帮助按钮菜单

参考自定义块标菜单,这玩意没有状态

#### 自定义顶部工具栏按钮

别看了这个也还没弄进来

#### 自定义头图按钮

```js
    let 头图按钮配置1 = {
      id: "小歪",
      type: "小歪",
      label: "小歪",
      callback: (event) => this.获取小歪图片(event),
      图标: "#iconImage",
    };

    frontEndApi.editor.addBackgoundImageButton(头图按钮配置1);
      async 获取小歪图片(event) {
    event.preventDefault();
    let 文档id = this.获取文档id(event.target);
    let 头图元素组 = document.querySelectorAll(
      `.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`
    );
    console.log(文档id);
    let img = await fetch("https://api.ixiaowai.cn/api/api.php");
    console.log(img);
    let imgurl = img.url;
    头图元素组.forEach((el) => {
      el.setAttribute("style", "");
      el.setAttribute("src", imgurl);
    });
    kernelApi.setBlockAttrs({
      id: 文档id,
      attrs: {
        "title-img": `background-image:url(${imgurl})`,
      },
    });
  }

```

上面那个就是用来获取一个随机图片的

反注册按钮的方法倒是简单

```js
frontEndApi.editor.removeBackgoundImageButton(头图按钮配置1);
```
这两个方法的使用参考示例插件

https://www.npmjs.com/package/noob-plugin-morebackground

https://www.npmmirror.com/package/noob-plugin-morebackground
#### 自定义图标

暴露在 DOMUtil 上的 addIcon 方法

用法是这样

```js
frontEndApi.DOMUtil.addIcon({
  id: "iconUnsplash",
  content: `
    <path d="M320 288V0h384v288h-384z m384 160H1024V1024H0V448h320v288h384V448z" p-id="2167"></path>
    `,
});
```

removeIcon 方法暂时没有写

#### 自定义页签

这个还没有想好文档怎么写,着实用起来有点复杂了

#### 自定义编辑器工具栏按钮

```js
    frontEndApi.editor.toolbar.registItem({
      id: "一个id,必须全局唯一",
      提示: "鼠标挪到这个按钮的时候显示什么",
      图标: `#iconSettings`//一个图标,可以用注册图标的方式添加自己喜欢的
      点击回调函数: (event) => {console.log('我是一个工具栏图标')},
    });
```

https://www.npmjs.com/package/noob-plugin-quickset

https://www.npmmirror.com/package/noob-plugin-quickset

https://www.npmjs.com/package/noob-plugin-quickmove

https://www.npmmirror.com/package/noob-plugin-quickmove

### 尚未重构完成的接口

由于 noobAPI 本身是由 naive 主题的 api 重构而来，有一部分接口目前还没有完成整合。

它们是

### 自定义导出界面按钮

### 自定义 html 块渲染函数

### 自定义导出格式

### 自定义关键词菜单（类似自带的斜杠菜单但是可以自行决定唤醒词，例如用|或者@来唤出菜单）

## 捐助

如果它对你有用可以通过爱发电来请作者喝杯咖啡

https://afdian.net/a/leolee9086

## 感谢

libarchivejs：使用了 libarchivejs 来解压 tarball.gz 等文件格式。

https://github.com/nika-begiashvili/libarchivejs

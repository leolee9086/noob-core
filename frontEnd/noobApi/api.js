import block from "./util/blocks.js";
import 核心api from "./util/kernelApi.js";
import 自定义菜单 from "./customMenu/index.js";
import 添加自定义随机背景图 from "./customBackground/index.js";
import { 注册自定义题图按钮 } from "./customBackground/index.js";
import 自定义悬浮工具栏 from "./customEditorToolbar/index.js";
import 自定义窗口工具栏 from "./customToolbar/index.js";
import { 生成单个dom元素 } from "./util/dom.js";
import { Tab, 注册自定义tab } from "./customTab/index.js";
import * as layoutUtil from "./util/layouts.js";
import 注册图标 from "./customIcon/index.js";
import 注册url动作 from "./UrlAction/index.js";
import {npm} from '../polyfills/package.js'
//这个接口暂时还不可用
//import { leftDock } from "./customDock/index.js";
import { Protyle } from "./customTab/util/Protyle.js";
import { BlockListEditor } from "./customTab/blockList/index.js";
//这个接口暂时也不可用
import {  Dialog } from "./customDialog/index.js";
import { readFile,writeFile } from "../polyfills/fs.js";
import { currentThemeURL } from "../../file/siyuanURL.js";
let noobApi = {
  自定义菜单: 自定义菜单,
  commonMenu: 自定义菜单,
  内容块: block,
  block: block,
  编辑器: {
    自定义悬浮工具栏: 自定义悬浮工具栏,
    注册自定义题图按钮,
    Protyle,
    BlockListEditor,
  },
  editor: {
    toolbar: 自定义悬浮工具栏,
  },
  核心api: 核心api,
  kernelApi: 核心api,
  DOM工具: {
    生成单个dom元素,
    注册图标,
  },
  布局: {
    注册自定义tab,
    Tab,
    util: layoutUtil,
    自定义窗口工具栏,
    Dialog
  },
  layout: {
    registTabType: 注册自定义tab,
    Tab,
    util: layoutUtil,
    customToolBar: 自定义窗口工具栏,
    Dialog
  },
  url动作: {
    注册url动作,
  },
  urlScheme: {
    registAction: 注册url动作,
  },
  workspace: {
    readFile: readFile,
    writeFile:writeFile,
    currentThemeURL,
  },
  工作空间: {
    读取文件: readFile,
    写入文件:writeFile,
  },
  reload: () => {
    window.parent.location.reload();
  },
  bazzar:{
    npm
  },
  集市:{
    npm
  }
};

export { noobApi as api };
export { 核心api as kernelApi };

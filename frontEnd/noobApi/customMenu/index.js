import { 块标菜单 } from "./gutterMenu/index.js";
import { 编辑器菜单 } from "./editorMenu/index.js";
import { 文档树菜单 } from "./filetreeMenu/index.js";
import { 面包屑菜单 } from "./breadcrumbMenu/index.js";
import { 图片菜单 } from "./imageMenu/index.js";
import { 引用块菜单 } from "./blockRefMenu/index.js";
import { 状态栏帮助菜单 } from "./statusHelpMenu/index.js";
import { 批量渲染自定义菜单 } from "./util/render.js";
import { 注册表 } from "../commonStruct";
import { 自定义菜单原型 } from "./customMenu.js";
let 自定义菜单类型注册表 = new 注册表("自定义菜单类型");

let 自定义菜单 = {};
自定义菜单 = {
  块标菜单,
  编辑器菜单,
  文档树菜单,
  面包屑菜单,
  图片菜单,
  引用块菜单,
  状态栏帮助菜单,
  rawMenu: window.siyuan.menus.menu,
};
自定义菜单.gutterMenu = 自定义菜单.块标菜单;
自定义菜单.docMenu = 自定义菜单.编辑器菜单;
自定义菜单.treeMenu = 自定义菜单.文档树菜单;
自定义菜单.breadCrumbMenu = 自定义菜单.面包屑菜单;
自定义菜单.imageMenu = 自定义菜单.图片菜单;
自定义菜单.blockrefMenu = 自定义菜单.引用块菜单;
自定义菜单.helpMenu = 自定义菜单.状态栏帮助菜单;

let popup = window.siyuan.menus.menu.popup;
//避免重复加载自定义菜单,新旧版混入暂时还没有实现，之后会实现新版菜单对旧版的混入
if (!window._noobInternalRegistry) {
  window._noobInternalRegistry = [];
  window._noobInternalRegistry.push({
    moduleName: "customMenu",
    version: "1.0.6",
    value: 自定义菜单,
  });
} else {
  let 现有自定义菜单 = window._noobInternalRegistry.find((item) => {
    return item && item.moduleName === "customMenu" && item.version === "1.0.6";
  });
  现有自定义菜单
    ? (自定义菜单 = 现有自定义菜单.value)
    : window._noobInternalRegistry.push({
        moduleName: "customMenu",
        version: "1.0.6",
        value: 自定义菜单,
      });
}
//这里...args的含义是解构赋值,为了避免重复套娃,这里套一层就完事了,如果有冲突的话再说吧
if (!Object.hasOwn(window.siyuan.menus.menu, 'popup')) {
  window.siyuan.menus.menu.popup = (options, isLeft, isCustom) => {
    //这里我们就可以为所欲为了,菜单内容这个时候已经渲染完成,所以我们这里对菜单进行的改动都会保留到渲染出来的菜单里面.
    //如果是块标菜单，我们就做点啥
    //第三个参数是为了避免对自定义菜单判断函数的干扰
    popup.bind(window.siyuan.menus.menu)(options, isLeft);
    //提供了双语名之后,为了避免重复渲染,遇到英文名就直接跳过了
    let alias = [
      "gutterMenu",
      "docMenu",
      "treeMenu",
      "breadCrumbMenu",
      "imageMenu",
      "blockrefMenu",
      "helpMenu",
      "rawMenu",
    ];
    if (!isCustom) {
      try {
        for (let 菜单名 in 自定义菜单) {
          if (
            alias.indexOf(菜单名) < 0 &&
            自定义菜单[菜单名].判断函数 &&
            自定义菜单[菜单名].判断函数() &&
            菜单名 !== "当前菜单"
          ) {
            自定义菜单.当前菜单 = 自定义菜单[菜单名];
            批量渲染自定义菜单(自定义菜单[菜单名].待渲染菜单项目数组);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    //为了让菜单能够正常工作,我们把原本的popup函数给加回去
  };
}
export function 注册自定义菜单类型(
  类型名,
  事件名序列,
  判断函数,
  坐标函数,
  触发目标,
  监听选项
) {
    if(自定义菜单[类型名]){
      console.warn('不能重复注册同一个菜单类型')
      return 
    }
    自定义菜单[类型名]=new 自定义菜单原型()
    //默认情况下自定义的菜单并不渲染
    自定义菜单[类型名].判断函数= ()=>{return false}
    自定义菜单类型注册表.注册(
        {
            id:类型名,
            事件名序列,
            判断函数,
            坐标函数,
            触发目标
        }
    )
    事件名序列.forEach(
        (事件名)=>{
            触发目标 = 触发目标||document
            let 监听器添加函数
            if(触发目标.addEventListener){
                监听器添加函数=触发目标.addEventListener
            }
            if(触发目标.on){
                监听器添加函数=触发目标.on
            }
            监听器添加函数(事件名,(事件)=>{
                let 菜单容器=window.siyuan.menus.menu.element.querySelector('.b3-menu__items')||window.siyuan.menus.menu.element
                if(判断函数(事件)&&菜单容器&&!菜单容器.innerHTML){
                  自定义菜单[类型名].判断函数= ()=>{return true}
                  菜单容器.innerHTML=(
                    `<button class="b3-menu__item b3-menu__item--readonly">&ZeroWidthSpace;
                    <span class="b3-menu__label">
                    ${类型名}
                    </span></button>
                    <button class="b3-menu__separator"></button>
                    `
                  )
                  window.siyuan.menus.menu.popup(坐标函数(事件),坐标函数(事件).isLeft)
                  window.siyuan.menus.menu.element.classList.remove('fn__none')
                  自定义菜单[类型名].判断函数= ()=>{return false}
                }else{
                  自定义菜单[类型名].判断函数= ()=>{return false}

                }
            },监听选项?监听选项:undefined)
        }
    )
    return 自定义菜单[类型名]
}

export default 自定义菜单;

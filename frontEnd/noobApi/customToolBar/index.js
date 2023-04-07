import { 生成单个dom元素 } from "../util/dom.js";
let 工具栏元素 = window.parent.document.getElementById("toolbar");
let 标题元素 = window.parent.document.getElementById("drag");
let 自定义窗口工具栏 = {
  注册工具栏按钮: (位置, 配置) => {
    let 按钮模板 = `
          <div  class="toolbar__item b3-tooltips b3-tooltips__sw" aria-label="${
            配置.提示 || 配置.label
          }">
      <svg><use xlink:href="${配置.图标 || 配置.icon}"></use></svg>
  </div>
          `;
    let 元素 = 生成单个dom元素(
      按钮模板,
      配置.事件配置 || 配置.events || 配置.callback || 配置.点击回调函数
    );
    if (配置.元素) {
      元素.innerHTML = "";
      元素.appendChild(配置.元素);
    }
    if (配置.element) {
      元素.innerHTML = "";
      元素.appendChild(配置.element);
    }
    if (位置 === 0 || 位置 === "left") {
      元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__se");
      工具栏元素.insertBefore(元素, 标题元素);
    } else if(位置===1||位置==='right') {
      元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__sw");
      insertAfter(元素, 标题元素);
    }else{
      let 插入位置元素
      try{
        插入位置元素=工具栏元素.querySelector(位置)
        console.log(插入位置元素,工具栏元素)
      }catch(e){
        console.error(e)
        插入位置元素=标题元素
      }
      插入位置元素=插入位置元素||标题元素
      插入位置元素.offsetX<=标题元素.offsetX?元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__se"):元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__sw")
      工具栏元素.insertBefore(元素, 插入位置元素);
    }
  },
  registItem: (...args) => {
    自定义窗口工具栏.注册工具栏按钮(...args);
  },
  移动工具栏图标(元素,位置){
    if (位置 === 0 || 位置 === "left") {
      元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__se");
      工具栏元素.insertBefore(元素, 标题元素);
    } else if(位置===1||位置==='right') {
      元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__sw");
      insertAfter(元素, 标题元素);
    }else{
      let 插入位置元素
      try{
        插入位置元素=工具栏元素.querySelector(位置)
        
      }catch(e){
        console.error(e)
        插入位置元素=标题元素
      }
      //插入位置元素=插入位置元素||标题元素
      插入位置元素.offsetX<=标题元素.offsetX?元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__se"):元素.setAttribute("class", "toolbar__item b3-tooltips b3-tooltips__sw")
      工具栏元素.insertBefore(元素, 插入位置元素);
    }
  }
};
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

export default 自定义窗口工具栏;

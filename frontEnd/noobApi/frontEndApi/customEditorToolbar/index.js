import {
  获取工具栏对应protyle,
  获取工具栏对应range,
  获取工具栏对应块元素,
} from "./util.js";

let 按钮注册表 = [];
let 工具栏状态 = {};
function 生成工具栏按钮元素(按钮配置) {
  if (!按钮配置) {
    return;
  }
  let 临时容器 = window.parent.document.createElement("div");
  临时容器.innerHTML = `
        <button 
            class="protyle-toolbar__item b3-tooltips b3-tooltips__n" 
            data-type="${按钮配置.类型}"
            data-item-id="${按钮配置.id}" 
            aria-label="${按钮配置.提示}"
        >
            <svg>
                <use xlink:href="${按钮配置.图标}"></use>
            </svg>
        </button>

	`;
  //起个名字让它好记一点嘛
  let 按钮元素 = 临时容器.firstElementChild;
  按钮元素.addEventListener("click", (e) => {
    工具栏状态.当前工具栏元素 = e.currentTarget.parentElement;
    工具栏状态.当前块元素 = 获取工具栏对应块元素(工具栏状态.当前工具栏元素);
    工具栏状态.当前protyle = 获取工具栏对应protyle(工具栏状态.当前工具栏元素);
    工具栏状态.当前range = 获取工具栏对应range(工具栏状态.当前工具栏元素);
    按钮配置.点击回调函数(e);
  });
  return 按钮元素;
}
function 插入自定义按钮(工具栏元素) {
  按钮注册表.forEach((按钮配置) => {
    //避免重复插入嘛
    if (
      按钮配置 &&
      !工具栏元素.querySelector(`[data-item-id="${按钮配置.id}"]`)
    ) {
      let 按钮元素 = 生成工具栏按钮元素(按钮配置);
      按钮元素.所在工具栏元素 = 工具栏元素;
      工具栏元素.appendChild(生成工具栏按钮元素(按钮配置));
    }
  });
}

function 注册自定义工具栏按钮(按钮配置) {
  if (!按钮配置) {
    return;
  }
  let 已存在配置 = 按钮注册表.find((待检查项) => {
    return 待检查项 && 待检查项.id == 按钮配置.id;
  });
  if (!已存在配置) {
    按钮注册表.push(按钮配置);
  }
}
function 反注册自定义工具栏按钮(按钮配置) {
  let id = 按钮配置;
  if (按钮配置 && 按钮配置.id) {
    id = 按钮配置.id;
  }
  按钮注册表.forEach((item, i) => {
    if (item) {
      item.id == id ? (按钮注册表[i] = undefined) : null;
    }
  });
  window.parent.document
    .querySelectorAll(`button.protyle-toolbar__item[data-item-id="${id}"]`)
    .forEach((el) => {
      el.remove();
    });
}

function 修改工具栏() {
  let 工具栏元素序列 =
    window.parent.document.querySelectorAll(".protyle-toolbar");
  工具栏元素序列.forEach((工具栏元素) => {
    插入自定义按钮(工具栏元素);
  });
}

window.parent.document.addEventListener("click", 修改工具栏);

export default {
  注册按钮: 注册自定义工具栏按钮,
  registItem: 注册自定义工具栏按钮,
  反注册按钮: 反注册自定义工具栏按钮,
  unRegistItem: 反注册自定义工具栏按钮,
  工具栏状态: 工具栏状态,
  toolbarStatus: 工具栏状态,
};

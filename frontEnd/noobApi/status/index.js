let 界面状态 = {
  鼠标状态: {
    最后鼠标点击元素: {},
    最后鼠标点击事件: {},
    当前鼠标坐标: {},
    当前鼠标元素: {},
  },
  键盘状态: {
    最后键盘输入元素: {},
    最后键盘输入事件: {},
  },
};
if (!window._noobInternalRegistry) {
  window._noobInternalRegistry = [];
  window._noobInternalRegistry.push({
    moduleName: "uiStatus",
    version: "1.0.1",
    value: 界面状态,
  });
} else {
  let 现有界面状态 = window._noobInternalRegistry.find((item) => {
    return item && item.moduleName === "uiStatus";
  });
  if (现有界面状态) {
    界面状态 = 现有界面状态.value;
  } else {
    window._noobInternalRegistry.push({
      moduleName: "uiStatus",
      version: "1.0.1",
      value: 界面状态,
    });
  }
}
let 鼠标单击回调 = (鼠标事件) => {
  界面状态.鼠标状态.最后鼠标点击元素 = 鼠标事件.target;
  界面状态.鼠标状态.最后鼠标点击事件 = 鼠标事件;
};
window.parent.document.addEventListener(
  "click",
  (event) => {
    鼠标单击回调(event);
  },
  true
);
window.parent.document.addEventListener(
  "contextmenu",
  (event) => {
    鼠标单击回调(event);
  },
  true
);
let 键盘事件回调 = (键盘事件) => {
  界面状态.键盘状态.最后键盘输入元素 = 键盘事件.target;
  界面状态.键盘状态.最后键盘输入事件 = 键盘事件;
};
window.parent.document.addEventListener(
  "beforeinput",
  (键盘事件) => {
    键盘事件回调(键盘事件);
  },
  true
);
export { 界面状态 as 界面状态 };

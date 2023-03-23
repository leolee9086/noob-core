import { DOM监听器 } from "../util/DOMwatcher";
export default function 添加自定义随机背景图() {
  async function 生成随机背景链接() {
    let 请求响应 = await fetch("/snippets/assets/backgrounds/");
    let 临时dom = new DOMParser().parseFromString(
      await 请求响应.text(),
      "text/html"
    );
    let 图片链接数组 = 临时dom.querySelectorAll("a");
    let 随机链接 =
      图片链接数组[
        Math.floor(Math.random() * 图片链接数组.length)
      ].getAttribute("href");
    随机链接 = "/snippets/assets/backgrounds/" + 随机链接;
    return 随机链接;
  }
  window.parent.document.addEventListener("contextmenu", 更换随机背景图);
  async function 更换随机背景图(event, 元素) {
    let 触发目标 = event.target;
    if (元素) {
      触发目标 = 元素;
    }
    if (触发目标.tagName == "svg" || 触发目标.tagName == "use") {
      更换随机背景图(event, 触发目标.parentElement);
      return;
    }
    if (
      触发目标.classList.value == "protyle-icon b3-tooltips b3-tooltips__sw"
    ) {
      let 随机链接 = await 生成随机背景链接();
      触发目标.parentElement.parentElement
        .querySelector("img")
        .setAttribute("style", "");
      触发目标.parentElement.parentElement
        .querySelector("img")
        .setAttribute("src", 随机链接);
      fetch("/api/attr/setBlockAttrs", {
        method: "post",
        body: JSON.stringify({
          id: 触发目标.parentElement.parentElement.parentElement.getAttribute(
            "data-node-id"
          ),
          attrs: { "title-img": `background-image:url(${随机链接})` },
        }),
      });
    }
  }
}
let 自定义题图按钮 = [];
export function 反注册自定义题图按钮(按钮选项) {
  //不要直接给按钮选项赋值了,可能会被打死的
  let 按钮id = 按钮选项;
  if (按钮选项.id) {
    按钮id = 按钮选项.id;
  }
  自定义题图按钮.forEach((button, i) => {
    if (button) {
      //要移除时候需要注意对象引用关系嗷
      button.id == 按钮id ? (自定义题图按钮[i] = undefined) : null;
      document
        .querySelectorAll(`.protyle-icons span[data-item-id="${按钮id}"]`)
        .forEach((el) => {
          console.log(el);
          el.remove();
        });
    }
  });
  console.log(自定义题图按钮);
}
export function 注册自定义题图按钮(按钮选项) {
  自定义题图按钮.push(按钮选项);
}
function 注入全部题图按钮() {
  let 题图按钮数组 = window.parent.document.querySelectorAll(
    ".protyle-background__img .protyle-icons"
  );
  题图按钮数组.forEach((题图按钮组) => {
    注入题图按钮(题图按钮组);
  });
}
function 注入题图按钮(按钮组) {
  自定义题图按钮.forEach((按钮配置) => {
    if (!按钮配置) {
      return;
    }
    try {
      if (
        按钮组.querySelector(`[data-type='random']`) &&
        !按钮组.querySelector(`[data-item-id=${按钮配置.id}]`)
      ) {
        生成题图按钮(按钮配置, 按钮组);
      }
    } catch (e) {
      console.error(e);
    }
  });
  if (按钮组.parentElement.querySelector("img").getAttribute("src")) {
    !按钮组.parentElement
      .querySelector("img")
      .getAttribute("src")
      .startsWith("data:")
      ? 按钮组.querySelector('[data-type="position"]')
        ? 按钮组
            .querySelector('[data-type="position"]')
            .classList.remove("fn__none")
        : null
      : null;
  }
}
function 生成题图按钮(按钮配置, 按钮组) {
  if (!按钮配置) {
    return;
  }
  let span = window.parent.document.createElement("span");
  span.setAttribute("class", "protyle-icon b3-tooltips b3-tooltips__sw ");
  span.setAttribute("data-item-id", 按钮配置.id);
  span.setAttribute("aria-label", 按钮配置.label);
  span.setAttribute("style", "relative");
  span.addEventListener("click", 按钮配置.回调函数);
  span.innerHTML = `<svg><use xlink:href="${按钮配置.图标}"></use></svg>`;
  let 随机按钮 = 按钮组.querySelector("[aria-label='上下拖动图片以调整位置']");
  按钮组.insertBefore(span, 随机按钮);
}
//setInterval(注入全部题图按钮,300)

new DOM监听器({
  监听目标: ".protyle-background__img",
  监听器回调: 注入全部题图按钮,
});
function 判定目标(判定元素) {
  if (!判定元素) {
    判定元素 = 界面状态.鼠标状态.最后鼠标点击元素;
  }
  if (判定元素) {
    switch (判定元素.tagName) {
      case "use":
        return 判定目标(判定元素.parentElement);
      case "svg":
        return 判定目标(判定元素.parentElement);
      case "SPAN":
        return 判定目标(判定元素.parentElement);
      case "DIV":
        if (
          判定元素.classList &&
          (判定元素.classList.contains("protyle-icons") ||
            判定元素.classList.contains("protyle-background__img"))
        ) {
          return true;
        }
      case "img":
        if (
          判定元素.parentElement &&
          (判定元素.parentElement.classList ||
            判定元素.parentElement.classList("protyle-background__img"))
        ) {
          return true;
        }
    }
  }
}

document.addEventListener("mouseover", (event) => {
  if (判定目标(event.target)) {
    注入全部题图按钮();
  }
});

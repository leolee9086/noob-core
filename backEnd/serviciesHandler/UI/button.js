import { getIcon } from "../util/getIcon.js";
export default class Button {
  constructor(options) {
    this.options = options;
    this.icon = options.icon || getIcon(options.path);
    this.buildElement();
    this.bindEvent();
  }

  buildElement() {
    let div = document.querySelector("#status .fn__flex-1");
    if (div.querySelector(".service-container")) {
      div = div.querySelector(".service-container");
    } else {
      let container = document.createElement("div");
      let style = `
                
            `;
      container.setAttribute("class", "service-container fn_flex ");
      container.setAttribute("style", style);
      div.append(container);
      div = container;
    }
    this.container = div;
    this.element = document.createElement("button");

    this.element.setAttribute("class", "b3-tooltips b3-tooltips__w");
    this.element.setAttribute("data-serviceID", this.options.id);

    this.element.setAttribute("aria-label", `单击隐藏/显示服务窗口`);

    this.element.innerHTML = `<img src="${this.icon}" ></img>`;
    this.container.append(this.element);
    this.container.style = `
        margin:auto;
        left:calc(50vw - ${
          this.container.querySelectorAll("button").length * 10
        }px)
        `;
  }
  bindEvent() {
    this.element.addEventListener("click", () => {
      if (this.service && !this.service.host.isDestroyed()) {
        if(this.service.showing){
          this.service.hide()
        }else{
          this.service.show()
        }
      }
    });
    this.element.addEventListener("dblclick", () => {
      if (this.service) {
        this.service.reload();
        this.setColor("success");
      }
    });
  }
  remove() {
    this.setColor("warning");
  }
  destroy() {
    this.element.remove();
  }
  setColor(color) {
    this.element.style.backgroundColor = `var(--b3-card-${color}-background)`;
    this.element.style.borderColor = `var(--b3-card-${color}-color)`;
    if (color == "error") {
      this.element.setAttribute(
        "aria-label",
        `${this.icon.split("\\")[this.icon.split("\\").length - 2]}
服务已经关闭,双击重新启用`
      );
    } else {
      this.element.setAttribute(
        "aria-label",
        `${this.icon.split("\\")[this.icon.split("\\").length - 2]}
单击隐藏/显示服务窗口`
      );
    }
    setTimeout(() => {
      this.element.style.borderColor = "";

      this.element.style.backgroundColor = "";
    }, 1000);
  }
}
export { Button as serviceButton };

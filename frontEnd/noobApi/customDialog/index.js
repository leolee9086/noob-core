import { genUUID } from "../util/genID.js";

export class Dialog {
  constructor(
    options = {
      title: undefined,
      transparent: undefined,
      content: undefined,
      width: undefined,
      height: undefined,
      destroyCallback: undefined,
      disableClose: undefined,
      disableAnimation: undefined,
    }
  ) {
    this.disableClose = options.disableClose;
    this.id = genUUID();
    window.siyuan.dialogs.push(this);
    this.destroyCallback = options.destroyCallback;
    this.options = options;
  }
  set title(string){
    this.element.querySelector('.b3-dialog__header').innerHTML=string
  }
  initElement() {
    this.element = window.parent.document.createElement("div");

    this.element.innerHTML = `<div class="b3-dialog">
<div class="b3-dialog__scrim"${
      this.options.transparent ? 'style="background-color:transparent"' : ""
    }></div>
<div class="b3-dialog__container" id="pluginCustomPanel" style="width:${this.options.width || "auto"};overflow:scroll">
  <svg class="b3-dialog__close fn__a${
    this.disableClose ? " fn__none" : ""
  }"><use xlink:href="#iconClose"></use></svg>
  <div class="b3-dialog__header${
    this.options.title ? "" : " fn__none"
  }" onselectstart="return false;">${this.options.title || ""}</div>
  <div class="b3-dialog__form" style="height:${this.options.height || "60vh"};">${
      this.options.content
    }</div>
</div></div>`;

    this.element
      .querySelector(".b3-dialog__scrim")
      .addEventListener("click", (event) => {
        if (!this.disableClose) {
          this.destroy();
        }
        event.preventDefault();
        event.stopPropagation();
        // https://ld246.com/article/1657969292700/comment/1658147006669#comments
        window.siyuan.menus.menu.remove();
      });
    if (!this.disableClose) {
      this.element
        .querySelector(".b3-dialog__close")
        .addEventListener("click", (event) => {
          this.destroy();
          event.preventDefault();
          event.stopPropagation();
        });
    }
    this.formElement=this.element.querySelector('.b3-dialog__form')

  }
  show() {
    window.parent.document.body.append(this.element);
    if (this.options.disableAnimation) {
      this.element.classList.add("b3-dialog--open");
    } else {
      setTimeout(() => {
        this.element.classList.add("b3-dialog--open");
      });
    }
    // https://github.com/siyuan-note/siyuan/issues/6783
    window.siyuan.menus.menu.remove();
  }
  destroy() {
    this.element.remove();
    // https://github.com/siyuan-note/siyuan/issues/6783
    window.siyuan.menus.menu.remove();
    if (this.destroyCallback) {
      this.destroyCallback();
    }
    window.siyuan.dialogs.find((item, index) => {
      if (item.id === this.id) {
        window.siyuan.dialogs.splice(index, 1);
        return true;
      }
    });
  }

  bindInput(inputElement) {
    inputElement.focus();
    inputElement.addEventListener("keydown", (event) => {
      if (event.isComposing) {
        event.preventDefault();
        return;
      }
      if (event.key === "Escape") {
        this.destroy();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (event.key === "Enter" && enterEvent) {
        this.enterEvent?this.enterEvent(enterEvent):null;
        event.preventDefault();
      }
    });
  }
  clear(){
    this.formElement.innerHTML=''
  }
  addItem(element){
    if(element instanceof HTMLElement){
      this.formElement.appendChild(element)
    }
    else if(typeof(element)=='function'){
      this.formElement.appendChild(()=>{element()})
    }else if(element.element){
      this.formElement.appendChild(element.element)

    }
  }
}

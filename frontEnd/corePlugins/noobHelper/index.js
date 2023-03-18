import { Plugin, frontEndApi } from "siyuan";
export default class noobHelper extends Plugin {
  constructor() {
    super();
    this.makeHelp();
  }
  async makeHelp() {
    let helperTimeOut = 0;
    await this.getConfig()
    document.addEventListener("mouseleave", () => {
      helperTimeOut = 0;
    });
    document.addEventListener("mouseover", (e) => {
      this.helpTargetEvent = e;
    });
    document.addEventListener("mousemove", (e) => {
        this.helpPositionEvent = e;
      });
    setInterval(() => {
      helperTimeOut += 1;
      helperTimeOut > 2 ?(()=>{ this.popHelp();helperTimeOut=0 })(): null;
    }, 1000);
    
  }
  popHelp() {
    this.helpTargetEvent&&this.config.forEach(
        helpItem=>{
        if(Array.from(document.querySelectorAll(helpItem.selector)).indexOf(this.helpTargetEvent.fromElement)>=0){
            let div= document.createElement('div')
            div.innerHTML=`<a href="siyuan://blocks/${helpItem.helpID}">这是什么</a>`
            window.siyuan.menus.menu.remove()
            window.siyuan.menus.menu.append(div)
            window.siyuan.menus.menu.element.style.left=this.helpPositionEvent.clientX+20+'px'
            window.siyuan.menus.menu.element.style.top=this.helpPositionEvent.clientY+20+'px'
            window.siyuan.menus.menu.element.classList.remove('fn__none')
            div.addEventListener('click',()=>{window.siyuan.menus.menu.remove()})
        }
        }
      )
  }
}

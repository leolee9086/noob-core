import { Tab } from "../customTab/index.js";
const dockToJSON = (dock) => {
    const json = [];
    const subDockToJSON = (index) => {
      const data = [];
      dock.element
        .querySelectorAll(`span[data-index="${index}"]`)
        .forEach((item) => {
          data.push({
            type: item.getAttribute("data-type"),
            size: {
              height: parseInt(item.getAttribute("data-height")),
              width: parseInt(item.getAttribute("data-width")),
            },
            show: item.classList.contains("dock__item--active"),
            icon: item
              .querySelector("use")
              .getAttribute("xlink:href")
              .substring(1),
            hotkeyLangId: item.getAttribute("data-hotkeylangid"),
          });
        });
      return data;
    };
    const data0 = subDockToJSON(0);
    const data2 = subDockToJSON(1);
    if (data0.length > 0 || data2.length > 0) {
      // https://github.com/siyuan-note/siyuan/issues/5641
      json.push(data0);
    }
    if (data2.length > 0) {
      json.push(data2);
    }
    return {
      pin: dock.pin,
      data: json,
    };
  };
class customDock  {
  constructor(dock) {
    this.dock = dock
    this.内置面板列表=['file','bookmark','tag',"outline","graph","globalGraph", "backlink","inbox"]
    this.realToggleModel = this.dock.toggleModel
    this.dock.toggleModel = this.customToggle.bind(this)
    this.dock.customToggle = new Function("function " +this.realToggleModel.toString()).bind(this.dock)
    this.position=this.dock.position
    console.log(this)
  }
  customToggle(type,show = false, close = false){
    console.log(type,show,close,this.内置面板列表.indexOf(type))
    if(!type){
        return
    }
    if(this.内置面板列表.indexOf(type)>=0){
        this.realToggleModel.bind(this.dock)(type,show,close)
    }
    else{
        this.toggleModel(type,show,close)
    }
  }
  toggleModel(type,show,close){
    
  }
  getClassDirect(index) {
    let direct = "e";
    switch (this.position) {
        case "Right":
            direct = "w";
            break;
        case "Top":
            if (index === 0) {
                direct = "se";
            } else {
                direct = "sw";
            }
            break;
        case "Bottom":
            if (index === 0) {
                direct = "ne";
            } else {
                direct = "nw";
            }
            break;
    }
    return direct;
}
  addCustom(param){
    if(!param.type){
        return
    }
    if(!param.render){
        return
    }
    let target=this.dock.element.querySelector('div.fn__flex-1')
    
    let html = `<span data-height="0" 
    data-width="240" 
    data-custom-type="${param.type}" 
    data-custom-index="${param.index}" 
    data-custom-hotkeylangid="${param.hotkeyLangId}" 
    class="dock__item${param.show ? " dock__item--active" : ""} 
    b3-tooltips b3-tooltips__${this.getClassDirect(param.index)}" 
    aria-label="${param.label}">
    <svg><use xlink:href="#${param.icon}"></use></svg>
</span>`;
    console.log(this.dock.element,target)
    target.insertAdjacentHTML(
        'beforeEnd',html
    )
    target.addEventListener('click',(e)=>{
      console.log(e.target)
      e.stopPropagation()
      if(param.render && param.render instanceof Function){
        let tab 
        tab = new Tab({
          callback(tab){
            param.render(tab)
          }
        })
        let wnd = this.dock.layout.children[0] 
      }
    })
  }

}

export {customDock as customDock}

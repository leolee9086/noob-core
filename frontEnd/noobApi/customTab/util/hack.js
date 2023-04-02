import { 展平Layout } from "./Tab.js";
export let tab注册表= {}
/*export const hackLayout=async ()=>{
    let layouts = 展平Layout()
    layouts.forEach(
        layout=>{
            if(layout.docIcon&&layout.docIcon.indexOf('type:')){

                try {
                    let {type,data} = JSON.parse(layout.docIcon)
                    if(tab注册表[type]&&!layout.inited){
                        let customTab = tab注册表[type]
                        let tab = new  customTab(data)
                        tab.inited = true
                        layout.parent.addTab(tab)
                        layout.parent.removeTab(layout.id)
                    }
                }catch(e){
                  //console.error(e)
                }
            }
        }
    )
}
setInterval(hackLayout,500)
hackLayout()*/
export const hackLayout = async () => {
    let layouts = await 展平Layout();
    for (let layout of layouts) {
      let docIcon = layout.docIcon;
      if (!docIcon || !docIcon.startsWith("type:")) continue;
  
      let { type, data } = JSON.parse(docIcon.substring(5));
      if (!tab注册表[type] || layout.inited) continue;
  
      let customTab = tab注册表[type];
      let tab = new customTab(data);
      tab.inited = true;
      layout.parent.addTab(tab);
      layout.parent.removeTab(layout.id);
    }
  };
  
  await hackLayout();
  setInterval(hackLayout,500)
  
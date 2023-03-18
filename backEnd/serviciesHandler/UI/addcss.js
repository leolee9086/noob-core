
export let addcss=(href)=>{
    let link=  document.createElement('link')
    batchSetAttribute({
        type:"text/css",
        rel:"stylesheet",
        href:href
    })
    document.head.appendChild(link)
}
export let addcssDirect=(options)=>{
    let {content}=options
    if(options.path){
        content=require('fs').readFileSync(options.path)
    }
    let style = document.createElement('style')
    style.innerHTML=content
    document.head.appendChild(style)
}
export function batchSetAttribute(element, attributes) {
    Object.getOwnPropertyNames(attributes).forEach((name) => {
      element.setAttribute(name, attributes[name]);
    });
  }
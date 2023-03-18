export function 生成单个dom元素(字符串,事件配置,额外配置) {
    let 临时容器 = window.parent.document.createElement('div')
    临时容器.innerHTML = 字符串
    //起个名字让它好记一点嘛
    let DOM元素 = 临时容器.firstElementChild
    //当事件配置只有一个函数的时候,直接绑定到click事件上,兼容之前的函数
    if (事件配置 instanceof Function) {
        DOM元素.addEventListener("click", 事件配置)
    }
    else {
        事件配置 && Object.keys(事件配置).forEach(
            事件名 => {
                let 回调函数 = 事件配置[事件名]
                DOM元素.addEventListener(事件名, 回调函数)
            }
        )
    }
    额外配置 && Object.keys(额外配置).forEach(
        属性名 => {
            DOM元素.setAttribute(属性名,额外配置[属性名])
        }
    )

    return DOM元素
}
export function 获取最近上级块id(target) {
    if (target.getAttribute && target.getAttribute("data-node-id")) {
        return target.getAttribute("data-node-id")
    }
    else if (target.parentElement) {
        return 获取最近上级块id(target.parentElement)
    }
}

import { 界面状态 } from '../util/statusWrap.js'
import {自定义菜单原型} from '../customMenu.js'
let 编辑器菜单 = new 自定义菜单原型()

function 判断是否编辑器菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断是否编辑器菜单(判定元素.parentElement)
            case 'svg':
                return 判断是否编辑器菜单(判定元素.parentElement)
            case 'SPAN':
                return 判断是否编辑器菜单(判定元素.parentElement)

            case 'BUTTON':
                return 判断是否编辑器菜单(判定元素.parentElement)
            case 'DIV':
                if (判定元素.classList && 判定元素.classList.contains('protyle-title')) {
                    编辑器菜单.菜单状态.当前块id = 判定元素.parentElement.querySelector('.protyle-background').getAttribute('data-node-id')
                }
                return 判定元素.classList && 判定元素.classList.contains('protyle-title')
        }
    }
}

编辑器菜单.判断函数 = 判断是否编辑器菜单
export {编辑器菜单 as 编辑器菜单}

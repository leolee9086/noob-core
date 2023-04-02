import { 界面状态 } from '../util/statusWrap.js'
import {自定义菜单原型} from '../customMenu.js'
let 文档树菜单 = new 自定义菜单原型()

function 判断是否文档树菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断是否文档树菜单(判定元素.parentElement)
            case 'svg':
                return 判断是否文档树菜单(判定元素.parentElement)
            case 'SPAN':
                if(判定元素.classList&&判定元素.classList.contains('b3-list-item__action')&&判定元素.parentElement.querySelector(`[aria-label="${window.siyuan.languages.newSubDoc}"]`))
                {
                    获取菜单状态(判定元素)
                    return true
                }
        }
    }
}
function 获取菜单状态(判定元素){
    文档树菜单.菜单状态.当前块id= 判定元素.parentElement.getAttribute('data-node-id')
    文档树菜单.菜单状态.当前文档id = 判定元素.parentElement.getAttribute('data-node-id')
    文档树菜单.菜单状态.当前笔记本id =获取笔记本id(判定元素)
}
function 获取笔记本id(判定元素){
    if(判定元素.getAttribute('data-url')){
        return 判定元素.getAttribute('data-url')
    }
    else {
        return 获取笔记本id(判定元素.parentElement)
    }
}
文档树菜单.判断函数 = 判断是否文档树菜单

export {文档树菜单 as 文档树菜单}

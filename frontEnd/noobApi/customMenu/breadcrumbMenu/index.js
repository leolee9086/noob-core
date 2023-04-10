import { 界面状态 } from '../util/statusWrap.js'
import {自定义菜单原型} from '../customMenu.js'
let 面包屑菜单 = new 自定义菜单原型()

function 判断是否面包屑菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素&&判定元素.parentElement&&判定元素!==判定元素.parentElement) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断是否面包屑菜单(判定元素.parentElement)
            case 'svg':
                return 判断是否面包屑菜单(判定元素.parentElement)
            case 'SPAN':
                return 判断是否面包屑菜单(判定元素.parentElement)
            case 'BUTTON':
                if(判定元素.parentElement.classList&&判定元素.parentElement.classList.value =='protyle-breadcrumb'){
                    面包屑菜单.菜单状态.当前块id = 判定元素.parentElement.parentElement.querySelector('.protyle-background').getAttribute('data-node-id')
                    return true
                }
        }
    }
}
面包屑菜单.判断函数 = 判断是否面包屑菜单
export {面包屑菜单 as 面包屑菜单}

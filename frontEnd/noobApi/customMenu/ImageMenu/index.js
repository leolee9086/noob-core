import { 界面状态 } from '../../../util/statusWrap.js'
import {自定义菜单原型} from '../customMenu.js'
let 图片菜单 = new 自定义菜单原型()

function 判断是否图片菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'use':
                return 判断是否图片菜单(判定元素.parentElement)
            case 'svg':
                return 判断是否图片菜单(判定元素.parentElement)
            case 'SPAN':
                if(判定元素.dataset&&判定元素.dataset.type=='img'&&判定元素.classList.value=='img'){
                    图片菜单.菜单状态.图片容器 = 判定元素.querySelector('img')
                    return true 
                }
            else return 判断是否图片菜单(判定元素.parentElement)                
        }
    }
}
图片菜单.判断函数 = 判断是否图片菜单
export {图片菜单 as 图片菜单}
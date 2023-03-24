import { 界面状态 } from '../../status/index.js'
import {获取最近上级块id} from '../../util/dom.js'
import {自定义菜单原型} from '../customMenu.js'
let 引用块菜单 = new 自定义菜单原型()
function 判断是否引用块菜单(判定元素) {
    if (!判定元素) {
        判定元素 = 界面状态.鼠标状态.最后鼠标点击元素
    }
    if (判定元素) {
        switch (判定元素.tagName) {
            case 'SPAN':
                引用块菜单.菜单状态.引用目标id= 判定元素.getAttribute('data-id')
                引用块菜单.菜单状态.引用类型 = 判定元素.getAttribute('data-subtype')
                引用块菜单.菜单状态.所在块id = 获取最近上级块id(判定元素)
                return (判定元素.getAttribute('data-type')&&判定元素.getAttribute('data-type').indexOf('block-ref')>-1)
        }
    }
}
引用块菜单.判断函数=判断是否引用块菜单
export {引用块菜单 as 引用块菜单}
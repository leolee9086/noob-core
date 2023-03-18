import { 展平Layout } from "./Tab.js";
import { 重复执行直到返回 } from '../../util/common.js'

export   function 获取protyle原型(){
    let layouts = 展平Layout()   
    let layout = layouts.find(
        item=>{return item&&item.model&&item.model.editor}
    )
    if(layout){
        return layout.model.editor.constructor
    }
}
let  Protyle = await 重复执行直到返回(获取protyle原型,500,'这是用于获取内部类型的函数,如果它执行多次,可以尝试打开一个页签来消除这个警告')
export {Protyle as Protyle}
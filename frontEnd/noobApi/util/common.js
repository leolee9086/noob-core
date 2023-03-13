export function 展平树(tree){
    let array = []
    function flatten(tree) {
        if (tree.children && tree.children instanceof Array) {
            tree.children.forEach(
                item => {
                    array.push(item)
                    if (item.children && item.children instanceof Array) {
                        flatten(item)
                    }
                }
            )
        }
    }
    flatten(tree)
    return array
}
export function 重复执行直到返回(函数,间隔){
    let 执行次数 =0 
    return new Promise((resolve, reject) => {
        if(!间隔){
            间隔 = 500
        }
        let 工具函数 = setInterval(async() => {
            try{
                执行次数+=1
                if(执行次数>10){
                    console.error(函数,'执行过多次，请检查')
                }
                let 执行结果 = await 函数()
                if(执行结果!==undefined){
                    执行次数=0
                    clearInterval(工具函数)
                    resolve(执行结果)
                }
            }catch(e){
                执行次数=0

                clearInterval(工具函数)
                reject(e)
            }
        }, 间隔);
    })
}
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
export async function 重复执行直到返回(func) {
  let result;
  const DELAY_MS = 500; // 设置等待时间为 10ms
  do {
    result = await func();
    if (result === undefined) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  } while (result === undefined);
  return result;
}
/*export function 重复执行直到返回(函数,间隔,警告){
    let 执行次数 =0 
    return new Promise((resolve, reject) => {
        if(!间隔){
            间隔 = 500
        }
        let 工具函数 = setTimeout(async() => {
            try{
                执行次数+=1
                if(执行次数>10){
                    console.warn(函数,!警告?'执行过多次，请检查':警告)
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
}*/
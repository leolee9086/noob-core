export function readJsonSync(jsonPath){
    let content = require('fs').readFileSync(jsonPath,'utf-8')
    if(content){
    return JSON.parse(content)
    }else{
        return {}
    }
}
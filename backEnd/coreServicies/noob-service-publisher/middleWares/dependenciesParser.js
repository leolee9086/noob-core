
const Mime = require('Mime');
const MagicString = require('magic-string');
const fs =require("fs-extra")
const fg =require('fast-glob')
const importParser =  require('es-module-lexer')

function parseImport(code) {
    let [imports, exports] = importParser.parse(code)
    let codeMagicString = new MagicString(code)
    imports.forEach(
        导入声明 => {
            codeMagicString.overwrite(导入声明.s, 导入声明.e, 重写导入(导入声明))
        }
    )
    return codeMagicString.toString()
}
function 重写导入(导入声明) {
    let name = 导入声明.n
    if (name.startsWith('/')) {
        name = '/deps' + name
    }
    name = name.replace(/https\:\/\/esm.sh/g, "/deps/")
    return name
}

export default  function addDevSurppoert(app) {
    app.use('/deps', async (req, res) => {
        let filePath = (workspaceDir + `/conf/noobConf/deps/esm/${req.url}`).replace(/\?/g, '.')
        let fixPath = (workspaceDir + `/conf/noobConf/deps/esmFix/${req.url}`).replace(/\?/g, '.')
        if(fs.existsSync(fixPath)){
            filePath=fixPath
        }
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, "utf-8")
            let mime = content.split("\n")[0] 
            if(!mime.indexOf("application")>=0&&!mime.indexOf("application")>=0){
                mime='application/javascript; charset=utf-8'
            }
            console.warn(`模块${req.url}重定向到noob设置文件夹/deps/esm`)
            res.setHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53")

            try{
            res.setHeader("content-type", mime.replace("/*", "").replace("*/", ""))
            }catch(e){
                res.setHeader("content-type", 'application/javascript; charset=utf-8')

                
            }
            res.end(content.replace(mime, ""))
        }
        else {
            console.warn(`本地未找到模块${req.url}重定向到esm.sh,如果出现问题,尝试手动下载${'https://esm.sh' + req.url}  ,或者尝试手动安装`)
            /*let source = await */fetch('https://esm.sh' + req.url+'?bundle', {
                "method": "GET",
                headers:{"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.27"}
            }).then(
                source=>{return source.text()}
            ).then(
                content=>{
                   // content = "/*" + mime + "*/" + "\n" + content
                    res.setHeader("content-type", 'application/javascript; charset=utf-8')
                    content = parseImport(content)
                    res.end(content)
                    try{
                        mkfilep(filePath, content)
                    }catch(e){
                        console.error(e)
                    }
        
                }
            )
        }
    })

}
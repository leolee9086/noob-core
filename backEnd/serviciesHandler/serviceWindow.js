import { portPath } from '../../file/noobURL.js'
import { toAbsolute } from '../server/util/abs.js'
import { noob核心后端服务端口号, 思源核心服务端口号 } from '../server/util/port.js'
import {serviceButton} from './UI/button.js'
import { addcssDirect } from './UI/addcss.js'
import serverHost from './UI/window.js'
addcssDirect({
    content:`
    #status{
        height:50px;
        background-color: var(--b3-toolbar-background);
        color:var(--b3-toolbar-color)
    }
    #status div{
        margin:auto
    }
    .service-container{
        top:calc(100vh - 47.5px);
        position:absolute;
    }
    .service-container button{
        border-radius:10px;
        height:45px;
        width:45px;
        background-color: transparent ;
    }
    .service-container button:hover{
        background-color: var(--b3-theme-on-surface) ;
    }
    
    .service-container button img{
        width:35px;
        height:35px;
        margin:0;
        padding:0;
        left:2.5px;
        top:2.5px;
        Object-fit:contain
    }
    
    `
})
export let Service={
    New:async (options)=>{
        let button = new serviceButton(options)
        let host= button.service = new serverHost(options,button)
        let injectedPlugin
        if(require('fs').existsSync(options.path+'/inject.js')){
            try{
                console.log(options.URL+'inject.js')
                injectedPlugin = new (await import(options.URL+'inject.js'))['default']()
            }catch(e){
                console.log(e)
            }
        }
        return {
            button,
            host,
            bridge:host.mainBridge,
            injectedPlugin
        }
    }
}
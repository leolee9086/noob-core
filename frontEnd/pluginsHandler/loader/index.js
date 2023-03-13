import { loadCorePlugins  } from "./corePluginsLoader.js"
import { loadThemePlugins} from "./themePluginsLoader.js"
import { run } from "../registry/index.js"
const  pluginLoader = {
    loadCorePlugins ,
    loadThemePlugins,
    loadCustomPlugins:()=>{console.log('这个方法还没写完')},
    loadDevPlugins:()=>{console.log('这个方法还没写完')},
    run
}
export default pluginLoader
import { loadCorePlugins  } from "./corePluginsLoader.js"
import { loadThemePlugins} from "./themePluginsLoader.js"
import { loadCustomPlugins } from "./customPluginsLoader.js"
import { run } from "../registry/index.js"
const  pluginLoader = {
    loadCorePlugins ,
    loadThemePlugins,
    loadCustomPlugins,
    run
}
export default pluginLoader
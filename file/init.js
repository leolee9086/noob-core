import { exists,writeFile,initFile,mkdir } from "../frontEnd/polyfills/fs.js";
import {pluginsConfigPath,pluginReadmeDir, tempDir,customPluginDir, portPath} from './noobURL.js'
await initFile(pluginsConfigPath,'{}')
await initFile(portPath,'{}')
await mkdir(tempDir)
await mkdir(pluginReadmeDir)
import { workspaceDir,snippetsDir,currentThemeDir } from "./siyuanFile.js";
export let coreDir = noobenv.isInTheme?currentThemeDir+'/noobcore':snippetsDir+'/noobcore'
export let tempDir = workspaceDir+'/temp/noobTemp'
export let portPath = workspaceDir+'/port.json'
export let noobConfigDir = workspaceDir+ '/conf/noobConf'
export let pluginsConfigDir = noobConfigDir+ '/customPlugins.json'

import { workspaceDir } from "../file/siyuanFile"
let 当前主题元素 = document.querySelector('themeDefaultStyle')||document.querySelector('themeStyle')
export let currentTheme =当前主题元素.href.split('/')[-2]
export let currentThemeURL = `/appearance/themes/${currentTheme}`
export let currentThemeDir = workspaceDir+currentThemeURL
export let themePluginDir = currentThemeDir+'/themePlugins'
export let themePluginURL = currentThemeURL+'/themePlugins'
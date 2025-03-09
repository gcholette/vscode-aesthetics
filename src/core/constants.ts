import path = require("path")
import { Flavors } from "./types"
import { formatPath } from "./util"

const app_prefix = "[VS Code Aesthetics]"

export const msgs = {
  enable_base:  `${app_prefix} Base Theme Applied.`,
  success_inject: `${app_prefix} Success, window will reload to take effect.`,
  success_uninstall: `${app_prefix} Theme uninstalled, window will reload to take effect.`,
  error_inject: `${app_prefix} An error occured, could not add files.`,

  debug: (x: string) => `${app_prefix} [DEBUG] ${x}`,
}

export const injectedTagName = "vscode-aesthetics-1"
export const injectedFileName = "vscode-aesthetics.js"

export const localInjectablePath = __dirname + formatPath("/../injectable")
export const themePath = localInjectablePath + formatPath("/themes")
export const injectorPath = localInjectablePath + formatPath("/injectors")
export const originalThemePath = themePath + formatPath("/original.css")
export const tealThemePath = themePath + formatPath("/original-teal.css")
export const sunsetThemePath = themePath + formatPath("/original-sunset.css")
export const neonThemePath = themePath + formatPath("/original-neon.css")
export const emptyThemePath = themePath + formatPath("/empty.css")
export const cssInjectorPath = injectorPath + formatPath("/css-injector.js")
export const appDirectory = path.dirname(process.execPath)

export const workbenchPath = () => appDirectory + formatPath("/resources/app/out/vs/code/electron-sandbox/workbench/")

export const workbenchHtmlEsm = workbenchPath() + "workbench.esm.html"
export const workbenchHtml = workbenchPath() + "workbench.html"
export const scriptPath = workbenchPath() + injectedFileName
export const customScriptPath = workbenchPath() + injectedFileName

export const defaultWallpaperUrl = 'https://gitlab.com/gcholette/public-files/-/raw/main/backgrounds/static/cp1.png'

export const flavorMapping = {
  [Flavors.Original]: originalThemePath,
  [Flavors.Sunset]: sunsetThemePath,
  [Flavors.Neon]: neonThemePath,
  [Flavors.Teal]: tealThemePath,
  [Flavors.Empty]: emptyThemePath,
}
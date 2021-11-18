import path = require("path")
import { formatPath } from "./util"

const app_prefix = "[VS Code Aesthetics]"

export const msgs = {
  enable_all: `${app_prefix} Enable All activated.`,
  enable_glow: `${app_prefix} Enable Glow activated.`,
  enable_base:  `${app_prefix} Enable Base Theme activated.`,
  success_inject: `${app_prefix} Aesthetics succesfully added, reload VS Code to take effect.`,
  error_inject: `${app_prefix} An error occured, could not add files.`,

  debug: (x: string) => `${app_prefix} [DEBUG] ${x}`,
}

export const injectedTagName = "vscode-aesthetics-1"
export const injectedFileName = "vscode-aesthetics.js"

export const localInjectablePath = __dirname + formatPath("/injectable")
export const themePath = localInjectablePath + formatPath("/themes")
export const injectorPath = localInjectablePath + formatPath("/injectors")
export const baseThemePath = themePath + formatPath("/base.css")
export const retroGlowTheme = themePath + formatPath("/retro-glow.css")
export const cssInjectorPath = injectorPath + formatPath("/css-injector.js")
export const appDirectory = path.dirname(require?.main?.filename || '')
export const workbenchPath =
  appDirectory + formatPath("/vs/code/electron-browser/workbench/")
export const workbenchHtml = workbenchPath + "workbench.html"
export const scriptPath = workbenchPath + injectedFileName

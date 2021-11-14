import { debugToast, formatPath, isWindows } from "./util"
const path = require("path")
const fs = require("fs")

const localInjectablePath = __dirname + formatPath("/injectable")
const themePath = localInjectablePath + formatPath("/themes")
const injectorPath = localInjectablePath + formatPath("/injectors")
const retroGlowThemePath = themePath + formatPath("retro-glow-theme.js")
const cssInjectorPath = injectorPath + formatPath("/css-injector.js")
const appDirectory =  path.dirname(require?.main?.filename)
const workbenchPath = appDirectory + formatPath("/vs/code/electron-browser/workbench/")

export default function injectFile() {
  const workbenchHtml = workbenchPath + "workbench.html"

  const cssInjectorFileContents = fs.readFileSync(cssInjectorPath, "utf-8")
  const workbenchHtmlContents = fs.readFileSync(workbenchHtml, "utf-8")

  debugToast(workbenchHtmlContents)
  debugToast(workbenchHtml)
}

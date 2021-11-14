import { debugToast } from "./util"
const path = require("path")
const fs = require("fs")

const isWindows = /^win/.test(process.platform)

const local_injectable_path =
  __dirname + (isWindows ? "\\injectable" : "/injectable")

const theme_path = isWindows
  ? `${local_injectable_path}\\themes`
  : `${local_injectable_path}/themes`

const injector_path = isWindows
  ? `${local_injectable_path}\\injectors`
  : `${local_injectable_path}/injectors`

const retro_glow_theme_path =
  theme_path + (isWindows ? "\\retro-glow-theme.js" : "/retro-glow-theme.js")
const css_injector_path =
  injector_path + (isWindows ? "\\css-injector.js" : "/css-injector.js")

const appDirectory = () => path.dirname(require?.main?.filename)

const getWorkbenchPath = () =>
  appDirectory() +
  (isWindows
    ? "\\vs\\code\\electron-browser\\workbench\\"
    : "/vs/code/electron-browser/workbench/")

export default function injectFile() {
  const filePath = getWorkbenchPath()
  const workbenchHtml = getWorkbenchPath() + "workbench.html"
  const cssInjectorFileContents = fs.readFileSync(css_injector_path, "utf-8")
  const workbenchHtmlContents = fs.readFileSync(workbenchHtml, "utf-8")

  debugToast(workbenchHtmlContents)
  debugToast(workbenchHtml)
}

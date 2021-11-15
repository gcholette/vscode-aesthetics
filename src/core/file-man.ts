import { debugToast, formatPath, isWindows } from "./util"
const path = require("path")
const fs = require("fs")

const injectedTagName = "vscode-aesthetics-1"
const injectedFileName = "vscode-aesthetics.js"

const localInjectablePath = __dirname + formatPath("/injectable")
const themePath = localInjectablePath + formatPath("/themes")
const injectorPath = localInjectablePath + formatPath("/injectors")
const retroGlowThemePath = themePath + formatPath("retro-glow-theme.js")
const cssInjectorPath = injectorPath + formatPath("/css-injector.js")
const appDirectory = path.dirname(require?.main?.filename)
const workbenchPath =
  appDirectory + formatPath("/vs/code/electron-browser/workbench/")

type HtmlTag = string

function addOrReplaceTag(fileContent: string, tag: HtmlTag) {
  const trimmedContent = fileContent
    .replace("</html>", "")
    .replace(`${tag}\n`, "")

  return `${trimmedContent}${tag}\n</html>`
}

function generateHtmlTag(
  filename: string = injectedFileName,
  name: string = injectedTagName
): HtmlTag {
  return `<!--${name}--><script src="${filename}"></script><!--${name}-->`
}

export default function injectFile() {
  const workbenchHtml = workbenchPath + "workbench.html"
  const scriptPath = workbenchPath + injectedFileName

  // upload file mentionned in tag inside workbench directory
  const cssInjectorFileContents = fs.readFileSync(cssInjectorPath, "utf-8")
  fs.writeFileSync(scriptPath, cssInjectorFileContents, "utf-8")

  // change the workbench html to contain <script>
  const workbenchHtmlContents = fs.readFileSync(workbenchHtml, "utf-8")
  const newFileContents = addOrReplaceTag(
    workbenchHtmlContents,
    generateHtmlTag()
  )
  fs.writeFileSync(workbenchHtml, newFileContents, "utf-8")

  debugToast("File sucessfully injected.")
  debugToast(localInjectablePath)
}

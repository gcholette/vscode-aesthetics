import {
  baseThemePath,
  cssInjectorPath,
  injectedFileName,
  injectedTagName,
  msgs,
  scriptPath,
  workbenchHtml,
} from "./constants"
import { toast } from "./util"
const fs = require("fs")

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

function buildFile(injectorFilePath: string, themeFilePath: string): void {
  // upload file mentionned in tag inside workbench directory
  const cssInjectorFileContents = fs.readFileSync(injectorFilePath, "utf-8")
  const themeFileContents = fs.readFileSync(themeFilePath, "utf-8")
  const consolidatedFileContents = `${themeFileContents}${cssInjectorFileContents}`
  fs.writeFileSync(scriptPath, consolidatedFileContents, "utf-8")
}

function insertHtmlTag(tag: HtmlTag): void {
  // change the workbench html to contain <script>
  const workbenchHtmlContents = fs.readFileSync(workbenchHtml, "utf-8")
  const newFileContents = addOrReplaceTag(workbenchHtmlContents, tag)
  fs.writeFileSync(workbenchHtml, newFileContents, "utf-8")
}

export default function injectFile(
  injectorFilePath: string = cssInjectorPath,
  themeFilePath: string = baseThemePath
) {
  const tag = generateHtmlTag()

  buildFile(injectorFilePath, themeFilePath)
  insertHtmlTag(tag)

  // check if tag was successfully applied to html
  const postWorkbenchContents = fs.readFileSync(workbenchHtml, "utf-8")
  if (postWorkbenchContents.includes(tag)) {
    toast(msgs.success_inject)
  } else {
    toast(msgs.error_inject)
  }
}

import {
  baseThemePath,
  cssInjectorPath,
  injectedFileName,
  injectedTagName,
  msgs,
  scriptPath,
  workbenchHtml,
} from "./constants"
import { generateTheme } from "./theme-man"
const fs = require("fs")
const css = require("css")

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

function buildFile(cssFilePath: string): void {
  // upload file mentionned in tag inside workbench directory
  const cssInjectorFileContents = fs.readFileSync(cssInjectorPath, "utf-8")
  const themeFileContents = fs.readFileSync(cssFilePath, "utf-8")

  try {
    css.parse(themeFileContents)
  } catch (e) {
    throw new Error(`${e}`)
  }
  const theme = generateTheme(themeFileContents)
  const consolidatedFileContents = `const customCssStr = \`${theme}\`;\n\n${cssInjectorFileContents}`
  fs.writeFileSync(scriptPath, consolidatedFileContents, "utf-8")
}

function insertHtmlTag(tag: HtmlTag): void {
  // change the workbench html to contain <script>
  const workbenchHtmlContents = fs.readFileSync(workbenchHtml, "utf-8")
  const newFileContents = addOrReplaceTag(workbenchHtmlContents, tag)
  fs.writeFileSync(workbenchHtml, newFileContents, "utf-8")
}

export function removeHtmlTag(): void {
  const workbenchHtmlContents = fs.readFileSync(workbenchHtml, "utf-8")
  const newFileContents = workbenchHtmlContents.replace(
    /<!--.*vscode-aesthetics-1-->/,
    ""
  )
  fs.writeFileSync(workbenchHtml, newFileContents, "utf-8")
}

export default function injectFile(
  cssFilePath: string = baseThemePath
): Promise<any> {
  const tag = generateHtmlTag()

  try {
    buildFile(cssFilePath)
  } catch (e) {
    return Promise.reject(
      "Error: Theme did not apply successfullly, CSS is probably invalid. - " +
        e
    )
  }

  try {
    insertHtmlTag(tag)
  } catch(e) {
    return Promise.reject(e)
  }

  // check if tag was successfully applied to html
  const postWorkbenchContents = fs.readFileSync(workbenchHtml, "utf-8")
  if (postWorkbenchContents.includes(tag)) {
    return Promise.resolve()
  } else {
    return Promise.reject("Error: Theme was not applied successfully.")
  }
}

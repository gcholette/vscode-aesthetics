import config from './config'
import {
  appDirectory,
  cssInjectorPath,
  injectedFileName,
  injectedTagName,
  originalThemePath,
} from './constants'
import { generateJS, generateTheme } from './theme-man'
import { HtmlTag } from './types'
import { errorToast, formatPath, reloadWindow } from './util'
import * as fs from 'node:fs'
import * as css from 'css'
import * as path from 'node:path'

export const workbenchPaths = (() => {
  let paths: {
    folder: string
    file: string
  } | null = null

  return () => {
    if (paths) return paths

    const workbenchSubpaths = [
      "/resources/app/out/vs/code/electron-browser/workbench/",
      "/resources/app/out/vs/code/electron-sandbox/workbench/"
    ]

    let folder = workbenchSubpaths
      .map(x => appDirectory + formatPath(x))
      .find(fs.existsSync)

    if (!folder) {
      const hashDirs = fs.readdirSync(appDirectory, { withFileTypes: true })
        .filter(d => d.isDirectory() && /^[a-f0-9]{6,}$/.test(d.name))
        .sort((a, b) =>
          fs.statSync(path.join(appDirectory, b.name)).mtimeMs -
          fs.statSync(path.join(appDirectory, a.name)).mtimeMs
        )

      for (const dir of hashDirs) {
        const base = path.join(appDirectory, dir.name)
        folder = workbenchSubpaths
          .map(x => base + formatPath(x))
          .find(fs.existsSync)
        if (folder) break
      }
    }

    if (!folder) throw new Error('Could not find the appropriate workspace folder to edit in the vscode installation. Aborting.')

    const file = [
      "workbench.html",
      "workbench.esm.html"
    ].map(x => folder + x).find(fs.existsSync)

    if (!file) throw new Error('Could not find the appropriate workspace html file to edit in the vscode installation. Aborting.')

    paths = { folder, file }
    return paths
  }
})()

function addOrReplaceTag(fileContent: string, tag: HtmlTag) {
  const trimmedContent = fileContent
    .replace('</html>', '')
    .replace(`${tag}\n`, '')

  return `${trimmedContent}${tag}\n</html>`
}

export function generateHtmlTag(
  filename: string = injectedFileName,
  name: string = injectedTagName
): HtmlTag {
  return `<!--${name}--><script src="${filename}"></script><!--${name}-->`
}

export function validateCssFileContents(fileContent: string) {
  try {
    css.parse(fileContent)
    return true
  } catch (e) {
    throw new Error(`[Invalid CSS] ${e}`)
  }
}

function buildFile(cssFilePath: string, filename: string = 'vscode-aesthetics.js'): void {
  // upload file mentionned in tag inside workbench directory
  const cssInjectorFileContents = fs.readFileSync(cssInjectorPath, 'utf-8')
  const themeFileContents = fs.readFileSync(cssFilePath, 'utf-8')
  const enableCustomCss = config.enableCustomCss()
  const customFileContents = enableCustomCss ? fs.readFileSync(config.customCssFile(), 'utf-8') : ''

  // Merging of the custom css and official css flavors
  const fileContents = themeFileContents + `\n${customFileContents}`

  if (!validateCssFileContents(fileContents)) {
    return
  }

  const theme = generateTheme(fileContents)
  const customJS = generateJS()
  const consolidatedFileContents = `
    const customCssStr = \`${theme}\`;
    \n\n${customJS}
    \n\n${cssInjectorFileContents}
  `
  fs.writeFileSync(workbenchPaths().folder + filename, consolidatedFileContents, 'utf-8')
}

function insertHtmlTag(tag: HtmlTag): void {
  // change the workbench html to contain <script>
  const selectedWorkbenchHtml = workbenchPaths().file
  const workbenchHtmlContents = fs.readFileSync(selectedWorkbenchHtml, 'utf-8')
  const newFileContents = addOrReplaceTag(workbenchHtmlContents, tag)
  fs.writeFileSync(selectedWorkbenchHtml, newFileContents, 'utf-8')
}

export function removeHtmlTag(): void {
  const selectedWorkbenchHtml = workbenchPaths().file
  const workbenchHtmlContents = fs.readFileSync(selectedWorkbenchHtml, 'utf-8')
  const newFileContents = workbenchHtmlContents.replace(
    /<!--.*vscode-aesthetics-1-->/,
    ''
  )
  fs.writeFileSync(selectedWorkbenchHtml, newFileContents, 'utf-8')
}

export function givePermissionForMp4(): void {
  const selectedWorkbenchHtml = workbenchPaths().file
  const workbenchHtmlContents = fs.readFileSync(selectedWorkbenchHtml, 'utf-8')
  const newFileContents = workbenchHtmlContents.replace('media-src \'self\'', 'media-src *')
  fs.writeFileSync(selectedWorkbenchHtml, newFileContents, 'utf-8')
}

export function injectFile(
  cssFilePath: string = originalThemePath
): Promise<any> {
  if (config.wallpaperUrl().endsWith('.mp4')) {
    givePermissionForMp4()
  }

  // delete old injection scrips (cache issues)
  const dirs = fs.readdirSync(workbenchPaths().folder).filter((x: any) => x.includes('vscode-aesthetics'))
  dirs.forEach((x: any) => {
    removeHtmlTag()
    fs.unlinkSync(workbenchPaths().folder + x)
  })

  const filename = `vscode-aesthetics-${Math.round(Math.random() * 100000)}.js`
  const tag: HtmlTag = generateHtmlTag(filename)

  try {
    buildFile(cssFilePath, filename)
  } catch (e) {
    return Promise.reject('Error: Theme did not apply successfullly - ' + e)
  }

  try {
    insertHtmlTag(tag)
  } catch (e) {
    return Promise.reject(e)
  }

  // check if tag was successfully applied to html
  const postWorkbenchContents = fs.readFileSync(workbenchPaths().file, 'utf-8')
  if (postWorkbenchContents.includes(tag)) {
    return Promise.resolve()
  } else {
    return Promise.reject('Error: Theme was not applied successfully.')
  }
}

export function injectWithEffect(path: string) {
  return injectFile(path)
    .then(() => {
      reloadWindow()
    })
    .catch((e) => {
      if (e.includes('EPERM')) {
        errorToast(
          'Unauthorized, VS Code needs to be run as admin to use Aesthetics.'
        )
      } else {
        errorToast(e)
      }
    })
}

export function sanityCheck(): void {
  const selectedWorkbenchHtml = workbenchPaths().file
  if (!fs.existsSync(selectedWorkbenchHtml)) {
    console.error(`[trace] workbenchHtml: ${selectedWorkbenchHtml}`)
    console.error(`[trace] appDirectory ${appDirectory}`)
    throw new Error('Could not find the workspace file to edit in the vscode installation. Aborting.')
  }
}
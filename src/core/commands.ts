import injectFile, { removeHtmlTag } from "./file-man"
import { baseThemePath, msgs, theme1Path } from "./constants"
import { errorToast, formatPath, reloadWindow, toast } from "./util"
import config from "./config"

function injectWithEffect(path: string) {
  return injectFile(path)
    .then(() => {
      reloadWindow()
    })
    .catch((e) => errorToast(e))
}

export function applyBase() {
  return injectWithEffect(baseThemePath)
}

export function applyTheme1() {
  return injectWithEffect(theme1Path)
}

export function applyCustom() {
  const customPath = formatPath(config.customPath())
  const fileIsDefined = customPath.length > 0

  if (fileIsDefined && !customPath.includes(".css")) {
    return errorToast(
      'No file of type ".css" was provided. VS Code Aesthetics only supports pure CSS files.'
    )
  }

  if (customPath.length > 0) {
    return injectWithEffect(customPath)
  } else {
    return errorToast("No path provided in settings.")
  }
}

export function uninstallTheme() {
  removeHtmlTag()
  reloadWindow()
}

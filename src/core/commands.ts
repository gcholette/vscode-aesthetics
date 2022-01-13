import { injectWithEffect, removeHtmlTag } from './file-man'
import { errorToast, formatPath, reloadWindow, toast } from './util'
import config from './config'
import { originalThemePath } from './constants'
import { Flavor, Flavors } from './types'

export function apply() {
  switch (config.flavor() as Flavor) {
    case Flavors.Original:
      return injectWithEffect(originalThemePath)
    case Flavors.Custom:
      return applyCustom()
    default:
      return injectWithEffect(originalThemePath)
  }
}

export function applyCustom() {
  const customPath = formatPath(config.customCssFile())
  const fileIsDefined = customPath.length > 0

  if (fileIsDefined && !customPath.includes('.css')) {
    return errorToast(
      'No file of type ".css" was provided. VS Code Aesthetics only supports pure CSS files.'
    )
  }

  if (customPath.length > 0) {
    return injectWithEffect(customPath)
  } else {
    return errorToast('No path provided in settings.')
  }
}

export function remove() {
  removeHtmlTag()
  reloadWindow()
}

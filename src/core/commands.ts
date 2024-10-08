import { injectWithEffect, removeHtmlTag, sanityCheck } from './file-man'
import { errorToast, formatPath, reloadWindow } from './util'
import config from './config'
import { flavorMapping } from './constants'
import { Flavor } from './types'

export function apply() {
  sanityCheck()

  const injectionFn = injectWithEffect
  const customPath = formatPath(config.customCssFile())
  const enableCustomCss = config.enableCustomCss()
  const fileIsDefined = customPath.length > 0

  if (enableCustomCss) {
    if (fileIsDefined && !customPath.includes('.css')) {
      return errorToast(
        'No file of type ".css" was provided. VS Code Aesthetics only supports pure CSS files.'
      )
    } else if (!fileIsDefined) {
      return errorToast('No path for the CSS file provided in settings.')
    }
  }

  const flavor: Flavor = config.flavor() as Flavor

  return injectionFn(flavorMapping[flavor])
}

export function remove() {
  removeHtmlTag()
  reloadWindow()
}

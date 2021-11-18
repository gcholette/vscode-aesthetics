import injectFile from "./file-man"
import { baseThemePath, msgs } from "./constants"
import { errorToast, formatPath, reloadWindow, toast } from "./util"
import config from "./config"

export function applyBase() {
  injectFile(baseThemePath)
    .then(() => {
      toast(msgs.success_inject).then(() => {
        reloadWindow()
      })
    })
    .catch((e) => errorToast('Error: Application did not succeed'))
}

export function applyCustom() {
  const customPath = formatPath(config.customPath())
  if (customPath.length > 0) {
    injectFile(customPath)
    toast(msgs.enable_base)
  } else {
    errorToast("No path provided in settings.")
  }
}

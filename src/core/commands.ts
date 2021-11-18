import injectFile from "./file-man"
import {
  baseThemePath,
  msgs
} from "./constants"
import { errorToast, formatPath, toast } from "./util"
import config from "./config"

export function applyBase() {
  injectFile(baseThemePath)
  toast(msgs.enable_base)
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

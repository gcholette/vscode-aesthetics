import injectFile from "./file-man"
import { cssInjectorPath, msgs, retroGlowTheme } from "./constants"
import { toast } from "./util"

export function enableAll() {
  injectFile(cssInjectorPath, retroGlowTheme)
  toast(msgs.enable_all)
}

export function enableGlow() {
  toast(msgs.enable_glow)
}

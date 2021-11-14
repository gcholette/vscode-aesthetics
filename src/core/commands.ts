import injectFile from "./file-man"
import {msgs} from "./constants"
import { toast } from "./util"

export function enableAll() {
  injectFile()
  toast(msgs.enable_all)
}

export function enableGlow() {
  toast(msgs.enable_glow)
}

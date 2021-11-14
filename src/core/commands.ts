import injectFile from "./file-man"
import * as vscode from "vscode"
import Msgs from "./msgs"
import { toast } from "./util"

export function enableAll() {
  injectFile()
  toast(Msgs.enable_all)
}

export function enableGlow() {
  toast(Msgs.enable_glow)
}

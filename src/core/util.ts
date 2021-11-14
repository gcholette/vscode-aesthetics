import * as vscode from "vscode"
import {msgs} from "./constants"

export const isWindows = /^win/.test(process.platform)

export const registerCommand = vscode.commands.registerCommand
export const toast = vscode.window.showInformationMessage
export const errorToast = vscode.window.showErrorMessage
export const debugToast = (x: string) =>
  vscode.window.showInformationMessage(msgs.debug(x))

export function formatPath (path: string): string {
  if (isWindows) {
    return path.replace('/', '\\')
  } else {
    return path
  }
}
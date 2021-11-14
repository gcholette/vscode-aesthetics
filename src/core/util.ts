import * as vscode from "vscode"
import {msgs} from "./constants"

export const toast = vscode.window.showInformationMessage
export const errorToast = vscode.window.showErrorMessage
export const debugToast = (x: string) =>
  vscode.window.showInformationMessage(msgs.debug_1(x))


export const registerCommand = vscode.commands.registerCommand
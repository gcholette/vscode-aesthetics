import * as vscode from "vscode"
import Msgs from "./msgs"

export const toast = vscode.window.showInformationMessage
export const errorToast = vscode.window.showErrorMessage
export const debugToast = (x: string) =>
  vscode.window.showInformationMessage(Msgs.debug_1(x))

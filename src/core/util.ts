import * as vscode from "vscode"
import {msgs} from "./constants"

// usage: pipe(firstFn, secondFn, ...)(argument)
export const pipe =
    (...fns: any[]) =>
        (input: any) =>
            fns.reduce((acc, f) => f(acc), input)

export const isWindows = /^win/.test(process.platform)

export const registerCommand = vscode.commands.registerCommand
export const executeCommand = vscode.commands.executeCommand
export const toast = vscode.window.showInformationMessage
export const errorToast = vscode.window.showErrorMessage
export const debugToast = (x: string) =>
  vscode.window.showInformationMessage(msgs.debug(x))
export const reloadWindow = () => executeCommand("workbench.action.reloadWindow")

export const getConfig = () => vscode.workspace.getConfiguration("vscodeAesthetics") || {}

export function formatPath (path: string): string {
  if (isWindows) {
    return path.replace('/', '\\')
  } else {
    return path
  }
}

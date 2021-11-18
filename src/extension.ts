import * as vscode from "vscode"
import { applyBase, applyCustom, uninstallTheme } from "./core/commands"
import { registerCommand } from "./core/util"

export function activate(context: vscode.ExtensionContext) {
  const registeredCommands = [
    registerCommand("vscode-aesthetics.applyBase", applyBase),
    registerCommand("vscode-aesthetics.applyCustom", applyCustom),
    registerCommand("vscode-aesthetics.uninstall", uninstallTheme)
  ]

  registeredCommands.forEach((cmd) => context.subscriptions.push(cmd))
}

// this method is called when your extension is deactivated
export function deactivate() {}

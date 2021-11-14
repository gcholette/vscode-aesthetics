import * as vscode from "vscode"
import { enableAll, enableGlow } from "./core/commands"
import { registerCommand } from "./core/util"

export function activate(context: vscode.ExtensionContext) {
  const registeredCommands = [
    registerCommand("vscode-aesthetics.enableAll", enableAll),
    registerCommand("vscode-aesthetics.enableGlow", enableGlow),
  ]

  registeredCommands.forEach((cmd) => context.subscriptions.push(cmd))
}

// this method is called when your extension is deactivated
export function deactivate() {}

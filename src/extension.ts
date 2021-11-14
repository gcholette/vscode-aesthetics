import * as vscode from "vscode"
import { enableAll, enableGlow } from "./core/commands"

export function activate(context: vscode.ExtensionContext) {
  const registeredCommands = [
    vscode.commands.registerCommand("vscode-aesthetics.enableAll", enableAll),
    vscode.commands.registerCommand("vscode-aesthetics.enableGlow", enableGlow),
  ]

  registeredCommands.forEach((cmd) => context.subscriptions.push(cmd))
}

// this method is called when your extension is deactivated
export function deactivate() {}

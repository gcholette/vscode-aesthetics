import * as vscode from "vscode"
import Msgs from "./msgs"
import { debugToast } from "./util"
const path = require("path")
const fs = require("fs")

const isWindows = () => /^win/.test(process.platform)
const appDirectory = () => path.dirname(require?.main?.filename)

function getWorkbenchPath() {
  const base = appDirectory() + (isWindows() ? "\\vs\\code" : "/vs/code")
  return base
}

export default function injectFile() {
  const filePath = getWorkbenchPath()
  debugToast(filePath)
}

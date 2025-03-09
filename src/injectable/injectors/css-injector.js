const injectStyles = (stylesStr) => {
  const stylesheetId = 'vscode-aesthetics-styles'
  const insertCss = () => {
    const updatedStyleTag = document.createElement('style');
    updatedStyleTag.id = stylesheetId
    updatedStyleTag.innerText = stylesStr
    document.body.appendChild(updatedStyleTag)
  }

  setTimeout(() => {
    // validate that it is inserted in the dom
    if (!document.getElementById(stylesheetId)) {
      insertCss()
    }
  }, 3000)
  insertCss()
}

(() => injectStyles(customCssStr))()

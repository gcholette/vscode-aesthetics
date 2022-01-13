// append the constant customCssStr here
// the extension combines the theme file containing this variable 
// const customCssStr = ''
const vscodeTokenSelector = '.vscode-tokens-styles'
const universalNewlineRgx = /(\r\n|\n|\r)/gm


const injectStyles = (stylesStr) => {
  const currentStyles = document.querySelector(vscodeTokenSelector).innerText
  const updatedStyles = `${currentStyles}${stylesStr}`

  const updatedStyleTag = document.createElement('style')
  updatedStyleTag.innerText = updatedStyles.replace(universalNewlineRgx, '')
  document.body.appendChild(updatedStyleTag)
}

const observeEditorLoading = (mutations, observer) => {
  mutations.forEach(mutation => {
    const { type } = mutation
    const vscodeStyles = document.querySelector(vscodeTokenSelector)
    const vscodeStylesText = document.querySelector(vscodeTokenSelector).innerText

    if (vscodeStyles) {
      switch (type) {
        case 'attributes':
          observer.disconnect()
          observer.observe(vscodeStyles, { childList: true })
          break;
        case 'childList':
          if (vscodeStylesText) {
            injectStyles(customCssStr)
            observer.disconnect()
          }
          break;
      }
    }
  })
}

const init = () => {
  const loadingObs = new MutationObserver(observeEditorLoading)
  loadingObs.observe(document.querySelector('body'), { attributes: true })
}

(() => init())()

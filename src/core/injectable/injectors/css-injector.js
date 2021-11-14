const vscodeTokenSelector = '.vscode-tokens-styles'
const universalNewlineRgx = /(\r\n|\n|\r)/gm
const customCssStr = `
    /* text editor */
    .view-lines.monaco-mouse-cursor-text {
      background: linear-gradient( 90deg, #00000020, #ffffff06)!important;
    }

    /* minimap */
    .minimap.slider-mouseover .minimap-decorations-layer {
      box-shadow: inset 0px 0px 8px 0px #f70268a3;
    }
`

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

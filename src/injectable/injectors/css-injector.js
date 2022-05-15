
const injectStyles = (stylesStr) => {
  const updatedStyleTag = document.createElement('style');
  updatedStyleTag.innerText = stylesStr
  document.body.appendChild(updatedStyleTag)
}

const observeEditorLoading = (mutations) => {
  mutations.forEach(x => {
    const element = document.querySelector('.monaco-workbench')
    if (element) {
      injectStyles(customCssStr)
    }
  })
}

const init = () => {
  const loadingObs = new MutationObserver(observeEditorLoading);
  loadingObs.observe(document.querySelector('body'), { attributes: true });
}

(() => init())()

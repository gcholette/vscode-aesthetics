import config from "./config";

const textGlowCss = `.view-line {text-shadow: 13px 13px 22px;}`

export function generateTheme(theme: string): string {
    const enableGlow = config.enableGlow()
    if (enableGlow) {
        return `${textGlowCss}${theme}`
    } else {
        return theme
    }
}
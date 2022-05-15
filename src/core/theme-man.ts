import { URL } from "url";
import config from "./config";
import { pipe } from "./util";

const textGlowCss = `.view-line {
    text-shadow: 13px 13px 22px;
}`

const getWallpaperCss = (url: string, blur: number, opacity: number) => {
    const blurStr: string = blur ? 'blur(' + blur + 'px)' : ''
    const opacityStr: string = opacity ? (opacity > 0.8 ? '0.80' : ''+opacity) : '0.14'

    return `.monaco-workbench:after {
        content: "";
        background-image: url('${url}') !important;
        background-position: center center;
        background-size: cover;
        position: absolute;
        top: 0;
        filter: ${blurStr} saturate(150%);
        left: 0;
        pointer-events: none;
        opacity: ${opacityStr};
        width: 100%;
        height: 100%;
    }`
}

function applyGlow(theme: string) {
    const enableGlow = config.enableGlow()
    if (enableGlow) {
        return `${textGlowCss}${theme}`
    } else {
        return theme
    }
}

function applyWallpaper(theme: string) {
    const enableWallpaper = config.enableWallpaper()
    const wallpaperUrl = config.wallpaperUrl()
    const blur = +config.wallpaperBlurAmnt()
    const opacity = +config.wallpaperOpacityAmnt()
    if (enableWallpaper) {
        if (wallpaperUrl) {
            try {
                new URL(wallpaperUrl);
            } catch (e) {
                return new Error(e + '')
            }
        }

        return `${getWallpaperCss(wallpaperUrl, blur, opacity)}${theme}`
    } else {
        return theme
    }
}

function applyBasicCSSApi(theme: string) {

return `@keyframes breathingBackground {
    0% {
      background-position: 25% 75%;
    }

    50% {
      background-position: 75% 25%;
    }

    100% {
      background-position: 25% 75%;
    }
  }

  @keyframes breathingBackground2 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 50% 0%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
  ${theme}`
}

export function generateTheme(theme: string): string {
    return pipe(applyBasicCSSApi, applyGlow, applyWallpaper)(theme)
}

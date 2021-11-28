import { URL } from "url";
import config from "./config";
import { pipe } from "./util";

const textGlowCss = `.view-line {
    text-shadow: 13px 13px 22px;
}`

const getWallpaperCss = (url: string, blur: number) => `.monaco-workbench:after {
    content: "";
    background-image: url('${url}') !important;
    background-position: center center;
    background-size: cover;
    position: absolute;
    top: 0;
    filter: ${blur ? 'blur('+blur+'px)' : ''} saturate(150%);
    left: 0;
    pointer-events: none;
    opacity: 0.14;
    width: 100%;
    height: 100%;
}`

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
    if (enableWallpaper) {
        if (wallpaperUrl) {
            try {
                new URL(wallpaperUrl);
            } catch (e) {
                return new Error(e + '')
            }
        }

        return `${getWallpaperCss(wallpaperUrl, blur)}${theme}`
    } else {
        return theme
    }
}

export function generateTheme(theme: string): string {
    return pipe(applyGlow, applyWallpaper)(theme)
}

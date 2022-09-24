import { URL } from "url";
import config from "./config";
import { pipe } from "./util";

const textGlowCss = `.view-line {
    text-shadow: 13px 13px 22px;
}`

const getOpacity = (): string => {
  const opacity = +config.wallpaperOpacityAmnt()
  return opacity ? (opacity > 0.8 ? '0.80' : ''+opacity) : '0.14'
}

const getBlur = (): string => {
  const blur = +config.wallpaperBlurAmnt()
  return blur ? 'blur(' + blur + 'px)' : ''
}

const getWallpaperCss = () => {
    const url = config.wallpaperUrl()
    return `body:after {
        content: "";
        background-image: url('${url}') !important;
        background-position: center center;
        background-size: cover;
        position: absolute;
        top: 0;
        filter: ${getBlur()} saturate(150%);
        left: 0;
        pointer-events: none;
        opacity: ${getOpacity()};
        width: 100%;
        height: 100%;
        z-index: 999;
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
    if (enableWallpaper) {
        if (wallpaperUrl) {
            try {
                new URL(wallpaperUrl);
            } catch (e) {
                return new Error(e + '')
            }
        }
        if (wallpaperUrl.endsWith('.mp4')) {
          return theme
        }  else {
          return `${getWallpaperCss()}${theme}`
        }
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
  .vid1 {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    filter: ${getBlur()} saturate(150%); 
    opacity: ${getOpacity()};
    pointer-events: none;
  }
  ${theme}`
}

export function generateTheme(theme: string): string {
    return pipe(applyBasicCSSApi, applyGlow, applyWallpaper)(theme)
}


export function generateJS(): string {
  const enableWallpaper = config.enableWallpaper()
  const wallpaperUrl = config.wallpaperUrl()

  if (enableWallpaper && wallpaperUrl.endsWith('.mp4')) {
    return `
      const videoUrl = '${wallpaperUrl}';
      const videoTag = document.createElement('video');
      videoTag.setAttribute('autoplay', true);
      videoTag.setAttribute('class', 'vid1');
      videoTag.setAttribute('muted', true);
      videoTag.setAttribute('loop', true);
      videoTag.setAttribute('id', 'bdvid');
      videoTag.setAttribute('src', videoUrl);
      videoTag.playbackRate = 0.75;
      document.body.appendChild(videoTag);
    `
  } else {
    return ``
  }
}
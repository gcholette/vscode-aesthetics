import { defaultWallpaperUrl } from "./constants";
import { getConfig } from "./util";

export default {
    customCssFile: (): string => getConfig().customCssFile,
    enableGlow: (): string => getConfig().enableGlow,
    wallpaperUrl: (): string => getConfig().wallpaperUrl || defaultWallpaperUrl,
    wallpaperBlurAmnt: (): string => getConfig().wallpaperBlurAmnt,
    enableWallpaper: (): string => getConfig().enableWallpaper,
}
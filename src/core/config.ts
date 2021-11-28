import { getConfig } from "./util";

export default {
    customPath: (): string => getConfig().customPath,
    enableGlow: (): string => getConfig().enableGlow,
    wallpaperUrl: (): string => getConfig().wallpaperUrl,
    enableWallpaper: (): string => getConfig().enableWallpaper,
}
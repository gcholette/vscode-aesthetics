import { defaultWallpaperUrl } from './constants'
import { getConfig } from './util'

const throwIfNotType = (value: any, type = 'number', propertyName: string) => {
  if (typeof value === type) {
    return value
  } else {
    throw new Error(type + ' only for the property: ' + propertyName)
  }
}

export default {
  customCssFile: (): string => getConfig().customCssFile,
  enableCustomCss: (): boolean => getConfig().enableCustomCss,
  flavor: (): string => getConfig().flavor,
  enableGlow: (): boolean =>
    throwIfNotType(getConfig().enableGlow, 'boolean', 'Enable Glow'),
  wallpaperUrl: (): string => getConfig().wallpaperUrl || defaultWallpaperUrl,
  wallpaperBlurAmnt: (): number =>
    throwIfNotType(
      getConfig().wallpaperBlurAmnt,
      'number',
      'Wallpaper Blur Amount'
    ),
  wallpaperOpacityAmnt: (): number =>
    throwIfNotType(
      getConfig().wallpaperOpacityAmnt,
      'number',
      'Wallpaper Opacity Amount'
    ),
  enableWallpaper: (): string =>
    throwIfNotType(getConfig().enableWallpaper, 'boolean', 'Enable Wallpaper'),
}

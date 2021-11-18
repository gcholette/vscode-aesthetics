import { getConfig } from "./util";

export default {
    customPath: (): string => getConfig().customPath,
    enableGlow: (): string => getConfig().enableGlow
}
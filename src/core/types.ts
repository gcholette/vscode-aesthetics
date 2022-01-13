export enum Flavors {
  Original = 'Original',
  Custom = 'Custom',
}

export type Flavor 
  = Flavors.Original 
  | Flavors.Custom

export type HtmlTag = string

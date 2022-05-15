export enum Flavors {
  Original = 'Original',
  Sunset = 'Sunset',
  Neon = 'Neon',
  Teal = 'Teal',
  Empty = 'Empty'
}

export type Flavor 
  = Flavors.Original 
  | Flavors.Sunset
  | Flavors.Neon
  | Flavors.Teal
  | Flavors.Empty

export type HtmlTag = string

export enum Flavors {
  Original = 'Original',
  Teal = 'Teal',
  None = 'None'
}

export type Flavor 
  = Flavors.Original 
  | Flavors.Teal
  | Flavors.None

export type HtmlTag = string

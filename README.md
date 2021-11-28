<p align="center">
  <img src="https://user-images.githubusercontent.com/8711020/142301012-41575a7f-55f3-4c02-bc16-dd2ab8a75a90.png" />
</p>
<h1 align="center">
VS Code Aesthetics
</h1>


<p align="center">
An extension to customize beyond themes.
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8711020/142301382-70b9893c-e4e8-444f-ae7d-856adc06e05d.png" />
</p>

![demo_1](https://user-images.githubusercontent.com/8711020/142354891-43c27b11-a106-4f22-931b-562fab20a60f.png)

<p align="center">
    <img src="https://user-images.githubusercontent.com/8711020/142301382-70b9893c-e4e8-444f-ae7d-856adc06e05d.png" />
</p>


VS Code Aesthetics is an extension that allows for deeper customisation than what normal themes permit, like gradients, wallpapers, glow effects and css animations on anything in the UI.

## How to use

### Installation
Download the .vsix extension from [the releases page](https://github.com/gcholette/vscode-aesthetics/releases) and install it manually. 

([Official documentation on how to install manually](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix))

### Usage
#### Apply base styles
In the command palette, the command "Aesthetics: Apply defaults" will apply the glow effect and the wallpaper according to your settings.

#### Apply standard theme
Aesthetics also comes with one theme right now (a mix of 2077 and darker material UI oceanic), available under `Preferences: color theme > Aesthetics #1`

#### Enable/Disable wallpaper
To disable/enable the glow effect, go in settings (Ctrl + ,), then search for "Aesthetics: Enable Wallpaper". After changing the value, you will need to re-run any "Aesthetics: Apply" command.

You can also in these settings set the url of the wallpaper, right now it works well with http urls

The opacity of the wallpaper aswell as the blurriness intensity are customisable in settings aswell.

#### Enable/Disable glow effect
To disable/enable the glow effect, go in settings (Ctrl + ,), then search for "aesthetics Enable Glow". After changing the value, you will need to re-run any "Aesthetics: Apply" command.

#### Use custom CSS file
To use a custom CSS file, go in settings (Ctrl + ,), then search for "aesthetics Custom Path" then enter the absolute path for the css file you wish to provide. Then, run the command "Aesthetics: Apply custom CSS".

#### Uninstall a theme
Uninstall with the command "Aesthetics: Uninstall/Remove Theme"


## Note

This project is still in early development. 

Once installed, VS Code will say that it's installation is corrupt.

Everytime VS Code updates it will overwrite the extension's applied custom CSS. You will need to re-apply Aesthetics after every update if you want to keep using it.

## Troubleshooting

### EPERM when applying theme
On windows: run vscode as admin.

On linux: [this stackoverflow link](https://stackoverflow.com/questions/67929938/running-vs-code-with-the-root-privileges-not-work-anymore-in-ubuntu-linux/68637450#68637450)

### Styles not loading when opening vscode
The styles will only apply when opening a text document. (when a workbench loads)
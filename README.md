<p align="center">
  <img src="https://user-images.githubusercontent.com/8711020/142301012-41575a7f-55f3-4c02-bc16-dd2ab8a75a90.png" />
</p>
<h1 align="center">
VS Code Aesthetics
</h1>


<p align="center">
Customize VS Code beyond themes
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/8711020/168487615-e46cb876-487d-4371-8e65-5f5f69f8164c.png" />
</p>

## Features

VS Code Aesthetics is an extension that allows for deeper customisation than what normal themes permit, like gradients, wallpapers, glow effects and css animations on anything in the UI.

- Wallpaper support
- Text glow / glass effect
- Various flavors to choose from
- One standard color theme
- Custom CSS injection inside workbench (provide your own CSS stylesheet!)

## How to use

### Installation
Download the .vsix extension from [the releases page](https://github.com/gcholette/vscode-aesthetics/releases) and install it manually. 

([Official documentation on how to install vscode extensions manually](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix))

### Usage
#### Apply Aesthetics
In the command palette, the command `Aesthetics: Apply` will apply styling according to settings. 

Modify settings in VS Code's setting editor (CTRL + ,) under Extensions > Aesthetics.

This command needs to be run everytime something changed in your settings!

#### Apply standard themes
Aesthetics also comes with one theme right now available under `Preferences: color theme > Aesthetics Original`

#### Enable/Disable wallpaper
To disable/enable the glow effect, go in settings (Ctrl + ,), then search for `Aesthetics: Enable Wallpaper`. After changing the value, you will need to re-run any `Aesthetics: Apply` command.

You can also in these settings set the url of the wallpaper, right now it works well with http urls.

The opacity of the wallpaper aswell as the blurriness intensity are customisable in settings.

#### Enable/Disable glow effect
To disable/enable the glow effect, go in settings (Ctrl + ,), then search for `aesthetics Enable Glow`. After changing the value, you will need to re-run any `Aesthetics: Apply` command.

#### Change flavor
To change the theme flavor, go in settings (Ctrl + ,), then search for `aesthetics Flavor`. After changing the value, you will need to re-run any `Aesthetics: Apply` command.

#### Use custom CSS file
To use a custom CSS file, go in settings (Ctrl + ,), then search for `Aesthetics Custom CSS File` then enter the absolute path for the css file you wish to provide. Then, run the command `Aesthetics: Apply`.

#### Remove Aesthetics 
Uninstall with the command `Aesthetics: Remove`


## Note

This project is still in early development. 

Once installed, VS Code will say that it's installation is corrupt.

Everytime VS Code updates it will overwrite the extension's applied custom CSS. You will need to re-apply Aesthetics after every update if you want to keep using it.

When updating the extension, it is preferable to uninstall the old versions of this extension before. Otherwise, because the updated extension commands have changed, all old commands will remain in vscode's command prompt even tough the new version may not contain them, leading to unexpected behaviors. From 0.4 forward, the api should remain the same.

## Troubleshooting

### Permission denied when applying theme
On windows: run vscode as admin.

On linux:
```
# get vscode path
whereis code
# give privileges to user
sudo chown -R <user> <vscode path>

# example
sudo chown -R kali /usr/share/code
```

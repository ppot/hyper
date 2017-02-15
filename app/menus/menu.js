const os = require('os');
const path = require('path');
const {app, shell, dialog} = require('electron');

module.exports = class Menu {
  constructor(commands, createWindow, updatePlugins) {
    this.commands = commands;

    this.viewMenu = require('./menus/view')(commands);
    this.shellMenu = require('./menus/shell')(commands, createWindow);
    this.editMenu = require('./menus/edit')(commands);
    this.pluginsMenu = require('./menus/plugins')(commands, updatePlugins);
    this.windowMenu = require('./menus/window')(commands);
    this.helpMenu = require('./menus/help')(os, app, shell);

    if (process.platform === 'darwin') {
      this.darwinMenu = require('./menus/darwin')(commands, createWindow);
    } else {
      this.editMenu.submenu.push(
        {type: 'separator'},
        {
          label: 'Preferences...',
          accelerator: commands['window:preferences'],
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.rpc.emit('preferences');
            } else {
              createWindow(win => win.rpc.emit('preferences'));
            }
          }
        }
      );

      this.helpMenu.submenu.push(
        {type: 'separator'},
        {
          role: 'about',
          click() {
            dialog.showMessageBox({
              title: `About ${app.getName()}`,
              message: `${app.getName()} ${app.getVersion()}`,
              detail: 'Created by Guillermo Rauch',
              icon: path.join(__dirname, 'static/icon.png'),
              buttons: []
            });
          }
        }
      );
    }
  }

  make() {
    const menu = [].concat(
      this.shellMenu,
      this.editMenu,
      this.viewMenu,
      this.pluginsMenu,
      this.windowMenu,
      this.helpMenu
    );

    if (process.platform === 'darwin') {
      menu.unshift(this.darwinMenu);
    }

    return menu;
  }
};

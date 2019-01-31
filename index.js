'use strict';

const Visor = require('./quake');
const log = require('electron-log');
const registerShortcut = require('hyperterm-register-shortcut');

let quake;

module.exports.onApp = function registerGlobalHotkey(app) {
    // for config changes, etc
    let quakeWindow;
    if (quake) {
        quakeWindow = quake.quakeWindow;
        quake.destroy();
    }

    // on load, set the first window that loads as the quake
    if (!quakeWindow) {
        const windows = app.getWindows();
        if (windows.size === 1) {
            quakeWindow = windows.values().next().value;
        }
    }

    quake = new Visor(app, quakeWindow);
    registerShortcut('quake', () => quake.toggleWindow())(app);
};

module.exports.onUnload = function unregisterGlobalHotkey() {
    // as far as I know, onUnload can't be called before onApp, but just in case...
    if (!quake) {
        console.error('onUnload was called before a quake was created');
    } else {
        quake.destroy();
    }
};

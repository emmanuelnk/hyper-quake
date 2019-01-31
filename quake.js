'use strict';

const electron = require('electron');
const { BrowserWindow, Menu } = electron;

const DEBUG = process.env.NODE_ENV === 'development' || process.env.DEBUG || false;
const isMac = process.platform === 'darwin';

let log;
if (DEBUG) {
    log = require('electron-log');
    log.transports.file.level = 'silly';
}

module.exports = class Quake {
    constructor(app, quakeWindow = null) {
        this.app = app;
        this.config = app.config.getConfig().quake || {};
        this.quakeWindow = quakeWindow;
        this.quakeWindow.on('close', () => this.handleOnQuakeWindowClose());
        this.previousAppFocus = null;

        if (this.config.hideDock) {
            this.app.dock.hide();
        }

        if (this.quakeWindow) {
            this.setBounds();
        }
    }

    toggleWindow() {
        debug('toggling window');

        console.error('test2');
        if (!this.quakeWindow) {
            // if no quake window, create one and try toggling again after it's created
            this.createNewQuakeWindow(() => this.setBounds());
            return;
        }

        if (this.quakeWindow.isFocused()) {
            if (!this.quakeWindow.isFullScreen()) {
                this.quakeWindow.hide();
            }
            this.returnFocus();
        } else {
            this.setBounds();
            if (this.quakeWindow.isVisible()) {
                this.quakeWindow.focus();
            } else {
                this.previousAppFocus = BrowserWindow.getFocusedWindow();
                this.quakeWindow.show(() => debug('test'));
                this.quakeWindow.focus();
            }
        }
    }

    setBounds() {
        debug(`setting position to ${this.config.position}`);

        if (!this.config.position) return;

        const screen = electron.screen;
        const point = screen.getCursorScreenPoint();
        const display = screen.getDisplayNearestPoint(point);
        const bounds = display.workArea;
        const { height, width } = bounds;

        switch (this.config.position) {
            case 'bottom':
                bounds.y += this.config.height || height / 2;
                bounds.width = this.config.width || width;
            // fall through
            case 'top':
                bounds.height = this.config.height || height / 2;
                bounds.width = this.config.width || width;
                break;
            case 'right':
                bounds.x += this.config.width || width / 2;
                bounds.height = this.config.height || height;
            // fall through
            case 'left':
                bounds.width = this.config.width || width / 2;
                bounds.height = this.config.height || height;
                break;
        }

        bounds.y = Math.round(bounds.y);
        bounds.width = Math.round(bounds.width);
        bounds.x = Math.round(bounds.x);
        bounds.height = Math.round(bounds.height);

        this.quakeWindow.setBounds(bounds);
    }

    createNewQuakeWindow(callback) {
        debug('creating new window');

        this.app.createWindow(win => {
            this.quakeWindow = win;

            // creates a shell in the new window
            win.rpc.emit('termgroup add req');

            this.quakeWindow.on('close', () => this.handleOnQuakeWindowClose());

            if (callback) {
                callback();
            }
        });
    }

    returnFocus() {
        // this attempts to return focus to the app that previously had focus before Hyper
        if (((this.previousAppFocus || {}).sessions || {}).size) {
            this.previousAppFocus.focus();
        } else if (isMac) {
            Menu.sendActionToFirstResponder('hide:');
        }
    }

    handleOnQuakeWindowClose() {
        debug('closing');

        this.quakeWindow = null;
    }

    destroy() {
        this.quakeWindow = null;
        this.previousAppFocus = null;

        debug('destroyed');
        // @TODO other cleanup?
    }
};

function debug(...args) {
    if (DEBUG) {
        console.error(...args);
        log.info(...args);
    }
}

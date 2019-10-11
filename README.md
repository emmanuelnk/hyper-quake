hyper-quake
===========

**DEPRECATED**: i don't have time to support this; please consider forking for your own use.

a quake-style drop down plugin for [hyper](https://hyper.is/).

forked from [hyperterm-visor](https://github.com/CWSpear/hyperterm-visor)

# contribute

1. Run Hyper on dev mode (built from source after cloning repository) like explained in Contribute section in Readme: https://github.com/zeit/hyper#contribute
2. Copy your config file .hyper.js in cloned repository root directory. Hyper in dev mode will use this one. That means that you can continue to use installed Hyper with your day-to-day config.
3. After a first run, Hyper on dev mode will have created a new .hyper_plugins in your repository root. Go to <repository_root>/.hyper_plugins/local and create/clone your plugin repo (or make a symlink)
4 .Edit your dev config, and add your plugin name (directory name in your local directory) in localPlugins array.

Good to know: when you put a console.log() in your plugin code, it will be displayed in App's devtools only if it is executed in a renderer method, like component decorators. If it is located in Electron main process method, like onApp handler, it will be displayed in your terminal where you made your yarn run app.

# installation

In your `~/.hyper.js`, add `hyperterm-quake` to the plugin list.

# config

```js
modules.exports = {
  config: {
    // other config...
    quake: {
      hotkey: 'CommandOrControl+Shift+Z',
      // valid positions: 'top', 'left', 'right', 'bottom'
      position: 'top',
      // optional: defaults to 100% of the viewable area.
      width: 200,
      height: 900,
    },
  },
  // ...
};
```

use the [Electron Accelerator docs](https://github.com/electron/electron/blob/master/docs/api/accelerator.md) to define custom hotkeys.

# roadmap

* option to always open on a specific monitor, etc.
* create window if all windows have been closed.

**note**: [hyper-overlay](https://github.com/favna/hyper-overlay) looks like it's got some of this already figured out.

## caveats

* it always uses the most recently open window as your quake window.
* if all windows have been closed, it won't do anything until you manually open a new window.

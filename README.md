hyper-quake
===========

a quake-style drop down plugin for [hyper](https://hyper.is/).

forked from [hyperterm-visor](https://github.com/CWSpear/hyperterm-visor)

# installation

In your `~/.hyper.js`, add `hyperterm-quake` to the plugin list.

# config

```js
modules.exports = {
  config: {
    // other config...
    quake: {
      hotkey: 'CommandOrControl+Shift+Z',
      position: 'top', // or left, right, bottom
      width: 200, // Optional, defaults to half of viewable area for horizontal positions, 100% for vertical
      height: 900, // Optional, defaults to half of viewable area for vertical positions, 100% for horizontal
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

# Webpack Fix Default Import Plugin #

## THIS PACKAGE IS DEPRECATED ##

Please use `esModuleInterop` option that is available since TypeScript 2.7 to use default imports in the same way as in Babel.

## Why? ##

With Babel transpiler you could write:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```

In this case Babel will be able to resolve `module.exports.default` as
`modules.exports` if `module.exports.default` is not defined.

It doesn't work with TypeScript compiler which targets ES5, so we have to use:

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

One well know workaround for this issue is to use TWO transpilers, typescript
first targeted to ES6 and Babel second targeted to ES5. Extra transpilation
takes more time and break source maps.

The other solution is to hook into webpack's `require()` implementation and
polyfill `module.exports.default` if it is blank and module is not ES6 module.

This plugin hooks into `require()` and try to polyfill `module.exports.default`.

## Installation ##

```shell
npm install --save-dev webpack-fix-default-import-plugin
```

`webpack.config.js` example:

```javascript
var FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');

module.exports = {
  ...
  plugins: [
    ...
    new FixDefaultImportPlugin()
  ],
};
```

`tsconfig.json` example:

```javascript
{
  "compilerOptions": {
    "sourceMap": true,
    "noImplicitAny": true,
    "noEmitHelpers": true,
    "allowSyntheticDefaultImports": true,   // required
    "module": "commonjs",                   // required
    "target": "es5",                        // required
    "jsx": "react"
  },
  "exclude": [
    "node_modules",
    "typings/globals"
  ]
}
```

`tslint.json` example:

```javascript
{
  ...
  "rules": {
    ...
    "no-unused-variable": [true, {"ignore-pattern": "^(React|ReactDOM)$"}],
    "import-name": false,
    "no-default-export": false
  }
}
```

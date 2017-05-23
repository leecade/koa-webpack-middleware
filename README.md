# koa-webpack-middleware

[![npm version](http://img.shields.io/npm/v/koa-webpack-middleware.svg?style=flat-square)](https://npmjs.org/package/koa-webpack-middleware "View this project on npm")
[![Circle CI](https://circleci.com/gh/leecade/koa-webpack-middleware.svg)](https://circleci.com/gh/leecade/koa-webpack-middleware)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for [koa2](https://github.com/koajs/koa/tree/v2.x) with [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html)(HMR) support.

## Install

You can install `koa-webpack-middleware` using npm:
```sh
$ npm i koa-webpack-middleware -D
```

## Dependencies

This middleware is designed for the koa2 ecosystem. Make sure that you have installed the correct version:

```sh
$ npm i koa@next -S
```

## Usage

See [example/](./example/) for an example of usage.

```js
import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from './webpack.config.dev'
const compile = webpack(devConfig)
app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: true,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: "/assets/",

    // custom headers
    headers: { "X-Custom-Header": "yes" },

    // options for formating the statistics
    stats: {
        colors: true
    }
}))
app.use(hotMiddleware(compile, {
  // log: console.log,
  // path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
}))
```

## HMR Configuration

1. Webpack `plugins` configuration

    ```js
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
    ```
2. Webpack `entry` configuration

    ```sh
    $ npm i eventsource-polyfill -D
    ```

    ```js
    entry: {
      'index': [
        // For old browsers
        'eventsource-polyfill',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        'index.js']
    },
    ```

3. Webpack `loader` configuration 
    
    ```sh
    $ npm i babel-preset-es2015 babel-preset-stage-0 -D
    ```

    ```js
    {
      test: /\.js$/,
      loader: 'babel',
      query: {
        'presets': ['es2015', 'stage-0']
        }
      },
      include: './src'
    }
    ```

    **HMR for a react project:**

    ```sh
    $ npm i babel-preset-react babel-preset-react-hmre -D
    ```

    ```js
    {
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        'presets': ['es2015', 'stage-0', 'react'],
        'env': {
          'development': {
            'presets': ['react-hmre']
          }
        }
      },
      include: './src'
    }
    ```

4. Copy the code below into your entry file to enable HMR

    **Not needed for a React project!**

    ```js
    if (module.hot) {
      module.hot.accept()
    }
    ```

**That's all, you're all set!**
    

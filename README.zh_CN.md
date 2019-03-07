# egg-decorator-router

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-decorator-router.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-decorator-router
[travis-image]: https://img.shields.io/travis/eggjs/egg-decorator-router.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-decorator-router
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-decorator-router.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-decorator-router?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-decorator-router.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-decorator-router
[snyk-image]: https://snyk.io/test/npm/egg-decorator-router/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-decorator-router
[download-image]: https://img.shields.io/npm/dm/egg-decorator-router.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-decorator-router

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

| egg-decorator-router 版本 | egg 1.x |
| ------------------------- | ------- |
| 1.x                       | 😁      |
| 0.x                       | ❌       |

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.decoratorRouter = {
  enable: true,
  package: 'egg-decorator-router',
};
```

## 使用场景

- 不用单独定义router，直接在controller里通过装饰器自动生成router
尽可能描述详细。
- 支持中间件的定义

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

```javascript
'use strict'

const { Controller } = require('egg')
const { Route, HttpGet, Middleware, filters } = require('egg-decorator-router')
const { DefaultFilter } = filters

const routeM = (ctx, next) => {
  console.log('passed route middleware')
  next()
}

const actionM = i => {
  return (ctx, next) => {
    console.log('passed action middleware ' + i)
    next()
  }
}

@Route()
@Middleware(routeM)
class HomeController extends Controller {
  @HttpGet('/')
  async index() {
    await new Promise(resolve => {
      this.ctx.body = 'ssss'
      resolve()
    })
  }

  @HttpGet()
  @Middleware(actionM(2), 2)
  @Middleware(actionM(1), 1)
  func1(ctx) {
    ctx.body = 'hi, func1'
  }

  @HttpGet(':id')
  @DefaultFilter('aaa')
  func2(ctx) {
    ctx.body = 'hi, func2' + ctx.params.id
  }
}

module.exports = HomeController
```

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)

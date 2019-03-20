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

## 依赖说明

### 依赖的 egg 版本

| egg-decorator-router 版本 | egg 1.x |
| ------------------------- | ------- |
| 1.x                       | 😁      |
| 0.x                       | ❌       |

## 开启插件

```js
// config/plugin.js
exports.decoratorRouter = {
  enable: true,
  package: 'egg-decorator-router',
}
```

## 使用场景

使用 es7 装饰器来定义 egg 的路由

- 不用单独定义router，直接在 controller 里通过装饰器自动生成 router
- 支持在 controller 里通过装饰器方式加入中间件

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 规范

The full path is combin between root-path and sub-path.

### Use Route define a root-path on the controller

Define a root path on controller

```javascript
// root path is '/'
@Route()

// root path is '/'
@Route('/')

// root path is '/routename'
@Route('/routename')

// root path is '/routename/action'
@Route('/routename/action')
```

Parameter is available

```javascript
@Route('/routename/:name')
```

### Use HttpMethod define a sub-path

HttpMethod include `HttpGet` `HttpPost` `HttpPut` `HttpPatch` and `HttpDelete`

Define a sub-path in controller's method

```javascript
// sub-path is '/'
@HttpGet()

// sub-path is '/'
@HttpGet('/')

// sub-path is '/action'
@HttpGet('/action')

// sub-path is '/action/:id'
@HttpGet('/action/:id')
```

### Define middleware

```javascript
@Middleware(routeM)
```

## 示例

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
  @HttpGet('/') // path: /
  async index() {
    await new Promise(resolve => {
      this.ctx.body = 'ssss'
      resolve()
    })
  }

  @HttpGet() // path: /func1
  @Middleware(actionM(2), 2)
  @Middleware(actionM(1), 1)
  func1(ctx) {
    ctx.body = 'hi, func1'
  }

  @HttpGet('/:id') // path: /:id
  @DefaultFilter('aaa')
  func2(ctx) {
    ctx.body = 'hi, func2 ' + ctx.params.id
  }
}

module.exports = HomeController
```

## 提问交流

请到 [egg issues](https://github.com/fyl080801/egg-decorator-router/issues) 异步交流。

## License

[MIT](LICENSE)

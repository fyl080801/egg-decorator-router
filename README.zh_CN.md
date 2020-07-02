# egg-decorator-router

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-decorator-router.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-decorator-router
[travis-image]: https://img.shields.io/travis/fyl080801/egg-decorator-router.svg?style=flat-square
[travis-url]: https://travis-ci.org/fyl080801/egg-decorator-router.svg?branch=master
[codecov-image]: https://img.shields.io/codecov/c/github/fyl080801/egg-decorator-router.svg?style=flat-square
[codecov-url]: https://codecov.io/github/fyl080801/egg-decorator-router?branch=master
[david-image]: https://img.shields.io/david/fyl080801/egg-decorator-router.svg?style=flat-square
[david-url]: https://david-dm.org/fyl080801/egg-decorator-router
[snyk-image]: https://snyk.io/test/npm/egg-decorator-router/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-decorator-router
[download-image]: https://img.shields.io/npm/dm/egg-decorator-router.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-decorator-router

使用装饰器来定义 egg.js 的路由和中间件

## 依赖说明

### 依赖的 egg 版本

| egg-decorator-router 版本 | egg 1.x |
| ------------------------- | ------- |
| 1.x                       | 😁      |
| 0.x                       | ❌      |

## 开启插件

```js
// config/plugin.js
exports.decoratorRouter = {
  enable: true,
  package: 'egg-decorator-router'
}
```

> 基于 typescript 的 eggjs 项目可直接使用装饰器  
> 如果是 js 项目，则需要手动安装 `babel-plugin-transform-decorators-legacy` 和 `babel-plugin-transform-object-rest-spread`这两个包，并在项目里加入 `.babelrc` 文件

.babelrc 定义如下:

```json
{
  "plugins": ["transform-decorators-legacy", "transform-object-rest-spread"]
}
```

## 使用场景

- 不用单独定义 router，直接在 controller 里通过装饰器自动生成 router
- 支持在 controller 里通过装饰器方式加入中间件

## 规范

Http 请求的完整路径是根路径和子路径合并的结果

在 controller 中先引入依赖

```javascript
const {
  Route,
  HttpAll,
  HttpGet,
  HttpPost,
  HttpPut,
  HttpPatch,
  HttpDelete,
  Middleware
} = require('egg-decorator-router')
```

如果使用 typescript

```typescript
import {
  Route,
  HttpAll,
  HttpGet,
  HttpPost,
  HttpPut,
  HttpPatch,
  HttpDelete,
  Middleware
} from 'egg-decorator-router'
```

### 直接在 controller 里定义一个路由

在 controller 里定义一个根路径

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

支持定义参数

```javascript
@Route('/routename/:name')
```

### 定义子目录和 HttpMethod

支持 Http 方法 `HttpGet` `HttpPost` `HttpPut` `HttpPatch` `HttpDelete` `HttpAll`

在 controller 方法上定义子目录

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

### 定义中间件

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

## License

[MIT](LICENSE)

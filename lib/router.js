'use strict'

const { app } = require('./state')

function generateRoute(method, name) {
  return function(path) {
    return function(target, key, descriptor) {
      target.__actions__ = target.__actions__ || []

      target.__actions__.push({
        key: key,
        name: name,
        path: path || key,
        fullpath: path || key,
        method: method,
        descriptor: descriptor,
        target: target[key]
      })

      return descriptor
    }
  }
}

const Route = function(prefix) {
  return (target, key, descriptor) => {
    const actions = target.prototype.__actions__ || []

    actions.forEach(action => {
      action.fullpath =
        '/' +
        [prefix, action.fullpath]
          .join('/')
          .split('/')
          .filter(item => item !== '')
          .join('/')
    })

    app.beforeStart(() => {
      actions.forEach(action => {
        let finall = null

        target.prototype.pathName
          .split('.')
          .concat([action.key])
          .forEach(pt => {
            finall = finall ? finall[pt] : app[pt]
          })

        if (finall) {
          app.router[action.method].apply(
            app.router,
            // 名称和路径
            [action.name, action.fullpath]
              .concat(
                // 中间件
                (target.__middlewares__ || [])
                  .sort((i, j) => i.index - j.index)
                  .map(item => item.value)
                  .concat(
                    (action.target.__middlewares__ || [])
                      .sort((i, j) => i.index - j.index)
                      .map(item => item.value)
                  )
              )
              .concat(
                // 最终实现
                [finall]
              )
          )
        }
      })
    })

    return descriptor
  }
}

const HttpGet = function(path, name) {
  return (target, key, descriptor) => {
    return generateRoute('get', name)(path)(target, key, descriptor)
  }
}

const HttpPost = function(path, name) {
  return (target, key, descriptor) => {
    return generateRoute('post', name)(path)(target, key, descriptor)
  }
}

const HttpPut = function(path, name) {
  return (target, key, descriptor) => {
    return generateRoute('put', name)(path)(target, key, descriptor)
  }
}

const HttpPatch = function(path, name) {
  return (target, key, descriptor) => {
    return generateRoute('patch', name)(path)(target, key, descriptor)
  }
}

const HttpDelete = function(path, name) {
  return (target, key, descriptor) => {
    return generateRoute('delete', name)(path)(target, key, descriptor)
  }
}

module.exports = {
  Route,
  HttpGet,
  HttpPost,
  HttpPut,
  HttpPatch,
  HttpDelete
}

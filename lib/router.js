'use strict'

const { app, routes } = require('./state')

function generateRoute(method, name) {
  return function(path) {
    return function(target, key, descriptor) {
      target.__actions__ = target.__actions__ || []

      target.__actions__.push({
        key: key,
        name: name,
        path: path || `/${key}`,
        fullpath: path || `/${key}`,
        method: method,
        descriptor: descriptor,
        target: target[key]
      })

      return descriptor
    }
  }
}

function compare(string1, string2) {
  for (let i = 1; i < string1.length; i++) {
    let val1 = string1[i]
    let val2 = string2[i]
    if (val1 < val2) {
      return false
    } else if (val1 > val2) {
      return true
    }
  }
  return false
}

app.ready(() => {
  Object.keys(routes)
    .sort((i, j) => compare(j, i))
    .forEach(key => {
      app.logger.info(`[router] pid: ${process.pid}, key: '${key}'`)
      app.logger.info(`[router] pid: ${process.pid}, initialized: '${routes[key].route[1]}'`)
      app.router[routes[key].method].apply(app.router, routes[key].route)
    })
})

const Route = function(prefix) {
  return (target, key, descriptor) => {
    let actions;
    if(!descriptor)
      actions = target.prototype.__actions__ || []
    else
      actions = target.__actions__ || []

    actions.forEach(action => {
      action.fullpath = (prefix || '') + action.fullpath
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
          routes[`${action.name || ''}&${action.fullpath}&${action.method}`] = {
            method: action.method,
            route: [action.name, action.fullpath] // 名称和路径
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
          }
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

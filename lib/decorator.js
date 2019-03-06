'use strict'

// const app = require('./app')

function generateRoute(method, name) {
  return function(path) {
    return function(target, key, descriptor) {
      const org = descriptor.value

      // 定义controller下的action
      target.__actions__ = target.__actions__ || []
      target.__actions__.push({
        key: key,
        name: name,
        path: path || key,
        fullpath: path || key,
        method: method,
        middlewares: target[key].middlewares || []
      })

      descriptor.value = function(...args) {
        return org.call(this, args)
      }

      return descriptor
    }
  }
}

const Route = function(prefix) {
  return (target, key, descriptor) => {
    target.prototype.__actions__ = target.prototype.__actions__ || []
    target.prototype.__actions__.forEach(action => {
      action.fullpath =
        '/' +
        [prefix, action.fullpath]
          .join('/')
          .split('/')
          .filter(item => item !== '')
          .join('/')
    })

    return descriptor
  }
}

const HttpGet = function(path) {
  return (target, key, descriptor) => {
    return generateRoute('get')(path)(target, key, descriptor)
  }
}

const HttpPost = function(path) {
  return (target, key, descriptor) => {
    return generateRoute('post')(path)(target, key, descriptor)
  }
}

const HttpPut = function(path) {
  return (target, key, descriptor) => {
    return generateRoute('put')(path)(target, key, descriptor)
  }
}

const HttpPatch = function(path) {
  return (target, key, descriptor) => {
    return generateRoute('patch')(path)(target, key, descriptor)
  }
}

const HttpDelete = function(path) {
  return (target, key, descriptor) => {
    return generateRoute('delete')(path)(target, key, descriptor)
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

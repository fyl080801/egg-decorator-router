const Middleware = function(middleware, index = 0) {
  return (target, key, descriptor) => {
    const obj = key ? target[key] : target

    obj.__middlewares__ = obj.__middlewares__ || []

    obj.__middlewares__.push({
      value: middleware,
      index: index
    })

    return descriptor
  }
}

module.exports = Middleware

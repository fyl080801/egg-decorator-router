/**
 * 执行前后不会改变方法本身
 */
class Filter {
  decorator() {
    const filter = this

    return function(target, key, descriptor) {
      const invoke = descriptor.value

      descriptor.value = function() {
        const state = {}
        filter.before(this, state)
        var result = invoke.apply(this, arguments)
        filter.after(this, state)
        return result
      }

      return descriptor
    }
  }

  before() {}

  after() {}
}

/**
 * 执行前提供终止方法执行的行为
 */
class InterceptFilter extends Filter {
  decorator() {
    // const filter = this

    return function(target, key, descriptor) {
      //   const invoke = descriptor.value

      //   descriptor.value = function() {
      //     const state = {}
      //     filter.before(this, state)
      //     var result = invoke.apply(this, arguments)
      //     filter.after(this, state)
      //     return result
      //   }

      return descriptor
    }
  }

  before() {}

  after() {}

  interrupt() {}
}

class DefaultFilter extends Filter {
  constructor(str) {
    super()
    this.str = str
    return () => {
      return this.decorator()
    }
  }
  before(ctx, state) {
    console.log('********************** before start')
    console.log('this is before ' + this.str)
    console.log('state:', state)

    state.ssss = 'sssss'
  }
  after(ctx, state) {
    console.log('********************** after start')
    console.log('this is after ' + this.str)
    console.log('state:', state)
  }
}

module.exports = {
  Filter,
  InterceptFilter,
  DefaultFilter: str => new DefaultFilter(str)()
}

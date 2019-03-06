require('egg')

var _app = null

module.exports = {
  get app() {
    if (!_app) {
      throw new Error('decorator-router plugin is not enable!')
    }

    return _app
  },
  set app(value) {
    _app = value
  }
}

'use strict'

const register = require('babel-register')

register({
  plugins: ['transform-decorators-legacy']
})

module.exports = app => {
  const state = require('./lib/state')
  state.app = app
}

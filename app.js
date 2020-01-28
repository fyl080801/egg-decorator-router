'use strict'

const register = require('babel-register')
const state = require('./lib/state')

register({
  plugins: ['transform-decorators-legacy']
})

module.exports = app => {
  state.app = app
}

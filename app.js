'use strict'

const state = require('./lib/state')

module.exports = (app) => {
  state.app = app
}

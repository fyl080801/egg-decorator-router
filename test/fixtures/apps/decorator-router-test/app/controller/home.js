'use strict'

const Controller = require('egg').Controller
const { Route, HttpGet, HttpPost } = require('../../../../../../lib')

@Route()
class HomeController extends Controller {
  @HttpGet('/api')
  async index() {
    const { app, ctx } = this

    ctx.body = 'hi, ' + app.plugins.decoratorRouter.name
  }

  @HttpPost('/api')
  async create() {
    const { ctx } = this

    ctx.body = 'post data: ' + JSON.stringify(ctx.request.body)
  }
}

module.exports = HomeController

'use strict'

const mock = require('egg-mock')

describe('test/decorator-router.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: 'apps/decorator-router-test'
    })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('should GET /api', () => {
    return app
      .httpRequest()
      .get('/api')
      .expect('hi, decoratorRouter')
      .expect(200)
  })

  it('should POST /api', () => {
    const postData = { name: 'test', num: 1 }

    return app
      .httpRequest()
      .post('/api')
      .send(postData)
      .expect('post data: ' + JSON.stringify(postData))
      .expect(200)
  })
})

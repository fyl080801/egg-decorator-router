'use strict';

const mock = require('egg-mock');

describe('test/decorator-router.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/decorator-router-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, decoratorRouter')
      .expect(200);
  });
});

/**
 * Module Dependencies
 */

var assert = require('assert');
var context = require('../');
var fs = require('fs');

/**
 * Testing
 */

describe('response', function() {

  it('should give you good defaults', function() {
    var ctx = context();
    assert.deepEqual({}, ctx.header);
    assert.deepEqual(null, ctx.status);
    assert.deepEqual(null, ctx.message);
    assert.deepEqual(null, ctx.body);
    assert.deepEqual(null, ctx.length);
    assert.deepEqual(false, ctx.headerSent);
    assert.deepEqual(null, ctx.lastModified);
    assert.deepEqual(null, ctx.etag);
    assert.deepEqual(null, ctx.type);
    assert.deepEqual(false, ctx.writable);
  })

  it('should support set status', function() {
    var ctx = context();
    ctx.status = 200;

    assert.deepEqual(200, ctx.status);
    assert.deepEqual('OK', ctx.message);
    assert.deepEqual(null, ctx.body);
  })

  it('should support set message', function() {
    var ctx = context();
    ctx.message = 'Hello';

    assert.deepEqual('Hello', ctx.message);
  })

  describe('response body', function() {

    it('string', function() {
      var ctx = context();
      ctx.body = 'hello world!';

      assert.deepEqual('hello world!', ctx.body);
      assert.deepEqual(200, ctx.status);
      assert.deepEqual(12, ctx.length);
      assert.deepEqual('text/plain', ctx.type);
    })

    it('html', function() {
      var ctx = context();
      ctx.body = '<h2>hello world!</h2>';

      assert.deepEqual('<h2>hello world!</h2>', ctx.body);
      assert.deepEqual(200, ctx.status);
      assert.deepEqual(21, ctx.length);
      assert.deepEqual('text/html', ctx.type);
    })

    it('json', function() {
      var ctx = context();
      ctx.body = { hi: 'world!' };

      assert.deepEqual({ hi: 'world!' }, ctx.body);
      assert.deepEqual(200, ctx.status);
      assert.deepEqual(15, ctx.length);
      assert.deepEqual('application/json', ctx.type);
    });

    it('stream', function() {
      var ctx = context();
      ctx.body = fs.createReadStream(__dirname + '/request.js');

      assert.deepEqual('function', typeof ctx.body.pipe);
      assert.deepEqual(200, ctx.status);
      assert.deepEqual(null, ctx.length);
      assert.deepEqual('application/octet-stream', ctx.type);
    })

    it('buffer', function() {
      var ctx = context();
      ctx.body = new Buffer('hi world!');

      assert.deepEqual(true, Buffer.isBuffer(ctx.body));
      assert.deepEqual(9, ctx.length);
      assert.deepEqual(200, ctx.status);
      assert.deepEqual('application/octet-stream', ctx.type);
    })
  })

  it('should support set type', function() {
    var ctx = context();
    ctx.type = 'json';
    assert.deepEqual('application/json', ctx.type);

  })

  it('should support set lastModified', function() {
    var date = new Date();
    var ctx = context();
    ctx.lastModified = date;
    assert.deepEqual(date.toString(), ctx.lastModified.toString());
  })

  it('should support set etag', function() {
    var ctx = context();
    ctx.etag = '"md5hashsum"';
    assert.deepEqual('"md5hashsum"', ctx.etag);
  })

});

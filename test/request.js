/**
 * Module Dependencies
 */

var assert = require('assert');
var context = require('../');

/**
 * Testing
 */

describe('request', function() {

  it('should give you good defaults', function() {
    var ctx = context();
    assert.equal('', ctx.url);
    assert.deepEqual({}, ctx.headers);
    assert.equal(null, ctx.href);
    assert.equal(null, ctx.method);
    assert.equal(null, ctx.path);
    assert.deepEqual({}, ctx.query);
    assert.equal(null, ctx.querystring);
    assert.equal(null, ctx.search);
    assert.equal(null, ctx.host);
    assert.equal(null, ctx.hostname);
    assert.equal(false, ctx.idempotent);
    assert.equal(null, ctx.charset);
    assert.equal(null, ctx.protocol);
    assert.equal(false, ctx.secure);
    assert.deepEqual([], ctx.subdomains);
    assert.equal(null, ctx.accept);
    assert.equal(false, ctx.fresh);
    assert.equal('html', ctx.accepts('html'));
    assert.equal('json', ctx.accepts('json', 'text'));
    assert.deepEqual(['*'], ctx.acceptsCharsets());
    assert.deepEqual(['*'], ctx.acceptsLanguages());
    assert.equal(null, ctx.is('text/*', 'application/json'));
    assert.equal(null, ctx.type);
    assert.equal(undefined, ctx.get('referrer'));
  });

  it('should work when you set ctx.url', function() {
    var ctx = context();
    ctx.url = 'https://gittask.com/cheeriojs/cheerio?test=hi';

    assert.equal('https://gittask.com/cheeriojs/cheerio?test=hi', ctx.url);
    assert.deepEqual({}, ctx.headers);
    assert.equal('https://gittask.com/cheeriojs/cheerio?test=hi', ctx.href);
    assert.equal(null, ctx.method);
    assert.equal('/cheeriojs/cheerio', ctx.path);
    assert.deepEqual({ test: 'hi' }, ctx.query);
    assert.equal('test=hi', ctx.querystring);
    assert.equal('?test=hi', ctx.search);
    assert.equal('gittask.com', ctx.host);
    assert.equal('gittask.com', ctx.hostname);
    assert.equal(false, ctx.idempotent);
    assert.equal(null, ctx.charset);
    assert.equal('https', ctx.protocol);
    assert.equal(true, ctx.secure);
    assert.deepEqual([], ctx.subdomains);
    assert.equal(null, ctx.accept);
    assert.equal('html', ctx.accepts('html'));
    assert.equal('json', ctx.accepts('json', 'text'));
    assert.deepEqual(['*'], ctx.acceptsCharsets());
    assert.deepEqual(['*'], ctx.acceptsLanguages());
    assert.equal(null, ctx.is('text/*', 'application/json'));
    assert.equal(null, ctx.type);
    assert.equal(undefined, ctx.get('referrer'));
  });

  it('should support setting ctx.method', function() {
    var ctx = context();
    ctx.method = 'head';
    assert.equal('head', ctx.method);
    assert(true, ctx.idempotent);
  })

  it('should support setting ctx.path', function() {
    var ctx = context();
    ctx.path = '/hi';
    assert.equal('/hi', ctx.path);
    // TODO: not sure about this one
    assert.equal('/hi', ctx.url);
    assert.equal(null, ctx.protocol);
  })

  it('should support setting ctx.query', function() {
    var ctx = context();
    ctx.query = { test: 'hi' };
    assert.deepEqual({ test: 'hi' }, ctx.query);
    assert.equal('test=hi', ctx.querystring);
    assert.equal('?test=hi', ctx.search);
    // TODO: not sure about this one
    assert.equal('?test=hi', ctx.url);
  });

  it('should support setting ctx.querystring', function() {
    var ctx = context();
    ctx.querystring = 'test=hi';
    assert.deepEqual({ test: 'hi' }, ctx.query);
    assert.equal('test=hi', ctx.querystring);
    assert.equal('?test=hi', ctx.search);
    // TODO: not sure about this one
    assert.equal('?test=hi', ctx.url);
  });


  it('should support setting ctx.search', function() {
    var ctx = context();
    ctx.search = '?test=hi';
    assert.deepEqual({ test: 'hi' }, ctx.query);
    assert.equal('test=hi', ctx.querystring);
    assert.equal('?test=hi', ctx.search);
    // TODO: not sure about this one
    assert.equal('?test=hi', ctx.url);
  });

  // TODO: accepts tests
});

var assert = require('assert');
var path = require('path');
var mload = require('../index.js');
var oAlias = {
	simple: './mod/simple.js',
	nofile: './mod/nofile.js'
};

mload(oAlias);


assert.doesNotThrow(function()
{
	var test = mload('simple');
	assert.strictEqual(test.simple, true, 'direct load simple value');
}, 'direct load simple');

var test = mload.load('simple');
assert.strictEqual(test.simple, true, 'load simple value');

var test2 = mload.reload('simple');
assert.notStrictEqual(test, test2, 'reload');

assert.throws(function()
{
	mload('noalias');
}, 'load wrong alias');

assert.throws(function()
{
	mload('nofile');
}, 'load nofile alias');


assert.strictEqual(mload.info().filename, path.normalize(__filename), 'info self');
assert.strictEqual(mload.info('nofile').filename, path.normalize(__dirname+'/'+oAlias.nofile), 'info alias');

require('./mod/child_dir.js');

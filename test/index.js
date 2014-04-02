var assert = require('assert');

var oConfig = {
	global: 'mload',
	alias: {
		'simple': './mod/simple.js',
		'nofile': './mod/nofile.js'
	}
};

var mload = require('../index.js')(oConfig, __dirname+'/');

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


// test global
require('./global.js');
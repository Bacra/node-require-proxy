var assert = require('assert');
var mload = require('../../index.js');

mload(
{
	simple_child: './simple_child.js'
});


assert.doesNotThrow(function()
{
	var test = mload('simple_child');
	assert.strictEqual(test.simple, true, 'direct load simple_child value');
}, 'direct load simple_child');

var test = mload.load('simple_child');
assert.strictEqual(test.simple, true, 'load simple_child value');

var test2 = mload.reload('simple_child');
assert.notStrictEqual(test, test2, 'reload simple_child');

assert.strictEqual(mload.load('simple').simple, true, 'load simple in chid');

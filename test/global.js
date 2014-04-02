var assert = require('assert');

assert.doesNotThrow(function()
{
	// console.log(mload);
	var test = mload('simple');
	assert.strictEqual(test.simple, true, 'global load simple value');
}, 'global load simple');
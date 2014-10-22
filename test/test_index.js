var path = require('path');
var mload = require('mload');
var oAlias = {
	simple: './mod/simple.js',
	nofile: './mod/nofile.js'
};

mload(oAlias);

exports.testBase = {
	base: function(test)
	{
		test.doesNotThrow(function()
		{
			var simple = mload('simple');
			test.strictEqual(simple.simple, true, 'direct load simple value');
		}, 'direct load simple');

		var simple = mload.load('simple');
		test.strictEqual(simple.simple, true, 'load simple value');

		var simple2 = mload.reload('simple');
		test.notStrictEqual(simple, simple2, 'reload');

		test.throws(function()
		{
			mload('noalias');
		}, 'load wrong alias');

		test.throws(function()
		{
			mload('nofile');
		}, 'load nofile alias');

		test.done();
	},
	native_require: function(test)
	{
		test.strictEqual(mload('fs'), require('fs'), 'load native module');
		test.strictEqual(mload('simple'), require('simple'), 'load custom alias module');

		test.done();
	},
	mload_info: function(test)
	{
		test.strictEqual(mload.info().filename, path.normalize(__filename), 'info self');
		test.strictEqual(mload.info('nofile').filename, undefined, 'info alias');

		test.done();
	}
}

exports.addAliasByFile = function(test)
{
	mload.addAliasByFile('./mod/alias.js');
	test.strictEqual(mload('simple2').simple, true, 'addAliasByFile');

	test.done();
};

exports.child_dir = require('./mod/child_dir.js');

exports.other_package = function(test)
{
	var _oCustom = mload('custom');
	test.strictEqual(_oCustom.value, 1, 'custom node_module package');

	_oCustom.test(test);

	test.strictEqual(mload('simple').simple, true, 'load simple value after node package');

	test.done();
};


exports.no_mload = require('no_mload');
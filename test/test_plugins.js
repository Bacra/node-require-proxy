// require('debug').enable('mload:*');

var mload = require('mload');

exports.load = {
	base: function(test) {
		test.doesNotThrow(function() {
			mload.loadPlugin('vars');
		}, 'load exists');

		test.throws(function() {
			mload.loadPlugin('tpl');
		}, 'load not exists');

		test.done();
	}
};

exports.vars = {
	base: function(test) {
		mload.loadPlugin('vars', {mod_path: __dirname+'/mod/'/*, mod_path2: './mod/'*/});

		test.doesNotThrow(function() {
			mload('$mod_path$simple');
		}, 'load simple');

		test.doesNotThrow(function() {
			require('$mod_path$simple');
		}, 'load simple2');

		test.done();
	}
};


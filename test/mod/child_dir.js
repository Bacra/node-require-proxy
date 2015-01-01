module.exports = function(test) {
	var mload = require('mload');

	mload({
		simple_child: './simple_child.js'
	});

	// not mload
	test.ok(module.parent.filename.indexOf('test') != -1, 'child check parent module');

	test.doesNotThrow(function() {
		var simple = mload('simple_child');
		test.strictEqual(simple.simple, true, 'direct load simple_child value');
	}, 'direct load simple_child');


	var simple = mload.load('simple_child');
	test.strictEqual(simple.simple, true, 'load simple_child value');

	var simple2 = mload.reload('simple_child');
	test.notStrictEqual(simple, simple2, 'reload simple_child');

	test.strictEqual(mload.load('simple').simple, true, 'load simple in chid');

	test.done();
}
var mload = require('mload');
// console.log(mload.info().filename);

module.exports = {
	test: function(test) {
		mload({
			simple: './simple.js'
		});
		
		test.doesNotThrow(function() {
			// console.log(require('simple'));
			test.strictEqual(require('simple').custom_package, 1, 'require: simple in custom package');
		}, 'require err: simple in custom package');
	},
	value: 1
};

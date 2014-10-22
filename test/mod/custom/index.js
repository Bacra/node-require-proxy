module.exports = {
	test: function(test)
	{
		var mload = require('mload');
		mload(
		{
			simple: './simple.js'
		});

		test.strictEqual(require('simple').value, 1, 'simple in child package');
	},
	value: 1
};

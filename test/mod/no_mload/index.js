module.exports = function(test)
{
	test.throws(function()
	{
		require('simple');
	}, 'no mload to load alias package');

	test.done();
};

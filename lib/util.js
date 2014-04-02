module.exports = {
	'proxy': proxy
};


/**
 * bind proxy methods
 *
 * bind proxy methods to another object
 * It use for api methods
 * 
 * @param  {Array}  _aoMethods   need dealed method list
 * @param  {Object} _aoFrom      methods form this object
 * @param  {Object} _aoTarget    add methods to this object
 */
function proxy(_aoMethods, _aoFrom, _aoTarget)
{
	_aoMethods.forEach(function(_asMethod)
	{
		_aoTarget[_asMethod] = function()
		{
			return _aoFrom[_asMethod].apply(_aoFrom, arguments);
		};
	});
}
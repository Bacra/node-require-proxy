var MLoad = require('./mload.js');
var Util = require('./util.js');
var oGlabalAlias = {};

module.exports = main;

function main(_asRootFile)
{
	var _oMLoad = new MLoad(oGlabalAlias, _asRootFile);

	function proxy(_avArg)
	{
		if (typeof(_avArg) == 'string' && arguments.length == 1)
		{
			return _oMLoad.load.apply(_oMLoad, arguments);
		}
		else if (_avArg)
		{
			return _oMLoad.addAlias.apply(_oMLoad, arguments);
		}

		return _oMLoad.info();
	}

	Util.proxy(['load', 'reload', 'clear', 'info', 'addAlias'], _oMLoad, proxy);
	proxy.self_ = _oMLoad;

	return proxy;
};

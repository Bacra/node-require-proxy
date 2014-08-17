var MLoad = require('./mload.js');
var Util = require('./util.js');

module.exports = main;


function main(_aoConfig, _asAppRoot)
{
	var _oMLoad = new MLoad(_aoConfig.alias || {}, _asAppRoot);

	// simple function
	function proxy()
	{
		return _oMLoad.load.apply(_oMLoad, arguments);
	}

	Util.proxy(['load', 'reload', 'clear'], _oMLoad, proxy);
	proxy.self_ = _oMLoad;

	// register global var
	if (_aoConfig.global) global[_aoConfig.global] = proxy;

	return proxy;
}

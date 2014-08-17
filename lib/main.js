var MLoad = require('./mload.js');
var Util = require('./util.js');

module.exports = main;


function main(_aoConfig, _asRoot)
{
	_aoConfig = _aoConfig || {};
	var _sGlobal = _aoConfig.global;
	delete _aoConfig.global;

	var _oMLoad = new MLoad(_aoConfig, _asRoot);

	// simple function
	function proxy()
	{
		return _oMLoad.load.apply(_oMLoad, arguments);
	}

	Util.proxy(['load', 'reload', 'clear'], _oMLoad, proxy);
	proxy.self_ = _oMLoad;

	// register global var
	if (_sGlobal) global[_sGlobal] = proxy;

	return proxy;
}

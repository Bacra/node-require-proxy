var QMMod = require('./mod.js');
var Util = require('./util.js');

module.exports = main;


function main(_aoConfig, _asAppRoot)
{
	var qmMod = new QMMod(_aoConfig.alias || {}, _asAppRoot);

	// simple function
	function proxy()
	{
		return qmMod.load.apply(qmMod, arguments);
	}

	Util.proxy(['load', 'reload', 'clear'], qmMod, proxy);
	proxy.origin = qmMod;

	// register global var
	if (_aoConfig.global) global[_aoConfig.global] = proxy;

	return proxy;
}
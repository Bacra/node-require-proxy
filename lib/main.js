var Mload		= require('./mload.js');
var utils		= require('./utils.js');
var glabalAlias	= require('./node_module.js')();

module.exports = main;

function main(nodeRootModule) {
	var myload = new Mload(glabalAlias, nodeRootModule);

	function proxy(_avArg) {
		if (typeof(_avArg) == 'string' && arguments.length == 1) {
			return myload.load.apply(myload, arguments);
		}
		else if (_avArg) {
			return myload.addAlias.apply(myload, arguments);
		}

		return myload.info();
	}

	utils.proxy(['load', 'reload', 'clear', 'info', 'addAlias', 'addAliasByFile'], myload, proxy);

	proxy.self_ = myload;

	return proxy;
};

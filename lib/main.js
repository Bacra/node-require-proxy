require('./module_hook.js');

var Mload		= require('./mload.js');
var utils		= require('./utils.js');
var Module		= require('module');
var globalAlias	= require('./module_alias.js');

module.exports = main;

function main(nodeRootModule) {
	var myload = new Mload(globalAlias, nodeRootModule);

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
	proxy.loadPlugin = function loadPlugin(name, opts) {
		var plugin = require('./plugins/plugin_'+name);
		plugin.action(opts, nodeRootModule);
	};

	return proxy;
};

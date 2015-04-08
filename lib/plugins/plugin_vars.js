var Module	= require('module');
var smtpl	= require('smtpl');
var utils	= require('../utils');
var debug	= require('debug')('mload:plugin_vars');

if (!Module._mload_vars) {
	var moduleVars = Module._mload_vars = {};
	var _mload = Module._mload;

	Module._mload_vars_lookup = Module._mload = function(request) {
		var request2 = smtpl(request, moduleVars);
		if (request2 != request) {
			debug('use var %s=>%s', request, request2);
			return request2;
		}

		return _mload(request);
	};
}


function addVars(opts, nodeRootModule) {
	if (opts) utils.extend(Module._mload_vars, opts);
}

module.exports = {
	action	: addVars,
	data	: Module._mload_vars
};

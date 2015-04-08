var Module	= require('module');
var debug	= require('debug')('mload:module_alias');

if (!Module._mload_alias) {
	var moduleAlias = Module._mload_alias = {};
	var _mload = Module._mload;

	Module._mload_alias_lookup = Module._mload = function(request) {
		var aliasInfo = moduleAlias[request];
		if (aliasInfo) {
			debug('use alias %s=>%s', request, aliasInfo.path);
			return aliasInfo.path;
		}

		return _mload(request);
	};
	
}

module.exports = Module._mload_alias;

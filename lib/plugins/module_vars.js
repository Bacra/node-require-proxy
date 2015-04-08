var Module = require('module');

if (!Module._mload_alias) {
	var moduleAlias = Module._mload_alias = {};

	Module._mload_alias_lookup = Module._mload = function(request) {
		var aliasInfo = moduleAlias[request];
		return aliasInfo && aliasInfo.path;
	};
	
}

module.exports = Module._mload_alias;

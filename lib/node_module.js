var Module	= require('module');
var path	= require('path');
var pkgName	= require('../package.json').name;
var debug	= require('debug')('mload:node_module');

module.exports = function() {
	if (!Module._mload_alias) {
		var moduleAlias = Module._mload_alias = {};

		var originResolveLookupPaths = Module._resolveLookupPaths;

		// [id:无用 [相关目录，如果是有parent的，基本就是parent的目录]]
		var pathsMark = ['mload_alias'];
		var returnMark = ['mload_alias', pathsMark];

		Module._resolveLookupPaths = function(request, parent) {
			if (request && request != pkgName
				// from resolveLookupPaths
				&& parent && parent.id && parent.filename
				&& moduleAlias[request]) {
				debug('alias catch request: %s, parent: %s', request, parent.filename);

				return returnMark;
			}
			return originResolveLookupPaths.apply(Module, arguments);
		};

		var originFindPath = Module._findPath;
		Module._findPath = function(request, paths) {
			// check if alias
			if (paths === pathsMark) {
				var aliasInfo = moduleAlias[request];
				debug('alias return alias: %s, path: %o', request, aliasInfo);

				if (aliasInfo) {
					request	= aliasInfo.path;
					paths	= [''];
				}
			}

			return originFindPath(request, paths);
		}
	}

	return Module._mload_alias;
};


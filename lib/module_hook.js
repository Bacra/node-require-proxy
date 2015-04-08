var Module	= require('module');
var pkgName	= require('../package.json').name;
var debug	= require('debug')('mload:node_module');


if (!Module._mload_hook) {
	Module._mload_hook = true;

	Module._mload = function(){};
	var originResolveLookupPaths = Module._resolveLookupPaths;

	// [id:just for log in node [path1, path2, path3]]
	var pathsMark	= ['mload'];
	var returnMark	= ['mload', pathsMark];

	Module._resolveLookupPaths = function(request, parent) {
		// ignore mload package
		if (request && request != pkgName
			// from resolveLookupPaths
			&& parent && parent.id && parent.filename) {

			var aliasPath = Module._mload(request);
			if (aliasPath && aliasPath != request) {
				debug('alias catch request:%s, new:%s parent:%s', request, aliasPath, parent.filename);
				return returnMark;
			}
		}

		return originResolveLookupPaths.apply(Module, arguments);
	};

	var originFindPath = Module._findPath;
	Module._findPath = function(request, paths) {
		// check if alias
		if (paths === pathsMark) {
			var aliasPath = Module._mload(request);
			debug('alias return alias:%s, path:%s', request, aliasPath);

			if (aliasPath) {
				request	= aliasPath;
				paths	= [''];
			}
		}

		return originFindPath(request, paths);
	}
}

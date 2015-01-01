var Module	= require('module');
var path	= require('path');
var pkgName	= require('../package.json').name;
var debug	= require('debug')('mload:node_module');

module.exports = function() {
	if (!Module._mload_alias) {
		var moduleAlias = Module._mload_alias = {};
		
		var getExistAlias = function(alias, subPath) {
			var subAlias = moduleAlias[subPath];
			if (subAlias && subAlias.hasOwnProperty) {
				return subAlias.hasOwnProperty(alias) && subAlias[alias];
			}
		};

		var originResolveLookupPaths = Module._resolveLookupPaths;
		Module._resolveLookupPaths = function(require, parent) {
			if (require && require != pkgName && parent && parent.id && parent.filename) {
				debug('=========== start check: resquire='+ require +' parent file='+ parent.filename);

				// get nearly mload
				// note: if this is a package, muset load self mload package
				var subPath = [];
				for(var _sMloadPath in moduleAlias) {
					var _nIndex = parent.filename.indexOf(_sMloadPath);
					if (_nIndex === 0 && parent.filename.substring(_sMloadPath.length).indexOf('node_modules') == -1) {
						subPath.push(_sMloadPath);
					} else {
						debug('node subpath', subPath);
					}
				}

				if (subPath.length) {
					subPath.sort(function(item1, item2) {
						return item1.length > item2.length ? -1 : 1;
					});

					debug('subpath', subPath, getExistAlias(require, subPath[0]));

					if (getExistAlias(require, subPath[0])) {
						return ['mload_alias', ['mload_alias', subPath[0]]];
					}
				} else {
					debug('no subpath', require, moduleAlias);
				}
			}
			
			return originResolveLookupPaths.apply(Module, arguments);
		};

		var originFindPath = Module._findPath;
		Module._findPath = function(require, paths) {
			// check if alias
			if (paths.length == 2 && paths[0] == 'mload_alias') {
				var requirePath = getExistAlias(require, paths[1]);
				if (requirePath) {
					require	= requirePath;
					paths	= [''];
				}
			}

			return originFindPath(require, paths);
		}
	}


	// the key of _mload_alias is the path of mload package widthout node_modules
	var subPath = path.dirname(path.dirname(path.dirname(__dirname)));
	return Module._mload_alias[subPath] || (Module._mload_alias[subPath] = {});
};


var Module = require('module');
var path = require('path');
var sPkgName = require('../package.json').name;

module.exports = function()
{
	if (!Module._mload_alias)
	{
		var _oModuleAlias = Module._mload_alias = {};
		var _oAliasArr = Module._mload_alias_arr = [];
		
		var getExistAlias = function(_asAlias, _asSubPath)
		{
			var _oSubAlias = _oModuleAlias[_asSubPath];
			if (_oSubAlias && _oSubAlias.hasOwnProperty)
			{
				return _oSubAlias.hasOwnProperty(_asAlias) && _oSubAlias[_asAlias];
			}
		};

		var originResolveLookupPaths = Module._resolveLookupPaths;
		Module._resolveLookupPaths = function(_asRequire, _aoParent)
		{
			if (_asRequire && _asRequire != sPkgName
				&& _aoParent && _aoParent.id && _aoParent.filename)
			{
				// console.log('=========== start check: resquire='+ _asRequire +' parent file='+ _aoParent.filename);

				// get nearly mload
				// note: if this is a package, muset load self mload package
				var _sSubPath;
				for(var i = _oAliasArr.length; i--;)
				{
					_sSubPath = _oAliasArr[i];
					if (_aoParent.filename.indexOf(_sSubPath) === 0
						&& _aoParent.filename.substring(_sSubPath.length).indexOf('node_modules') == -1)
					{
						break;
					}
					else if (!i)
					{
						_sSubPath = null;
					}
				}

				// console.log('subpath', _sSubPath, getExistAlias(_asRequire, _sSubPath));
				if (_sSubPath && getExistAlias(_asRequire, _sSubPath))
				{
					return ['mload_alias', ['mload_alias', _sSubPath]];
				}
			}
			
			return originResolveLookupPaths.apply(Module, arguments);
		};

		var originFindPath = Module._findPath;
		Module._findPath = function(_asRequire, _aoPaths)
		{
			// check if alias
			if (_aoPaths.length == 2 && _aoPaths[0] == 'mload_alias')
			{
				var _sAliasPath = getExistAlias(_asRequire, _aoPaths[1]);
				if (_sAliasPath)
				{
					_asRequire	= _sAliasPath;
					_aoPaths	= [''];
				}
			}

			return originFindPath(_asRequire, _aoPaths);
		}
	}



	// the key of _mload_alias is the path of mload package widthout node_modules
	var _sSubPath = path.dirname(path.dirname(path.dirname(__dirname)));

	// register
	if (!Module._mload_alias[_sSubPath])
	{
		Module._mload_alias_arr.push(_sSubPath);
		Module._mload_alias_arr.sort(function(_asItem1, _asItem2)
		{
			return _asItem1.length > _asItem2.length ? 1 : -1;
		});

		Module._mload_alias[_sSubPath] = {};
	}

	return Module._mload_alias[_sSubPath];
};


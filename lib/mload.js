/**
 * mod class
 * @author Bacra Woo<bacra.woo@gmail.com>
 */

var path = require('path');
var Util = require('./util.js');

module.exports = MLoad;

function MLoad(_aoAlias, _asRootFile)
{
	this._moAlias		= _aoAlias || {};
	this._msRootFile	= path.normalize(_asRootFile);
	this._msRootPath	= path.dirname(this._msRootFile)+'/';
	// console.log('RootFile', this._msRootFile);
	// console.log(this._moAlias);
}

MLoad.prototype = {
	/**
	 * load modules by alias
	 * 
	 * @param  {String} _asAlias
	 * @return {Object}
	 */
	load: function(_asAlias)
	{
		return require(this._moAlias[_asAlias] || _asAlias);
	},
	/**
	 * load modules after clear require cache
	 * 
	 * @param  {String} _asAlias
	 * @return {Object}
	 */
	reload: function(_asAlias)
	{
		this.clear(_asAlias);
		return this.load(_asAlias);
	},
	/**
	 * clear require cache
	 *
	 * @param  {Mixed} _asAlias
	 * @return {Boolean}
	 */
	clear: function(_asAlias)
	{
		if (_asAlias === true)
		{
			// delete all require cache
			var _oCache = require.cache;
			for(var i in _oCache)
			{
				delete _oCache[i];
			}
		}
		else if (_asAlias)
		{
			// delete specified alias
			if (!this._moAlias[_asAlias]) return false;
			this._clear(this._moAlias[_asAlias]);
		}
		else
		{
			// delete all alias list cache
			var _oAlias = this._moAlias;
			for(var i in _oAlias)
			{
				this._clear(_oAlias[i]);
			}
		}
		
		return true;
	},
	/**
	 * get this object info
	 * 
	 * @return {Object}
	 */
	info: function(_asAlias)
	{
		if (_asAlias)
		{
			return {
				alias		: _asAlias,
				filename	: this._moAlias[_asAlias],
				aliaslist	: this._moAlias
			};
		}

		return {
			alias		: this._findAlias(this._msRootFile),
			filename	: this._msRootFile,
			aliaslist	: this._moAlias
		};
	},

	/**
	 * add alias list into mload
	 * 
	 * @param {String|Object} _avArg
	 * @param {String|undefined} _avArg2
	 */
	addAlias: function(_avArg, _avArg2)
	{
		if (typeof(_avArg) == 'string' && _avArg2)
		{
			this._addAlias(_avArg, _avArg2);
			return true;
		}
		else if (typeof(_avArg) == 'object')
		{
			for(var i in _avArg)
			{
				this._addAlias(i, _avArg[i]);
			}
			return true;
		}

		return false;
	},


	_findAlias: function(_asAbsolutePath)
	{
		for(var i in this._msRootFile)
		{
			if (this._msRootFile[i] == _asAbsolutePath)
			{
				return i;
			}
		}
	},
	_getModelPath: function(_asPath)
	{
		_asPath = _asPath.trim();

		if (_asPath.indexOf('/') === 0) return _asPath;
		
		return this._msRootPath + _asPath;
	},
	_clear: function(_asAbsolutePath)
	{
		delete require.cache[require.resolve(_asAbsolutePath)];
	},
	_addAlias: function(_asAlias, _asPath)
	{
		this._moAlias[_asAlias] = path.normalize(this._getModelPath(_asPath));
	}
};

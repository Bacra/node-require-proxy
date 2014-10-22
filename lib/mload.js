/**
 * mod class
 * @author Bacra Woo<bacra.woo@gmail.com>
 */

var path = require('path');
var Module = require('module');
var Util = require('./util.js');

module.exports = MLoad;

function MLoad(_aoAlias, _aoNodeRootModule)
{
	this._moAlias			= _aoAlias || {};
	this._moNodeRootModule	= _aoNodeRootModule;
}

MLoad.prototype = {
	/**
	 * load modules by alias
	 * 
	 * @param  {String} _asRequest
	 * @return {Object}
	 */
	load: function(_asRequest)
	{
		return this._require(_asRequest);
	},
	/**
	 * load modules after clear require cache
	 * 
	 * @param  {String} _asRequest
	 * @return {Object}
	 */
	reload: function(_asRequest)
	{
		this.clear(_asRequest);
		return this.load(_asRequest);
	},
	/**
	 * clear require cache
	 *
	 * @param  {Mixed} _asRequest
	 * @return {Boolean}
	 */
	clear: function(_asRequest)
	{
		if (_asRequest === true)
		{
			// delete all require cache
			var _oCache = require.cache;
			for(var i in _oCache)
			{
				delete _oCache[i];
			}
		}
		else if (_asRequest)
		{
			// delete specified alias
			if (!this._moAlias[_asRequest]) return false;
			this._clearCache(this._moAlias[_asRequest]);
		}
		else
		{
			// delete all alias list cache
			var _oAlias = this._moAlias;
			for(var i in _oAlias)
			{
				this._clearCache(_oAlias[i]);
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
			alias		: this._findAlias(this._moNodeRootModule.filename),
			filename	: this._moNodeRootModule.filename,
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
	addAliasByFile: function(_asFile)
	{
		var _oAlias = this._require(_asFile);
		var _oModel = require.cache[this._resolve(_asFile)];

		if (_oModel)
		{
			(new MLoad(this._moAlias, _oModel)).addAlias(_oAlias);
		}
	},

	_resolve: function(_asRequest)
	{
		try {
			return Module._resolveFilename(_asRequest, this._moNodeRootModule);
		}
		catch(e){}
	},
	_require: function(_asRequest)
	{
		return this._moNodeRootModule.require(_asRequest);
	},

	_findAlias: function(_asResolvedPath)
	{
		for(var i in this._moNodeRootModule.filename)
		{
			if (this._moNodeRootModule.filename[i] == _asResolvedPath)
			{
				return i;
			}
		}
	},
	_clearCache: function(_asResolvedPath)
	{
		delete require.cache[_asResolvedPath];
	},
	_addAlias: function(_asAlias, _asPath)
	{
		_asPath = this._resolve(''+_asPath);
		_asPath && (this._moAlias[_asAlias] = _asPath);
	}
};


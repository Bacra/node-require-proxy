/**
 * mod class
 * @author Bacra Woo<bacra.woo@gmail.com>
 */

var path	= require('path');
var Module	= require('module');
var debug	= require('debug')('mload:mload');

module.exports = Mload;

function Mload(alias, nodeRootModule) {
	this._alias			= alias || {};
	this.nodeRootModule	= nodeRootModule;
}

Mload.prototype = {
	/**
	 * load modules by alias
	 * 
	 * @param  {String} request
	 * @return {Object}
	 */
	load: function(request) {
		return this._require(request);
	},
	/**
	 * load modules after clear require cache
	 * 
	 * @param  {String} request
	 * @return {Object}
	 */
	reload: function(request) {
		this.clear(request);
		return this.load(request);
	},
	/**
	 * clear require cache
	 *
	 * @param  {Mixed} request
	 * @return {Boolean}
	 */
	clear: function(request) {
		if (request === true) {
			// delete all require cache
			var cache = require.cache;
			for(var i in cache) {
				delete cache[i];
			}
		} else if (request) {
			// delete specified alias
			this._clearCache(this._alias[request] ? this._alias[request].path : this._resolve(request));
		} else {
			// delete all alias list cache
			var alias = this._alias;
			for(var i in alias) {
				this._clearCache(alias[i].path);
			}
		}
	},
	/**
	 * get this object info
	 * 
	 * @return {Object}
	 */
	info: function(alias) {
		var info;

		if (alias) {
			info = this._info(alias);
			if (info) return info;
		}

		info = {};
		for(var i in this._alias) {
			info[i] = this._info(i);
		}

		return {
			mload	: this.nodeRootModule.filename,
			alias	: info
		};
	},

	/**
	 * add alias list into mload
	 * 
	 * @param {String|Object} arg
	 * @param {String|undefined} arg2
	 */
	addAlias: function(arg, arg2) {
		if (typeof(arg) == 'string' && arg2) {
			this._addAlias(arg, arg2);
			return true;
		} else if (typeof(arg) == 'object') {
			for(var i in arg) {
				if (arg.hasOwnProperty(i)) {
					this._addAlias(i, arg[i]);
				}
			}
			return true;
		}

		return false;
	},
	addAliasByFile: function(file) {
		var alias = this._require(file);
		var model = require.cache[this._resolve(file)];

		if (model) {
			(new Mload(this._alias, model)).addAlias(alias);
		}
	},

	_resolve: function(request) {
		try {
			return Module._resolveFilename(request, this.nodeRootModule);
		} catch(e){}
	},
	_require: function(request) {
		return this.nodeRootModule.require(request);
	},
	_info: function(alias) {
		var aliasInfo = this._alias[alias];

		if (aliasInfo) {
			return {
				alias	: alias,
				path	: aliasInfo.path,
				from	: aliasInfo.from && aliasInfo.from.filename
			};
		}
	},

	_clearCache: function(resolvedPath) {
		delete require.cache[resolvedPath];
	},
	_addAlias: function(alias, path) {
		var path2 = this._resolve(''+path);

		if (path2) {
			this._alias[alias] = {
				path: path2,
				from: this.nodeRootModule
			};
		} else {
			debug('add alias err: alias:%s, path:%s, parent:%s', alias, path, this.nodeRootModule.filename);
		}
	}
};


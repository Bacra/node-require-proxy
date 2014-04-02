/**
 * mod class
 * @author Bacra Woo<bacra.woo@gmail.com>
 */

module.exports = QMMod;

function QMMod(_aoAlias, _asAppRoot)
{
	this._moAlias = _aoAlias;
	this._msAppRoot = _asAppRoot;
}

QMMod.prototype = {
	/**
	 * load modules by alias
	 * 
	 * @param  {String} _asAlias
	 * @return {Object}
	 */
	'load': function(_asAlias)
	{
		var _sPath = this._moAlias[_asAlias];
		return require(_sPath ? this._msAppRoot + _sPath : _asAlias);
	},
	/**
	 * load modules after clear require cache
	 * 
	 * @param  {String} _asAlias
	 * @return {Object}
	 */
	'reload': function(_asAlias)
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
	'clear': function(_asAlias)
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
	'_clear': function(_asPath)
	{
		delete require.cache[require.resolve(this._msAppRoot+_asPath)];
	}
};
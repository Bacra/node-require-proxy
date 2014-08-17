// create instance method
var createMLoad = require('./lib/main.js');

try {
	// read mod global config
	// app root path: node_modules/mod/
	var sAppRoot = __dirname+'/../../';
	var oConfig = require(sAppRoot+'/Modfile.js');
	module.exports = createMLoad(oConfig, sAppRoot);
	module.exports.inited = true;
}
catch(e)
{
	module.exports = createMLoad;
	createMLoad.inited = false;
}

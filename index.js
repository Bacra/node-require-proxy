// create instance method
var qmMload = require('./lib/main.js');

try {
	// read mod global config
	// app root path: node_modules/mod/
	var sAppRoot = __dirname+'/../../';
	var oConfig = require(sAppRoot+'/Modfile.js');
	module.exports = qmMload(oConfig, sAppRoot);
	module.exports.inited = true;
}
catch(e)
{
	module.exports = qmMload;
	qmMload.inited = false;
}

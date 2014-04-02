// read mod global config
// app root path: node_modules/mod/
var sAppRoot = __dirname+'/../../';
// if read error process exit(1)
var oConfig = require(sAppRoot+'/Modfile.js');

module.exports = require('./lib/main.js')(oConfig, sAppRoot);
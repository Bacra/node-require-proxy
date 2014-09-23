module.exports = require('./lib/main.js')(module.parent.filename);
// console.log('init mload');
// console.log('evn path', module.parent.filename);
delete require.cache[module.id];
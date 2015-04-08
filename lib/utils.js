module.exports = {
	proxy	: proxy,
	extend	: extend,
};


/**
 * bind proxy methods
 *
 * bind proxy methods to another object
 * It use for api methods
 * 
 * @param  {Array}  methods   need dealed method list
 * @param  {Object} from      methods form this object
 * @param  {Object} target    add methods to this object
 */
function proxy(methods, from, target) {
	methods.forEach(function(method) {
		target[method] = function() {
			return from[method].apply(from, arguments);
		};
	});
}

function extend(obj, copy) {
	if (!copy) return obj;

	for(var i in copy) {
		if (copy.hasOwnProperty(i)) {
			obj[i] = copy[i];
		}
	}

	return obj;
}

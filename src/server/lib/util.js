/* jslint node: true */

'use strict';

const Config = require("../config").default;

exports.addArticle = function (string) {
	return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
};

exports.averageArray = arr => {
	if (!arr.length) return 0;
	var sum = arr.reduce((a, b) => { return a + b; });
	return sum / arr.length;
};

exports.sumArray = arr => {
	if (!arr.length) return 0;
	var sum = arr.reduce((a, b) => { return a + b; });
	return sum;
};

exports.getJackpot = x => {
	return (x > 26300 * 1.5) ? Math.pow(x - 26300, 0.85) + 26300 : x / 1.5;
};

exports.remove = (array, index) => {
	// there is more than one object in the container
	if (index === array.length - 1) {
		// special case if the obj is the newest in the container
		return array.pop();
	} else {
		let o = array[index];
		array[index] = array.pop();
		return o;
	}
};

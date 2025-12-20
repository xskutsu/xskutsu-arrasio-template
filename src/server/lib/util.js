/* jslint node: true */

'use strict';

const Config = require("../config").default;

exports.addArticle = function (string) {
	return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
};

exports.getJackpot = x => {
	return (x > 26300 * 1.5) ? Math.pow(x - 26300, 0.85) + 26300 : x / 1.5;
};

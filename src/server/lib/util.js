/* jslint node: true */

'use strict';

const Config = require("../config");

exports.addArticle = function (string) {
	return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
};

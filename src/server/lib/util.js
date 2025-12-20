/* jslint node: true */

'use strict';

const Config = require("../config").default;

exports.addArticle = function (string) {
	return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
};

exports.getDistance = function (p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

exports.getDirection = function (p1, p2) {
	return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

exports.clamp = function (value, min, max) {
	return Math.min(Math.max(value, min), max);
};

exports.angleDifference = (() => {
	let mod = function (a, n) {
		return (a % n + n) % n;
	};
	return (sourceA, targetA) => {
		let a = targetA - sourceA;
		return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
	};
})();

exports.loopSmooth = (angle, desired, slowness) => {
	return exports.angleDifference(angle, desired) / slowness;
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

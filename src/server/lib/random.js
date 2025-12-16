/*jslint node: true */
"use strict";

function cyrb128(text) {
	let h1 = 1779033703;
	let h2 = 3144134277;
	let h3 = 1013904242;
	let h4 = 2773480762;
	for (let i = 0, k; i < text.length; i++) {
		k = text.charCodeAt(i);
		h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
		h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
		h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
		h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
	}
	h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
	h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
	h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
	h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
	return [
		(h1 ^ h2 ^ h3 ^ h4) >>> 0,
		(h2 ^ h1) >>> 0,
		(h3 ^ h1) >>> 0,
		(h4 ^ h1) >>> 0
	];
}

function* sfc32(seed) {
	let [a, b, c, d] = cyrb128(seed);
	while (true) {
		a |= 0; b |= 0; c |= 0; d |= 0;
		let t = (a + b | 0) + d | 0;
		d = d + 1 | 0;
		a = b ^ b >>> 9;
		b = c + (c << 3) | 0;
		c = (c << 21 | c >>> 11);
		c = c + t | 0;
		yield (t >>> 0) / 4294967296;
	}
}

const seededRandom = sfc32("" + Date.now());

exports.random = x => {
	return x * seededRandom.next().value;
};

exports.randomAngle = () => {
	return Math.PI * 2 * seededRandom.next().value;
};

exports.randomRange = (min, max) => {
	return seededRandom.next().value * (max - min) + min;
};

exports.irandom = i => {
	let max = Math.floor(i);
	return Math.floor(seededRandom.next().value * (max + 1)); //Inclusive
};

exports.gauss = (mean, deviation) => {
	let x1, x2, w;
	do {
		x1 = 2 * seededRandom.next().value - 1;
		x2 = 2 * seededRandom.next().value - 1;
		w = x1 * x1 + x2 * x2;
	} while (0 == w || w >= 1);

	w = Math.sqrt(-2 * Math.log(w) / w);
	return mean + deviation * x1 * w;
};

exports.gaussInverse = (min, max, clustering) => {
	let range = max - min;
	let output = exports.gauss(0, range / clustering);

	while (output < 0) {
		output += range;
	}

	while (output > range) {
		output -= range;
	}

	return output + min;
};

exports.gaussRing = (radius, clustering) => {
	let r = exports.random(Math.PI * 2);
	let d = exports.gauss(radius, radius * clustering);
	return {
		x: d * Math.cos(r),
		y: d * Math.sin(r),
	};
};

exports.chance = prob => {
	return exports.random(1) < prob;
};

exports.dice = sides => {
	return exports.random(sides) < 1;
};

exports.choose = arr => {
	return arr[exports.irandom(arr.length - 1)];
};

exports.chooseN = (arr, n) => {
	let o = [];
	for (let i = 0; i < n; i++) {
		o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0]);
	}
	return o;
};

exports.chooseChance = (...arg) => {
	let totalProb = 0;
	arg.forEach(function (value) { totalProb += value; });
	let answer = exports.random(totalProb);
	for (let i = 0; i < arg.length; i++) {
		if (answer < arg[i]) return i;
		answer -= arg[i];
	}
};


exports.chooseBotName = () => {
	return exports.choose([
		'Alice',
		'Bob',
		'Carmen',
		'David',
		'Edith',
		'Freddy',
		'Gustav',
		'Helga',
		'Janet',
		'Lorenzo',
		'Mary',
		'Nora',
		'Olivia',
		'Peter',
		'Queen',
		'Roger',
		'Suzanne',
		'Tommy',
		'Ursula',
		'Vincent',
		'Wilhelm',
		'Xerxes',
		'Yvonne',
		'Zachary',
		'Alpha',
		'Bravo',
		'Charlie',
		'Delta',
		'Echo',
		'Foxtrot',
		'Hotel',
		'India',
		'Juliet',
		'Kilo',
		'Lima',
		'Mike',
		'November',
		'Oscar',
		'Papa',
		'Quebec',
		'Romeo',
		'Sierra',
		'Tango',
		'Uniform',
		'Victor',
		'Whiskey',
		'X-Ray',
		'Yankee',
		'Zulu',
	]);
};

exports.chooseBossName = (code, n) => {
	switch (code) {
		case 'a':
			return exports.chooseN([
				'Archimedes',
				'Akilina',
				'Anastasios',
				'Athena',
				'Alkaios',
				'Amyntas',
				'Aniketos',
				'Artemis',
				'Anaxagoras',
				'Apollon',
			], n);
		case 'castle':
			return exports.chooseN([
				'Berezhany',
				'Lutsk',
				'Dobromyl',
				'Akkerman',
				'Palanok',
				'Zolochiv',
				'Palanok',
				'Mangup',
				'Olseko',
				'Brody',
				'Isiaslav',
				'Kaffa',
				'Bilhorod',
			], n);
		default: return 'God';
	}
};

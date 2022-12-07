import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

const scores = {
	A: 1,
	B: 2,
	C: 3,

	X: 1,
	Y: 2,
	Z: 3,
};

function calculateScore([x, y]) {
	const [enemyScore, myScore] = getOutcomeOfFight(x, y);
	return [enemyScore + scores[x], myScore + scores[y]];
}

function getOutcomeOfFight(x, y) {
	if (scores[x] === scores[y]) return [3, 3];
	switch (x) {
		case 'A':
			return (y === 'Y') ? [0, 6] : [6, 0];
		case 'B':
			return (y === 'Z') ? [0, 6] : [6, 0];
		case 'C':
			return (y === 'X') ? [0, 6] : [6, 0];
	}
}


const pairs = input.split('\n').map(s => s.split(' '));

const result = pairs.map(calculateScore).reduce(([aX, aY], [cX, cY]) => [aX + cX, aY + cY], [0, 0]);

console.log(result);
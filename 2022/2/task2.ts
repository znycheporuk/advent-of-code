import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

const scores = {
	A: 1,
	B: 2,
	C: 3,
};

function calculateScore([x, y]) {
	const [enemyScore, myScore] = getOutcomeOfFight(y);

	return [enemyScore + scores[x], myScore + calculateMyPoints(x, y)];
}

function calculateMyPoints(x, y) {
	if (y === 'Y') return scores[x];
	switch (x) {
		case 'A':
			return (y === 'X') ? scores.C : scores.B;
		case 'B':
			return (y === 'X') ? scores.A : scores.C;
		case 'C':
			return (y === 'X') ? scores.B : scores.A;
	}
}

function getOutcomeOfFight(outcome) {
	switch (outcome) {
		case 'X':
			return [6, 0];
		case 'Y':
			return [3, 3];
		case 'Z':
			return [0, 6];
	}
}


const pairs = input.split('\n').map(s => s.split(' '));

const result = pairs.map(calculateScore).reduce(([aX, aY], [cX, cY]) => [aX + cX, aY + cY], [0, 0]);

console.log(result);
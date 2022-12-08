import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

const rows = input.split('\n');
const breakIndex = rows.findIndex(v => v === '');
const rawMatrix = rows.slice(0, breakIndex - 1);
const rawCommandStrings = rows.slice(breakIndex + 1);

// parse input
const matrix: string[][] = rawMatrix.reduce((acc, str) => {
	for (let i = 1; i < str.length; i += 4) {
		if (str[i] !== ' ') {
			const index = (i - 1) / 4;
			if (acc[index]) {
				acc[index].unshift(str[i]);
			} else {
				acc[index] = [str[i]];
			}
		}
	}
	return acc;
}, []);

const commands = rawCommandStrings.map(cmd => Array.from(cmd.matchAll(/ \d+/g)).map(item => Number(item[0])));

// execute all commands
commands.forEach(([move, from, to]) => {
	const fromArr = matrix[from - 1];
	const items = fromArr.splice(fromArr.length - move);
	matrix[to - 1].push(...items.reverse());
});


const result = matrix.map(arr => arr.pop()).join('');

console.log(result);

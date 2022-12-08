import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

let result;
for (let i = 14; i < input.length; i++) {
	const substring = input.slice(i - 14, i);
	const set = new Set(substring);

	if (set.size === 14) {
		result = i;
		break;
	}
}

console.log(result);

import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

function findDuplicateCharacter([str1, str2, str3]) {
	const set1 = new Set(str1);
	const set2 = new Set(str2);
	const set3 = new Set(str3);

	for (const char of set1) {
		if (set2.has(char) && set3.has(char)) return char;
	}
}

function calculateCharacterPriority(char: string) {
	const characterCode = char.charCodeAt(0);
	return (characterCode > 90) ? characterCode - 96 : characterCode - 38;
}

const groups = input.split('\n').reduce((acc, str, i) => {
	if (i % 3 === 0) {
		acc.push([str]);
	} else {
		acc.at(-1).push(str);
	}
	return acc;
}, []);

const result = groups.map(findDuplicateCharacter).map(calculateCharacterPriority).reduce((acc, val) => acc + val, 0);

console.log(result);

import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

function findDuplicateCharacter(str: string) {
	const str1 = str.slice(0, str.length / 2);
	const str2 = str.slice(str.length / 2);

	const set1 = new Set(str1);
	const set2 = new Set(str2);

	for (const char of set1) {
		if (set2.has(char)) return char;
	}
}

function calculateCharacterPriority(char: string) {
	const characterCode = char.charCodeAt(0);
	return (characterCode > 90) ? characterCode - 96 : characterCode - 38;
}

const strings = input.split('\n');

const result = strings.map(findDuplicateCharacter).map(calculateCharacterPriority).reduce((acc, val) => acc + val, 0);

console.log(result);

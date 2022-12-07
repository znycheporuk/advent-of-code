import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

const pairs = input.split('\n');

function calculateOverlap([xMin, xMax, yMin, yMax]: number[]) {
	// fully contains
	if (xMin >= yMin && xMax <= yMax) return [xMin, xMax];
	if (yMin >= xMin && yMax <= xMax) return [yMin, yMax];

	// partially overlaps
	if (xMin >= yMin && xMin <= yMax) return [xMin, yMax];
	if (yMin >= xMin && yMin <= xMax) return [yMin, xMax];

	return [];
}

const overlaps = pairs.map(p => p.split(/[-,]+/).map(Number)).map(calculateOverlap);

const filteredPairs = pairs.filter((item, i) => overlaps[i].length && item.includes(overlaps[i].join('-')));

const result = filteredPairs.length

console.log(result);

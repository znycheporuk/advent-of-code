import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

function checkIfTreeVisible(forest: string[], x: number, y: number): boolean {
	const currentTreeHeight = forest[y][x];
	//edge
	if (x === 0 || y === 0 || x === forest[0].length - 1 || y === forest.length - 1) return true;

	let [topVisible, bottomVisible, rightVisible, leftVisible] = [true, true, true, true];

	for (let i = y - 1; i >= 0; i--) {
		if (currentTreeHeight <= forest[i][x]) {
			topVisible = false;
			break;
		}
	}
	if (topVisible) return true;

	for (let i = y + 1; i < forest.length; i++) {
		if (currentTreeHeight <= forest[i][x]) {
			bottomVisible = false;
			break;
		}
	}
	if (bottomVisible) return true;

	for (let i = x - 1; i >= 0; i--) {
		if (currentTreeHeight <= forest[y][i]) {
			leftVisible = false;
			break;
		}
	}
	if (leftVisible) return true;

	for (let i = x + 1; i < forest[y].length; i++) {
		if (currentTreeHeight <= forest[y][i]) {
			rightVisible = false;
			break;
		}
	}

	return rightVisible;
}

function calculateResult(forest: string[]): number {
	let acc = 0;
	for (let i = 0; i < forest.length; i++) {
		for (let j = 0; j < forest[i].length; j++) {
			if (checkIfTreeVisible(forest, j, i)) {
				acc++;
			}
		}
	}
	return acc;
}

const result = calculateResult(input.split('\n'));

console.log(result);

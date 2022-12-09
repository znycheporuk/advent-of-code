import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

function calculateTreeScore(forest: string[], x: number, y: number): number {
	const currentTreeHeight = forest[y][x];
	//edge
	if (x === 0 || y === 0 || x === forest[0].length - 1 || y === forest.length - 1) return 0;

	let [topScore, bottomScore, rightScore, leftScore] = [0, 0, 0, 0];

	for (let i = y - 1; i >= 0; i--) {
		topScore++;
		if (currentTreeHeight <= forest[i][x]) {
			break;
		}
	}

	for (let i = y + 1; i < forest.length; i++) {
		bottomScore++;
		if (currentTreeHeight <= forest[i][x]) {
			break;
		}
	}

	for (let i = x - 1; i >= 0; i--) {
		leftScore++;
		if (currentTreeHeight <= forest[y][i]) {
			break;
		}
	}

	for (let i = x + 1; i < forest[y].length; i++) {
		rightScore++;
		if (currentTreeHeight <= forest[y][i]) {
			break;
		}
	}

	return topScore * bottomScore * leftScore * rightScore;
}

function calculateResult(forest: string[]): number {
	let maxTreeScore = 0;
	for (let i = 0; i < forest.length; i++) {
		for (let j = 0; j < forest[i].length; j++) {
			const treeScore = calculateTreeScore(forest, j, i);
			if (treeScore > maxTreeScore) {
				maxTreeScore = treeScore;
			}
		}
	}
	return maxTreeScore;
}

const result = calculateResult(input.split('\n'));

console.log(result);

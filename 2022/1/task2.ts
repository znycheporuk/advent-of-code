import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

const aggregatedData = input.split('\n').map(Number).reduce((acc, data) => {
	if (data) {
		const lastValue = acc.pop();
		acc.push(lastValue + data);
	} else {
		acc.push(0);
	}
	return acc;
}, [0]);

const sortedData = aggregatedData.sort((a, b) => b - a);

const result = sortedData[0] + sortedData[1] + sortedData[2];

console.log(result);

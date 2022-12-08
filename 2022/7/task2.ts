import { readFileSync } from 'fs';


const input = readFileSync('./input.txt').toString();

const TOTAL_DISK_SIZE = 70_000_000;
const REQUIRED_EMPTY_DISK_SIZE = 30_000_000;

interface IDirectory {
	type: 'directory';
	parent: null | IDirectory;
	children: Record<string, IDirectory | IFile>;
}

interface IFile {
	type: 'file';
	parent: IDirectory;
	size: number;
}

function generateFileSystem(cmds: string[]) {
	const root: IDirectory = {parent: null, type: 'directory', children: {}};
	let currentDir = root;

	cmds.forEach(cmd => {
		const [a, b, c] = cmd.split(' ');
		if (a === '$') {
			if (b === 'ls') {
				return;
			}
			if (b === 'cd') {
				if (c === '..') {
					currentDir = currentDir.parent;
				} else if (c === '/') {
					currentDir = root;
				} else {
					currentDir = currentDir.children[c] as IDirectory;
				}
			}
		} else if (a === 'dir') {
			currentDir.children[b] = {parent: currentDir, type: 'directory', children: {}};
		} else {
			currentDir.children[b] = {parent: currentDir, type: 'file', size: Number(a)};
		}
	});

	return root;
}

function calculateDirSize(dir: IDirectory): number {
	return Object.values(dir.children).reduce((acc, child) => {
		if (child.type === 'directory') return acc + calculateDirSize(child);
		if (child.type === 'file') return acc + child.size;
		return acc;
	}, 0);
}

function calculateResult(dir: IDirectory) {
	const totalTakenSpace = calculateDirSize(dir);
	const sizeNeededToFree = REQUIRED_EMPTY_DISK_SIZE - (TOTAL_DISK_SIZE - totalTakenSpace);

	function findSmallestDir(dir: IDirectory) {
		const dirSize = calculateDirSize(dir);
		return Object.values(dir.children).reduce((acc, child) => {
			if (child.type === 'directory') {
				return Math.min(acc, findSmallestDir(child));
			}
			return acc;
		}, dirSize < sizeNeededToFree ? totalTakenSpace : dirSize);
	}

	return findSmallestDir(dir);
}


const fileSystem = generateFileSystem(input.split('\n'));

const result = calculateResult(fileSystem);

console.log(result);
